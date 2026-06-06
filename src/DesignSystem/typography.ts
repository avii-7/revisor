export const designFontFamilies = {
  primary: '"Hanken Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fallback: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  bundled: "Inter",
  legacy: {
    regular: "Regular",
    medium: "Medium",
    semiBold: "SemiBold",
    bold: "Bold",
  },
} as const;

export const designTypography = {
  "display-lg": {
    fontFamily: "Hanken Grotesk",
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: "56px",
    letterSpacing: "-0.02em",
  },
  "display-lg-mobile": {
    fontFamily: "Hanken Grotesk",
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "40px",
    letterSpacing: "-0.01em",
  },
  "headline-md": {
    fontFamily: "Hanken Grotesk",
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "-0.01em",
  },
  "body-lg": {
    fontFamily: "Hanken Grotesk",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
    letterSpacing: "0",
  },
  "body-md": {
    fontFamily: "Hanken Grotesk",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0",
  },
  "label-sm": {
    fontFamily: "Hanken Grotesk",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.05em",
  },
} as const;

export type DesignTypographyName = keyof typeof designTypography;

export const getDesignTypographyCssVariable = (
  typographyName: DesignTypographyName,
  propertyName: "font-family" | "font-size" | "font-weight" | "line-height" | "letter-spacing",
) => `var(--revisor-typography-${typographyName}-${propertyName})`;
