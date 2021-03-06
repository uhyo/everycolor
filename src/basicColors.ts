export const basicColors = [
  "red",
  "maroon",
  "yellow",
  "olive",
  "lime",
  "green",
  "aqua",
  "teal",
  "blue",
  "navy",
  "fuchsia",
  "purple",
];

export const colorRed = 0;
export const colorYellow = 2;
export const colorLime = 4;
export const colorAqua = 6;
export const colorBlue = 8;
export const colorFuchsia = 10;

export const colorBlack = -1;
export const colorGray = -2;
export const colorSilver = -3;
export const colorWhite = -4;

export function isChromatic(colorId: number) {
  return colorId >= 0;
}

export function isLightColor(colorId: number) {
  return colorId % 2 === 0;
}

export function normalizeToLightColor(colorId: number) {
  return colorId & ~1;
}

/**
 * Get opposite color ID
 */
export function flipColor(colorId: number) {
  return (colorId + 6) % 12;
}
