// The pilot form asks which edition the task belongs to and what body is
// already on the floor — both shape whether we can run it dry next week or
// whether it's a roadmap conversation, so they travel with the enquiry rather
// than being buried in prose.
//
// Kept out of `actions.ts` because a "use server" module may only export async
// functions; the form and the action both read the labels from here.

export const EDITIONS = {
  weld: "Weld OS — live today",
  companion: "Companion OS — in design",
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

export const EDITION_OPTIONS = Object.entries(EDITIONS).map(
  ([value, label]) => ({ value, label }),
);

export const ROBOT_OPTIONS = Object.entries(ROBOTS).map(([value, label]) => ({
  value,
  label,
}));
