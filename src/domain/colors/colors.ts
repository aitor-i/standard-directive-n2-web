export const colors = {
  green: "color-green",
  red: "color-red",
  yellow: "color-yellow",
  blue: "color-blue",
  violet: "color-violet",
  extra: "color-extra",
};

export type Colors = typeof colors;

const colorKeys = Object.keys(colors);

export type ColorKeys =
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "violet"
  | "extra";
