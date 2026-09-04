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
// breakpoint. Everything the scroll drives (box scale, drift, rotation, camera,
// accent glow) is a keyframed track sampled by progress and then critically
// damped toward, so fast scrubbing stays smooth instead of snapping.
//
// The unit is NOT the subject, and for most of the scroll it is not even on
// screen. nex-ON is licensed software; the hardware is one optional way to run
// it, so the sequence is software first and hardware last:
//
//   1. The problem — text only, no unit
//   2. The OS      — text + the stack diagram, no unit
//   3. The runtime — text + the agent loop, no unit
//   4. Any body    — text + drivers/apps; the unit begins to fade up, small
//   5. Install it  — the unit, small and sharp, named as optional
//
// Stops sit at the hold-center of each text beat so copy and camera land
// together. Act 5 lands at progress 1.0 — the section bottom — so there's no
// held-still tail to scroll through after it.
const STOPS = [0, 0.086, 0.323, 0.548, 0.785, 1] as const;

// The unit is not on screen for most of this. nex-ON is licensed software, so
// the opening acts are the software alone — text and diagrams, no hardware —
// and the unit only arrives near the end, already small, as one optional way to
// run it. Scale/drift therefore park it where the closing beat wants it and
// barely move; the entrance is carried by the canvas fade in NexonExperience,
// so the unit doesn't slide into frame, it simply turns out to have been there.
const SCALE = [0.5, 0.5, 0.5, 0.5, 0.46, 0.52];
const DRIFT_X = [1.15, 1.15, 1.15, 1.15, 1.4, 1.15];
const DRIFT_Y = [0.15, 0.15, 0.15, 0.15, 0.28, 0.15];

// A soft three-quarter view held throughout, turning slowly. The old
// choreography toured the chassis — top, vents, ports — which is exactly the
// hardware read we're removing, so there is no face tour any more.
const PITCH = [0.25, 0.25, 0.3, 0.35, 0.4, 0.3];
const YAW = [0, 0, 0.6, 1.4, 2.4, 3.6];
// The camera holds still — the unit is parked, not travelling.
const CAM_Z = [6.2, 6.2, 6.2, 6.2, 6.2, 6.2];
const CAM_Y = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
// Accent emissive — low while the unit is still hidden, lifting as it arrives.
const GLOW = [1.2, 1.2, 1.2, 1.2, 1.4, 1.8];

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
  // The damped height, WITHOUT the idle bob folded in. Damping `g.position.y`
  // directly fed each frame's bob back into the next frame's damper, which
  // compounded into a visible jitter.
  const baseY = useRef(0);
  // The canvas mounts part-way down the scroll, so the very first frame has to
  // snap to the pose for the current progress. Damping up from identity made
  // the unit appear mid-shrink and settle into place.
  const posed = useRef(false);

  // Scale the whole unit with the viewport so it never crowds the copy on
  // smaller screens: full size on wide desktops, easing down to ~half on phones.
  // `size` is the canvas' CSS-pixel width and updates on resize, so this stays
  // reactive.
  const viewportWidth = useThree((s) => s.size.width);
  const responsiveScale = THREE.MathUtils.clamp(viewportWidth / 1280, 0.5, 1);
  // On compact the canvas is a narrow band above the copy, so the sideways
  // drift has to be much smaller or the unit walks off the edge of the frame.
  const driftSpread = viewportWidth < 1280 ? 0.3 : 1;

  // Prepare the model once: drop the baked backdrop plane so the unit floats on
  // our own carbon background, normalize its size, and collect the lime accent
  // materials so the scroll can pulse them.
  const { fitScale, accents } = useMemo(() => {
    // `useGLTF` hands back a shared, cached scene, and R3F leaves our fitScale on
    // it at unmount. Reset to identity before measuring so the bounding box is
    // the model's true size on every mount — otherwise a soft-nav back to home
    // measures the still-scaled scene and the box compounds smaller each return.
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    // Detach the baked backdrop plane entirely — left in, it dominates the
    // bounding box (a 3×3 plate) and normalizes the real unit down to a speck.
    const drop: THREE.Object3D[] = [];
    scene.traverse((o) => {
      if (o.name === "Backdrop_Floor") drop.push(o);
    });
    for (const o of drop) o.removeFromParent();

    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
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

  // `useFrame` is an imperative per-frame callback: mutating the Three.js
  // object graph in place is the whole point of it, and there is no render pass
  // to go through. The React Compiler's immutability rule can't see that, so
  // it's disabled for the body of the callback only.
  /* eslint-disable react-hooks/immutability */
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = Math.min(1, Math.max(0, progress.get()));
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 1 / 30); // clamp so a stutter can't over-damp

    // Targets for this scroll position.
    const pitch = track(p, PITCH);
    const yaw = track(p, YAW) + Math.sin(t * 0.4) * 0.03;
    const targetScale = responsiveScale * track(p, SCALE);
    const targetX = track(p, DRIFT_X) * driftSpread;
    const targetY = track(p, DRIFT_Y);
    const camZ = track(p, CAM_Z);
    const camY = track(p, CAM_Y);

    // First frame after mount: adopt the pose outright. There is nothing to
    // ease from — the unit is still invisible at this point, and easing from
    // identity is what made it appear mid-shrink.
    if (!posed.current) {
      posed.current = true;
      g.rotation.x = pitch;
      g.rotation.y = yaw;
      g.scale.setScalar(targetScale);
      g.position.x = targetX;
      baseY.current = targetY;
      camera.position.z = camZ;
      camera.position.y = camY;
    } else {
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pitch, 5, d);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, yaw, 5, d);
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 5, d));
      g.position.x = THREE.MathUtils.damp(g.position.x, targetX, 5, d);
      baseY.current = THREE.MathUtils.damp(baseY.current, targetY, 5, d);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 4, d);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 4, d);
    }

    // The idle bob is applied on top of the damped base, never back into it.
    g.position.y = baseY.current + Math.sin(t * 0.8) * 0.04;
    camera.lookAt(0, 0, 0);

    // Accent glow: keyframed level + a slow "heartbeat" pulse.
    const glow = track(p, GLOW) * (0.85 + 0.15 * Math.sin(t * 2.2));
    for (const m of accents) m.emissiveIntensity = glow;
  });
  /* eslint-enable react-hooks/immutability */

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
      {/* No scene background — the canvas is transparent so the DOM carbon base
          and grid show through behind the box. Fog still blends the box's far
          edge into carbon for depth. */}
      <fog attach="fog" args={["#0f1112", 8, 18]} />

      {/* Key + fill. The box sits on a light studio surface now, so it already
          reads by contrast — the lime rim stays gentle, just a brand-tinted edge
          rather than the separation it needed on a dark bg. */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.6} />
      <directionalLight position={[0, 2, 7]} intensity={1.4} />
      <pointLight position={[-4, 2, -4]} intensity={20} distance={18} color="#add037" />
      <pointLight position={[4, -1, 3]} intensity={22} distance={16} color="#ffffff" />

      {/* Synthetic studio — generated in-scene (no external HDRI) so the plastic
          picks up soft specular strips. */}
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 3, 4]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.2} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#dfe9c0" />
        <Lightformer intensity={1} position={[4, 2, -2]} scale={[4, 4, 1]} color="#ffffff" />
      </Environment>

      {/* The drop shadow is a CSS filter on the canvas element (see
          NexonExperience) — the camera is near-level, so a 3D floor/contact
          shadow would be edge-on or hidden directly behind the unit. */}
      <NexonModel progress={progress} />
    </>
  );
}
