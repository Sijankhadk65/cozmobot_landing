import type { Transition } from "framer-motion";

/**
 * Shared motion vocabulary, translated from Apple's fluid-interface guidance.
 *
 * Apple designs springs with two parameters — damping (overshoot) and
 * response (how fast it reaches target). Framer Motion's `bounce` + `duration`
 * spring maps almost 1:1: `bounce: 0` is critically damped (damping 1.0),
 * higher bounce is under-damped. We default to no overshoot everywhere and
 * reserve bounce for motion that carried real momentum.
 */

/** Critically damped — graceful, non-distracting. The house default. */
export const spring: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.55,
};

/** Snappier settle for small, direct feedback (presses, toggles). */
export const springSnappy: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.35,
};

/** A little overshoot — only for gestures that threw/flicked an element. */
export const springBouncy: Transition = {
  type: "spring",
  bounce: 0.22,
  duration: 0.5,
};
