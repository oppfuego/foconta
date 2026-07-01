/**
 * Design tokens — extracted from existing brand palette.
 * No new hues. Only tints/shades/opacity of these colors.
 */
export const colors = {
  navy: {
    900: "#0a2540",
    800: "#1E293B",
    700: "#1E3A8A",
    600: "#1E40AF",
    500: "#1D4ED8",
  },
  accent: {
    600: "#1D4ED8",
    500: "#2563EB",
    400: "#3B82F6",
    300: "#60A5FA",
    100: "#EFF6FF",
  },
  ink: {
    primary: "#1E293B",
    secondary: "#475569",
    muted: "#94A3B8",
    inverse: "#FFFFFF",
  },
  surface: {
    paper: "#FFFFFF",
    muted: "#F3F4F6",
    tint: "#EFF6FF",
    dark: "#0a2540",
    deep: "#08192b",
  },
  border: {
    light: "#E5E7EB",
    hairline: "rgba(255,255,255,0.08)",
    hairlineDark: "rgba(10,37,64,0.08)",
  },
} as const;

export const radii = {
  sm: "10px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  pill: "9999px",
} as const;

export const shadows = {
  soft: "0 6px 24px -8px rgba(10,37,64,0.15)",
  lift: "0 20px 40px -20px rgba(10,37,64,0.35)",
  glow: "0 0 0 1px rgba(37,99,235,0.35), 0 12px 40px -12px rgba(37,99,235,0.45)",
  hairline: "inset 0 0 0 1px rgba(255,255,255,0.08)",
} as const;
