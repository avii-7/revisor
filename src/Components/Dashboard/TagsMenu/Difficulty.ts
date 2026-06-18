export const DifficultyValues = [
  "default",
  "easy",
  "medium",
  "hard",
] as const;

export type Difficulty =
  (typeof DifficultyValues)[number];