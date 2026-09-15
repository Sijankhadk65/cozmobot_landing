// The contact form serves two asks that arrive through the same inbox: a pilot
// enquiry from a factory that already owns an arm, and an Orio pre-order from
// someone who wants the robot when it ships. They need different questions, so
// the intent travels with the enquiry and decides which fields are asked for.
//
// Kept out of `actions.ts` because a "use server" module may only export async
// functions; the form and the action both read the labels from here.

export const INTENTS = {
  pilot: "Pilot access — nex-ON on a robot you own",
  preorder: "Orio pre-order — Companion OS",
} as const;

export const EDITIONS = {
  weld: "Weld OS — live today",
  companion: "Companion OS — pre-orders open",
  mechfab: "MechFab OS — in design",
  med: "Med OS — in design",
  other: "Something else",
} as const;

export const ROBOTS = {
  cobot: "Collaborative arm",
  industrial: "Industrial robot",
  humanoid: "Humanoid",
  none: "None yet",
} as const;

export type Intent = keyof typeof INTENTS;

export const INTENT_OPTIONS = Object.entries(INTENTS).map(
  ([value, label]) => ({ value, label }),
);

export const EDITION_OPTIONS = Object.entries(EDITIONS).map(
  ([value, label]) => ({ value, label }),
);

export const ROBOT_OPTIONS = Object.entries(ROBOTS).map(([value, label]) => ({
  value,
  label,
}));

// A pre-order is for one robot on one edition, so the form doesn't ask which
// edition or what's already on the floor — both are implied. Anything that
// isn't a known intent falls back to the pilot ask.
export function readIntent(value: string | string[] | undefined): Intent {
  return typeof value === "string" && value in INTENTS
    ? (value as Intent)
    : "pilot";
}
