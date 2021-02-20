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
      if (g > b) {
        // r > g > b
        return threefactor(colorRed, colorYellow, colorBlue, r, g, b);
      } else {
        // r > b > g
        return threefactor(colorRed, colorFuchsia, colorLime, r, b, g);
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
      if (r > b) {
        // g > r > b
        return threefactor(colorLime, colorYellow, colorBlue, g, r, b);
      } else {
        // g > b > r
        return threefactor(colorLime, colorAqua, colorRed, g, b, r);
      }
    }
    case b: {
      if (r === g) {
        // b > r === g
        return twofactor(colorBlue, b, r);
      }
      if (r > g) {
        // b > r > g
        return threefactor(colorBlue, colorFuchsia, colorLime, b, r, g);
      } else {
        // b > g > r
        return threefactor(colorBlue, colorAqua, colorRed, b, g, r);
      }
    }
    default: {
      throw new Error("unreachable");
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
  if (mainValue < 128) {
    return lightness > 0
      ? degree128(lightness, "gray", basicColors[mainColorId], mainPart)
      : mainPart;
  }
  if (mainValue < 255) {
    return lightness > 0
      ? mainPart + degree256(lightness, "white", basicColors[mainColorId], "")
      : mainPart;
  }
  return lightness > 0
    ? degree256(lightness, "white", basicColors[mainColorId])
    : mainPart;
}

function threefactor(
  mainColorId: number,
  sub1ColorId: number,
  _sub2ColorId: number,
  mainValue: number,
  sub1Value: number,
  sub2Value: number
): string {
  const mainPart = singlePart(mainValue, mainColorId);
  const sub1Part = singlePart(sub1Value, sub1ColorId);
  const prefix = mainPart + sub1Part;

  if (mainValue < 128) {
    return sub2Value > 0
      ? degree128(sub2Value, "gray", basicColors[mainColorId], prefix)
      : prefix;
  }
  if (mainValue < 255) {
    return sub2Value > 0
      ? prefix + degree256(sub2Value, "white", basicColors[mainColorId], "")
      : prefix;
  }
  return sub2Value > 0 ? degree256(sub2Value, "white", prefix) : prefix;
}
