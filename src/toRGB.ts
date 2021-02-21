import {
  basicColors,
  colorAqua,
  colorBlack,
  colorBlue,
  colorFuchsia,
  colorGray,
  colorLime,
  colorRed,
  colorSilver,
  colorWhite,
  colorYellow,
  flipColor,
  isChromatic,
  isLightColor,
  normalizeToLightColor,
} from "./basicColors";
import { degreeWords } from "./degreeWords";
import { vkMap } from "./utils/vkMap";

export type RGB = { r: number; g: number; b: number };

type State = RGB & {
  mainColor: number;
  secondColor?: number;
  white: boolean;
};

const initialState = 0;

const degreeMap = vkMap(degreeWords);
const basicColorsMap = vkMap(basicColors);
basicColorsMap.set("black", colorBlack);
basicColorsMap.set("gray", colorGray);
basicColorsMap.set("silver", colorSilver);
basicColorsMap.set("white", colorWhite);

const degreeWordRegexp = new RegExp(
  degreeWords.filter((x) => x).join("|"),
  "y"
);
const basicColorRegexp = new RegExp(
  basicColors.concat(["black", "gray", "silver", "white"]).join("|"),
  "y"
);
const butRegexp = /but/y;

/**
 * Parse given color name into an RGB notation.
 * Undefined is returned for unknown color name.
 */
export function toRGB(colorName: string): RGB | undefined {
  let index = 0;
  let state = initialState;
  const tokenizedColors: [number, string][] = [];
  let degree = 0;
  let butFlag = false;

  loop: while (index < colorName.length) {
    // console.log(colorName.slice(index));
    switch (state) {
      case initialState: {
        degreeWordRegexp.lastIndex = index;
        const m = degreeWordRegexp.exec(colorName);
        if (m !== null) {
          // read a degree word
          index += m[0].length;
          const v = 1 << (degreeMap.get(m[0]) || 0);
          if (butFlag) {
            degree -= v;
          } else {
            degree += v;
          }
          continue loop;
        }

        basicColorRegexp.lastIndex = index;
        const m2 = basicColorRegexp.exec(colorName);
        if (m2 !== null) {
          // read a basic color word
          index += m2[0].length;
          tokenizedColors.push([degree, m2[0]]);
          degree = 0;
          butFlag = false;
          continue loop;
        }

        butRegexp.lastIndex = index;
        const m3 = butRegexp.exec(colorName);
        if (m3 !== null) {
          // read "but"
          index += m3[0].length;
          butFlag = true;
          continue loop;
        }
        break;
      }
    }
    return undefined;
  }
  return parse(tokenizedColors);
}

function parse(colors: readonly [number, string][]): RGB | undefined {
  // console.log(colors);
  if (colors.length === 0) {
    return undefined;
  }

  const [mainDeg, mainColorName] = colors[0];
  const mainColorId = basicColorsMap.get(mainColorName);
  if (mainColorId === undefined) {
    return undefined;
  }
  const result: State = readMainColor(mainDeg, mainColorId);

  for (const [deg, colorName] of colors.slice(1)) {
    // console.log(result);
    if (!readSubColor(result, deg, colorName)) {
      return undefined;
    }
  }
  return {
    r: cap(result.r),
    g: cap(result.g),
    b: cap(result.b),
  };
}

