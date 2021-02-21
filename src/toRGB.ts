import {
  basicColors,
  colorAqua,
  colorBlue,
  colorFuchsia,
  colorLime,
  colorRed,
  colorYellow,
  flipColor,
  isLightColor,
  normalizeToLightColor,
} from "./basicColors";
import { degreeWords } from "./degreeWords";
import { vkMap } from "./utils/vkMap";

export type RGB = { r: number; g: number; b: number };

type State = RGB & {
  mainColor: string;
  secondColor?: number;
  white: boolean;
};

const initialState = 0;

const degreeMap = vkMap(degreeWords);
const basicColorsMap = vkMap(basicColors);

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
  console.log(colors);
  if (colors.length === 0) {
    return undefined;
  }

  const [mainDeg, mainColorName] = colors[0];
  const result: State = readMainColor(mainDeg, mainColorName);

  for (const [deg, colorName] of colors.slice(1)) {
    console.log(result);
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

function readMainColor(deg: number, mainColor: string): State {
  switch (mainColor) {
    case "black": {
      return { r: 0, g: 0, b: 0, white: true, mainColor };
    }
    case "gray": {
      const gray = readDeg(deg) >> 1;
      return { r: gray, g: gray, b: gray, white: true, mainColor };
    }
    case "silver": {
      const silver = 128 + (readDeg(deg) >> 2);
      return { r: silver, g: silver, b: silver, white: true, mainColor };
    }
    case "white": {
      const white = 192 + (readDeg(deg) >> 2);
      return { r: white, g: white, b: white, white: true, mainColor };
    }
    case "red": {
      const r = readDeg(deg);
      return { r, g: 0, b: 0, white: false, mainColor };
    }
    case "maroon": {
      const r = readDeg(deg) >> 1;
      return { r, g: 0, b: 0, white: false, mainColor };
    }
    case "yellow": {
      const rg = readDeg(deg);
      return { r: rg, g: rg, b: 0, white: false, mainColor };
    }
    case "olive": {
      const rg = readDeg(deg) >> 1;
      return { r: rg, g: rg, b: 0, white: false, mainColor };
    }
    case "lime": {
      const g = readDeg(deg);
      return { r: 0, g, b: 0, white: false, mainColor };
    }
    case "green": {
      const g = readDeg(deg) >> 1;
      return { r: 0, g, b: 0, white: false, mainColor };
    }
    case "aqua": {
      const gb = readDeg(deg);
      return { r: 0, g: gb, b: gb, white: false, mainColor };
    }
    case "teal": {
      const gb = readDeg(deg) >> 1;
      return { r: 0, g: gb, b: gb, white: false, mainColor };
    }
    case "blue": {
      const b = readDeg(deg);
      return { r: 0, g: 0, b, white: false, mainColor };
    }
    case "navy": {
      const b = readDeg(deg) >> 1;
      return { r: 0, g: 0, b, white: false, mainColor };
    }
    case "fuchsia": {
      const rb = readDeg(deg);
      return { r: rb, g: 0, b: rb, white: false, mainColor };
    }
    case "purple": {
      const rb = readDeg(deg) >> 1;
      return { r: rb, g: 0, b: rb, white: false, mainColor };
    }
  }
  return { r: 0, g: 0, b: 0, white: false, mainColor };
}

function readSubColor(result: State, deg: number, color: string): boolean {
  const mainColorId = basicColorsMap.get(result.mainColor);
  switch (color) {
    case "black": {
      if (result.mainColor === "gray" && deg < 0) {
        result.r += deg >> 1;
        result.g += deg >> 1;
        result.b += deg >> 1;
        return true;
      }
      if (mainColorId !== undefined && deg < 0) {
        const value = deg >> (isLightColor(mainColorId) ? 0 : 1);
        addToColor(result, mainColorId, value);
        return true;
      }
      break;
    }
    case "gray": {
      if (result.mainColor === "silver" && deg < 0) {
        result.r += deg >> 2;
        result.g += deg >> 2;
        result.b += deg >> 2;
        return true;
      }
      if (mainColorId !== undefined) {
        addToColor(result, flipColor(mainColorId), deg >> 1);
        result.white = true;
        return true;
      }
      break;
    }
    case "silver": {
      if (result.mainColor === "gray" && deg > 0) {
        const value = readDeg(deg) >> 2;
        result.r += value;
        result.g += value;
        result.b += value;
        return true;
      }
      if (result.mainColor === "white" && deg < 0) {
        result.r += deg >> 2;
        result.g += deg >> 2;
        result.b += deg >> 2;
        return true;
      }
      break;
    }
    case "white": {
      if (result.mainColor === "silver" && deg > 0) {
        const value = readDeg(deg) >> 2;
        result.r += value;
        result.g += value;
        result.b += value;
        return true;
      }
      if (mainColorId !== undefined) {
        addToColor(result, flipColor(mainColorId), readDeg(deg));
        result.white = true;
        return true;
      }
      break;
    }
    default: {
      const colorId = basicColorsMap.get(color);
      if (colorId === undefined) {
        return false;
      }
      if (result.mainColor === "white") {
        if (isLightColor(colorId)) {
          // backoff
          addToColor(result, flipColor(colorId), deg);
          result.mainColor = color;
          return true;
        }
      }
      if (mainColorId === undefined) {
        return false;
      }
      if (result.white) {
        // backoff - seen from white
        addToColor(
          result,
          flipColor(mainColorId),
          isLightColor(colorId) ? deg : deg >> 1
        );
        return true;
      }
      result.white = false;

      if (isLightColor(mainColorId)) {
        // may accept backoff.
        if (deg < 0 && normalizeToLightColor(colorId) === mainColorId) {
          addToColor(result, mainColorId, deg >> 1);
          return true;
        }
      } else {
        // forward
        if (normalizeToLightColor(mainColorId) === colorId) {
          addToColor(result, mainColorId, deg >> 1);
          return true;
        }
      }
      // different color means second color
      const secondColor = readSecondColor(result, colorId);
      if (secondColor) {
        result.secondColor = secondColor;
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
  const colorIdN = normalizeToLightColor(colorId);
  switch (result.mainColor) {
    case "red": {
      if (colorIdN === colorYellow) return colorLime;
      if (colorIdN === colorFuchsia) return colorBlue;
      return undefined;
    }
    case "lime": {
      if (colorIdN === colorYellow) return colorRed;
      if (colorIdN === colorAqua) return colorBlue;
      return undefined;
    }
    case "blue": {
      if (colorIdN === colorAqua) return colorLime;
      if (colorIdN === colorFuchsia) return colorRed;
      return undefined;
    }
  }
  return undefined;
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
