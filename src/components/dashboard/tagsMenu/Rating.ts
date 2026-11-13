export const RatingValues = [
  "again",
  "hard",
  "good",
  "easy",
] as const;

export type Rating =
  (typeof RatingValues)[number];