function readMainColor(deg: number, mainColor: number): State {
  switch (mainColor) {
    case colorBlack: {
      return { r: 0, g: 0, b: 0, white: true, mainColor };
    }
    case colorGray: {
      const gray = readDeg(deg) >> 1;
      return { r: gray, g: gray, b: gray, white: true, mainColor };
    }
    case colorSilver: {
      const silver = 128 + (readDeg(deg) >> 2);
      return { r: silver, g: silver, b: silver, white: true, mainColor };
    }
    case colorWhite: {
      const white = 192 + (readDeg(deg) >> 2);
      return { r: white, g: white, b: white, white: true, mainColor };
    }
    case colorRed: {
      const r = readDeg(deg);
      return { r, g: 0, b: 0, white: false, mainColor };
    }
    case colorRed + 1: {
      const r = readDeg(deg) >> 1;
      return { r, g: 0, b: 0, white: false, mainColor };
    }
    case colorYellow: {
      const rg = readDeg(deg);
      return { r: rg, g: rg, b: 0, white: false, mainColor };
    }
    case colorYellow + 1: {
      const rg = readDeg(deg) >> 1;
      return { r: rg, g: rg, b: 0, white: false, mainColor };
    }
    case colorLime: {
      const g = readDeg(deg);
      return { r: 0, g, b: 0, white: false, mainColor };
    }
    case colorLime + 1: {
      const g = readDeg(deg) >> 1;
      return { r: 0, g, b: 0, white: false, mainColor };
    }
    case colorAqua: {
      const gb = readDeg(deg);
      return { r: 0, g: gb, b: gb, white: false, mainColor };
    }
    case colorAqua + 1: {
      const gb = readDeg(deg) >> 1;
      return { r: 0, g: gb, b: gb, white: false, mainColor };
    }
    case colorBlue: {
      const b = readDeg(deg);
      return { r: 0, g: 0, b, white: false, mainColor };
    }
    case colorBlue + 1: {
      const b = readDeg(deg) >> 1;
      return { r: 0, g: 0, b, white: false, mainColor };
    }
    case colorFuchsia: {
      const rb = readDeg(deg);
      return { r: rb, g: 0, b: rb, white: false, mainColor };
    }
    case colorFuchsia + 1: {
      const rb = readDeg(deg) >> 1;
      return { r: rb, g: 0, b: rb, white: false, mainColor };
    }
  }
  return { r: 0, g: 0, b: 0, white: false, mainColor };
}

function readSubColor(result: State, deg: number, color: string): boolean {
  switch (color) {
    case "black": {
      if (result.mainColor === colorGray && deg < 0) {
        result.r += deg >> 1;
        result.g += deg >> 1;
        result.b += deg >> 1;
        return true;
      }
      if (isChromatic(result.mainColor) && deg < 0) {
        if (result.secondColor === undefined) {
          // main color is blacked
          const value = deg >> (isLightColor(result.mainColor) ? 0 : 1);
          addToColor(result, result.mainColor, value);
          return true;
        } else {
          // second color is blacked
          const addedColor = readSecondColor(result, result.secondColor);
          if (addedColor !== undefined) {
            const value = deg >> (isLightColor(result.secondColor) ? 0 : 1);
            addToColor(result, addedColor, value);
            return true;
          }
        }
        return true;
      }
      break;
    }
    case "gray": {
      if (result.mainColor === colorSilver && deg < 0) {
        result.r += deg >> 2;
        result.g += deg >> 2;
        result.b += deg >> 2;
        return true;
      }
      if (isChromatic(result.mainColor)) {
        if (result.secondColor === undefined) {
          // main color is grayed
          addToColor(result, flipColor(result.mainColor), deg >> 1);
          result.white = true;
          return true;
        } else {
          // third color
          const addedColor = readThirdColor(result);
          if (addedColor !== undefined) {
            addToColor(result, addedColor, readDeg(deg) >> 1);
            result.white = true;
            return true;
          }
        }
      }
      break;
    }
    case "silver": {
      if (result.mainColor === colorGray && deg > 0) {
        const value = readDeg(deg) >> 2;
        result.r += value;
        result.g += value;
        result.b += value;
        return true;
      }
      if (result.mainColor === colorWhite && deg < 0) {
        result.r += deg >> 2;
        result.g += deg >> 2;
        result.b += deg >> 2;
        return true;
      }
      break;
    }
    case "white": {
      if (result.mainColor === colorSilver && deg > 0) {
        const value = readDeg(deg) >> 2;
        result.r += value;
        result.g += value;
        result.b += value;
        return true;
      }
      if (isChromatic(result.mainColor)) {
        if (result.secondColor === undefined) {
          // main color is whited
          addToColor(result, flipColor(result.mainColor), readDeg(deg));
          result.white = true;
          return true;
        } else {
          // third color
          const addedColor = readThirdColor(result);
          if (addedColor !== undefined) {
            addToColor(result, addedColor, readDeg(deg));
            result.white = true;
            return true;
          }
        }
      }
      break;
    }
    default: {
      const colorId = basicColorsMap.get(color);
      if (colorId === undefined) {
        return false;
      }
      if (result.mainColor === colorWhite) {
        if (isLightColor(colorId)) {
          // backoff
          addToColor(result, flipColor(colorId), deg);
          result.mainColor = colorId;
          return true;
        }
      }
      if (!isChromatic(result.mainColor)) {
        return false;
      }
      if (result.white) {
        // backoff - seen from white
        if (result.secondColor === undefined) {
          addToColor(
            result,
            flipColor(result.mainColor),
            isLightColor(colorId) ? deg : deg >> 1
          );
          result.white = false;
          return true;
        } else {
          const addedColor = readThirdColor(result);
          if (addedColor !== undefined) {
            addToColor(result, addedColor, deg);
            result.white = false;
            return true;
          }
        }
      }
      result.white = false;

      if (result.secondColor !== undefined) {
        if (isChromatic(colorId)) {
          // secondColor
          const addedColor = readSecondColor(result, colorId);
          if (addedColor !== undefined) {
            if (isLightColor(result.secondColor)) {
              if (
                deg < 0 &&
                normalizeToLightColor(colorId) === result.secondColor
              ) {
                addToColor(result, addedColor, deg >> 1);
                return true;
              }
            } else {
              if (normalizeToLightColor(result.secondColor) === colorId) {
                addToColor(result, addedColor, deg >> 1);
                return true;
              }
            }
          }
        }
        return false;
      }
      // first color

      if (isLightColor(result.mainColor)) {
        // may accept backoff.
        if (deg < 0 && normalizeToLightColor(colorId) === result.mainColor) {
          addToColor(result, result.mainColor, deg >> 1);
          return true;
        }
      } else {
        // forward
        if (normalizeToLightColor(result.mainColor) === colorId) {
          addToColor(result, result.mainColor, deg >> 1);
          return true;
        }
      }
      // different color means transition to second color
      const secondColor = readSecondColor(result, colorId);
      if (secondColor !== undefined) {
        result.secondColor = colorId;
        addToColor(
          result,
          secondColor,
          isLightColor(colorId) ? readDeg(deg) : readDeg(deg) >> 1
        );
        return true;
      }
    }
  }
  return false;
}

