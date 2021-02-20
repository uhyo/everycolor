import {
  basicColors,
  colorAqua,
  colorBlue,
  colorFuchsia,
  colorLime,
  colorRed,
  colorYellow,
} from "./basicColors";
import { degree128, degree256, degree64 } from "./degree256";

/**
 * Convert given RGB color to a color name.
 */
export function fromRGB(r: number, g: number, b: number): string {
  assertValidRGBValue(r);
  assertValidRGBValue(g);
  assertValidRGBValue(b);

  if (r === g && g === b) {
    return grayscale(r, "black");
  }

  const max = Math.max(r, g, b);
  switch (max) {
    case r: {
      if (r === g) {
        // r === g > b
        return twofactor(colorYellow, r, b);
      }
      if (r === b) {
        // r === b > g
        return twofactor(colorFuchsia, r, g);
      }
      if (g === b) {
        // r > g === b
        return twofactor(colorRed, r, g);
      }
    }
    case g: {
      if (g === b) {
        // g === b > r
        return twofactor(colorAqua, g, r);
      }
      if (r === b) {
        // g > r === b
        return twofactor(colorLime, g, r);
      }
    }
    case b: {
      if (r === g) {
        // b > r === g
        return twofactor(colorBlue, b, r);
      }
    }
    default: {
      throw new Error("not implemented");
    }
  }
}

function assertValidRGBValue(value: number) {
  if (Number.isInteger(value) && value >= 0 && value <= 255) {
    return;
  }
  throw new Error(`'${value}' is not a valid RGB value.`);
}

function grayscale(v: number, zeroString: string): string {
  if (v === 0) {
    return zeroString;
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
    return degree64(v - 128, "silver", "gray");
  }
  if (v === 192) {
    return "silver";
  }
  if (v < 255) {
    // silver --- white zone
    return degree64(v - 192, "white", "silver");
  }
  return "white";
}

function singlePart(value: number, colorId: number): string {
  if (value === 0) {
    return "";
  }

  if (value < 128) {
    // dark part
    return degree128(value, basicColors[colorId + 1], "black", "");
  } else if (value === 128) {
    return basicColors[colorId + 1];
  } else if (value < 255) {
    // light part
    return degree128(
      value - 128,
      basicColors[colorId],
      basicColors[colorId + 1]
    );
  } else {
    return basicColors[colorId];
  }
}

function twofactor(
  mainColorId: number,
  mainValue: number,
  lightness: number
): string {
  const mainPart = singlePart(mainValue, mainColorId);
  const color =
    lightness > 0
      ? degree256(lightness, "white", basicColors[mainColorId], mainPart)
      : mainPart;
  return color;
}
