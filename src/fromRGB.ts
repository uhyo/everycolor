import { degree128 } from "./degree128";

/**
 * Convert given RGB color to a color name.
 */
export function fromRGB(r: number, g: number, b: number): string {
  assertValidRGBValue(r);
  assertValidRGBValue(g);
  assertValidRGBValue(b);

  if (r === g && g === b) {
    return grayscale(r);
  }

  return "";
}

function assertValidRGBValue(value: number) {
  if (Number.isInteger(value) && value >= 0 && value <= 255) {
    return;
  }
  throw new Error(`'${value}' is not a valid RGB value.`);
}

function grayscale(v: number): string {
  if (v === 0) {
    return "black";
  }
  if (v < 128) {
    // black --- gray zone
    return degree128(v, "gray", "black", "");
  }
  if (v === 128) {
    return "gray";
  }
  if (v < 192) {
    // gray --- silver zone
    return degree128((v - 128) << 1, "silver", "gray");
  }
  if (v === 192) {
    return "silver";
  }
  if (v < 255) {
    // silver --- white zone
    return degree128((v - 192) << 1, "white", "silver");
  }
  return "white";
}