/**
 * Second color is expressed as sibling color
 */
function readSecondColor(result: State, colorId: number): number | undefined {
  if (!isChromatic(result.mainColor)) {
    return undefined;
  }
  const colorIdN = normalizeToLightColor(colorId);
  switch (normalizeToLightColor(result.mainColor)) {
    case colorRed: {
      if (colorIdN === colorYellow) return colorLime;
      if (colorIdN === colorYellow + 1) return colorLime + 1;
      if (colorIdN === colorFuchsia) return colorBlue;
      if (colorIdN === colorFuchsia + 1) return colorBlue + 1;
      return undefined;
    }
    case colorLime: {
      if (colorIdN === colorYellow) return colorRed;
      if (colorIdN === colorYellow + 1) return colorRed + 1;
      if (colorIdN === colorAqua) return colorBlue;
      if (colorIdN === colorAqua + 1) return colorBlue + 1;
      return undefined;
    }
    case colorBlue: {
      if (colorIdN === colorAqua) return colorLime;
      if (colorIdN === colorAqua + 1) return colorLime + 1;
      if (colorIdN === colorFuchsia) return colorRed;
      if (colorIdN === colorFuchsia + 1) return colorRed + 1;
      return undefined;
    }
  }
  return undefined;
}

function readThirdColor(result: State): number | undefined {
  if (!isChromatic(result.mainColor) || result.secondColor === undefined) {
    return undefined;
  }
  return flipColor(normalizeToLightColor(result.secondColor));
}

function addToColor(rgb: RGB, colorId: number, value: number) {
  switch (normalizeToLightColor(colorId)) {
    case colorRed: {
      rgb.r += value;
      break;
    }
    case colorYellow: {
      rgb.r += value;
      rgb.g += value;
      break;
    }
    case colorLime: {
      rgb.g += value;
      break;
    }
    case colorAqua: {
      rgb.g += value;
      rgb.b += value;
      break;
    }
    case colorBlue: {
      rgb.b += value;
      break;
    }
    case colorFuchsia: {
      rgb.r += value;
      rgb.b += value;
      break;
    }
  }
}

function readDeg(deg: number) {
  return deg === 0 ? 256 : deg;
}
function cap(deg: number) {
  return deg > 255 ? 255 : deg;
}
