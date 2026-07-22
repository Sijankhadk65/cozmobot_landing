"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const MODEL_URL = "/models/nexon_box.glb";
useGLTF.preload(MODEL_URL);

// ── Scroll choreography ───────────────────────────────────────────────────────
// Five framed views, one per act, expressed as a state at each progress
// breakpoint. Everything the scroll drives (box pitch/yaw, camera dolly/tilt,
// accent glow) is a keyframed track sampled by progress and then critically
// damped toward, so fast scrubbing stays smooth instead of snapping.
//
// The sequence, in order down the page:
//   1. Top-Down          — pitched forward so the top/vents face the camera
//   2. Front             — flat on, push button toward the lens
//   3. Isometric (left)  — turned + tilted to reveal the left face and top
//   4. Back              — carried around to the ports
//   5. Front again       — one clean revolution completes back on the front
//
// Stops sit at the hold-center of each text beat so copy and camera land
// together; the first/last pairs are flat plateaus that hold the view steady
// while the beat reads. Yaw stays monotonic (0 → 0.7 → π → 2π) so acts 2–5 read
// as one continuous left turn after the opening tilt-down out of top-down.
const STOPS = [0, 0.08, 0.3, 0.51, 0.73, 0.93, 1] as const;

// Pitch (rotation.x): +π/2 lays the top toward the camera for the top-down
// read, drops to 0 for the flat front/back, and takes a gentle iso lean.
const PITCH = [1.45, 1.45, 0, 0.6, 0, 0, 0];
// Yaw (rotation.y): held at 0 through the tilt-down and front, then a single
// left-ward revolution — iso → back → home on the front.
const YAW = [0, 0, 0, 0.7, Math.PI, 2 * Math.PI, 2 * Math.PI];
// Camera dolly — eases back a touch to frame the wide top-down footprint, then
// leans in on the isometric beat.
const CAM_Z = [6.4, 6.4, 6.0, 5.7, 6.0, 6.0, 6.0];
// Camera height — a lift on the iso beat for the three-quarter read.
const CAM_Y = [0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0];
// Accent emissive — the "agent active" glow peaking as the vents (top) and
// ports (back) fill frame.
const GLOW = [2.2, 2.2, 0.9, 1.4, 2.0, 1.1, 1.0];

// Sample a keyframe track at progress `p` with smoothstep easing between stops.
function track(p: number, values: number[]) {
  if (p <= STOPS[0]) return values[0];
  if (p >= STOPS[STOPS.length - 1]) return values[values.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (p >= a && p <= b) {
      const t = (p - a) / (b - a);
      const e = t * t * (3 - 2 * t); // smoothstep
      return values[i] + (values[i + 1] - values[i]) * e;
    }
  }
  return values[values.length - 1];
}

function NexonModel({ progress }: { progress: MotionValue<number> }) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);

  // Prepare the model once: drop the baked backdrop plane so the unit floats on
  // our own carbon background, normalize its size, and collect the lime accent
  // materials so the scroll can pulse them.
  const { fitScale, accents } = useMemo(() => {
    // Detach the baked backdrop plane entirely — left in, it dominates the
    // bounding box (a 3×3 plate) and normalizes the real unit down to a speck.
    const drop: THREE.Object3D[] = [];
    scene.traverse((o) => {
      if (o.name === "Backdrop_Floor") drop.push(o);
    });
    for (const o of drop) o.removeFromParent();

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // eslint-disable-next-line no-console
    console.log(
      `BBOX size x=${size.x.toFixed(3)} y=${size.y.toFixed(3)} z=${size.z.toFixed(3)}`,
    );

    const accents: THREE.MeshStandardMaterial[] = [];
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const std = m as THREE.MeshStandardMaterial;
        if (/glow|vent|lime|led|strip/i.test(std.name || "")) {
          std.toneMapped = false; // let the lime read as emitted light, not surface
          accents.push(std);
        }
      }
    });

    return { fitScale: 2.6 / maxDim, accents };
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = Math.min(1, Math.max(0, progress.get()));
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 1 / 30); // clamp so a stutter can't over-damp

    // Keyframed pitch (top-down → front → iso → back → front) + left yaw + bob.
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, track(p, PITCH), 5, d);
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      track(p, YAW) + Math.sin(t * 0.4) * 0.03,
      5,
      d,
    );
    g.position.y = Math.sin(t * 0.8) * 0.04;

    // Camera dolly + tilt, always looking at the unit.
    camera.position.z = THREE.MathUtils.damp(camera.position.z, track(p, CAM_Z), 4, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, track(p, CAM_Y), 4, d);
    camera.lookAt(0, 0, 0);

    // Accent glow: keyframed level + a slow "heartbeat" pulse.
    const glow = track(p, GLOW) * (0.85 + 0.15 * Math.sin(t * 2.2));
    for (const m of accents) m.emissiveIntensity = glow;
  });

  // Identity already faces the front (+Z, push button) at the camera; the choreo
  // group pitches/yaws around the recentered box.
  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={fitScale} />
      </Center>
    </group>
  );
}

export function NexonScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <color attach="background" args={["#0f1112"]} />
      <fog attach="fog" args={["#0f1112", 8, 18]} />

      {/* Key + fill + a lime rim so the dark chassis reads against the dark bg. */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.6} />
      <directionalLight position={[0, 2, 7]} intensity={1.4} />
      <pointLight position={[-4, 2, -4]} intensity={60} distance={18} color="#add037" />
      <pointLight position={[4, -1, 3]} intensity={22} distance={16} color="#ffffff" />

      {/* Synthetic studio — generated in-scene (no external HDRI) so the plastic
          picks up soft specular strips. */}
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 3, 4]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.2} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#dfe9c0" />
        <Lightformer intensity={1} position={[4, 2, -2]} scale={[4, 4, 1]} color="#ffffff" />
      </Environment>

      <NexonModel progress={progress} />
    </>
  );
}
