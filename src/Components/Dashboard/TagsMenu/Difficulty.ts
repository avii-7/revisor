// const Difficulty = {
//   default: "Default",
//   easy: "Easy",
//   medium: "Medium",
//   hard: "Hard",
// } as const;

// type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

// export default Difficulty;
// export type { Difficulty };

export const DifficultyValues = [
  "Default",
  "Easy",
  "Medium",
  "Hard",
] as const;

export type Difficulty =
  (typeof DifficultyValues)[number];