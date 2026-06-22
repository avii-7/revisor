export const Tab = {
  intuition: "intuition",
  code: "code",
} as const;

export type Tab = (typeof Tab)[keyof typeof Tab];