import { basicColors } from "./basicColors";
import { degreeWords } from "./degreeWords";

export type RGB = { r: number; g: number; b: number };

const initialState = 0;

const degreeMap = new Map<string, number>();
for (const [index, word] of degreeWords.entries()) {
  degreeMap.set(word, 1 << index);
}

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
          const v = degreeMap.get(m[0]) || 0;
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
  const result = readMainColor(mainDeg, mainColorName);

  let currentColor = mainColorName;
  for (const [deg, colorName] of colors.slice(1)) {
    if (!readSubColor(result, currentColor, deg, colorName)) {
      return undefined;
    }
  }
  result.r = cap(result.r);
  result.g = cap(result.g);
  result.b = cap(result.b);
  return result;
}

function readMainColor(deg: number, color: string): RGB {
  switch (color) {
    case "black": {
      return { r: 0, g: 0, b: 0 };
    }
    case "gray": {
      const gray = readDeg(deg) >> 1;
      return { r: gray, g: gray, b: gray };
    }
    case "silver": {
      const silver = 128 + (readDeg(deg) >> 2);
      return { r: silver, g: silver, b: silver };
    }
    case "white": {
      const white = 192 + (readDeg(deg) >> 2);
      return { r: white, g: white, b: white };
    }
    case "red": {
      const r = readDeg(deg);
      return { r, g: 0, b: 0 };
    }
    case "maroon": {
      const r = readDeg(deg) >> 1;
      return { r, g: 0, b: 0 };
    }
    case "yellow": {
      const rg = readDeg(deg);
      return { r: rg, g: rg, b: 0 };
    }
    case "olive": {
      const rg = readDeg(deg) >> 1;
      return { r: rg, g: rg, b: 0 };
    }
    case "lime": {
      const g = readDeg(deg);
      return { r: 0, g, b: 0 };
    }
    case "green": {
      const g = readDeg(deg) >> 1;
      return { r: 0, g, b: 0 };
    }
    case "aqua": {
      const gb = readDeg(deg);
      return { r: 0, g: gb, b: gb };
    }
    case "teal": {
      const gb = readDeg(deg) >> 1;
      return { r: 0, g: gb, b: gb };
    }
    case "blue": {
      const b = readDeg(deg);
      return { r: 0, g: 0, b };
    }
    case "navy": {
      const b = readDeg(deg) >> 1;
      return { r: 0, g: 0, b };
    }
    case "fuchsia": {
      const rb = readDeg(deg);
      return { r: rb, g: 0, b: rb };
    }
    case "purple": {
      const rb = readDeg(deg) >> 1;
      return { r: rb, g: 0, b: rb };
    }
  }
  return { r: 0, g: 0, b: 0 };
}

function readSubColor(
  result: RGB,
  mainColor: string,
  deg: number,
  color: string
): boolean {
  switch (mainColor) {
    // ----- grayscale -----
    case "black": {
      return false;
    }
    case "gray": {
      if (deg < 0) {
        switch (color) {
          case "black": {
            const value = deg >> 1;
            result.r += value;
            result.g += value;
            result.b += value;
            break;
          }
        }
        return true;
      }
      switch (color) {
        case "silver": {
          const value = readDeg(deg) >> 2;
          result.r += value;
          result.g += value;
          result.b += value;
          return true;
        }
      }
    }
    case "silver": {
      if (deg < 0) {
        switch (color) {
          case "gray": {
            const value = deg >> 2;
            result.r += value;
            result.g += value;
            result.b += value;
            break;
          }
        }
        return true;
      }
      switch (color) {
        case "white": {
          const value = readDeg(deg) >> 2;
          result.r += value;
          result.g += value;
          result.b += value;
          return true;
        }
      }
    }
    case "white": {
      if (deg < 0) {
        switch (color) {
          case "silver": {
            const value = deg >> 2;
            result.r += value;
            result.g += value;
            result.b += value;
            break;
          }
        }
        return true;
      }
      // ?
      return false;
    }
    case "red":
    case "maroon": {
      switch (color) {
        case "gray": {
          const gray = readDeg(deg) >> 1;
          result.g += gray;
          result.b += gray;
          return true;
        }
        case "white": {
          const white = cap(readDeg(deg));
          result.g += white;
          result.b += white;
          return true;
        }
      }
    }
  }
  return false;
}

function readDeg(deg: number) {
  return deg === 0 ? 256 : deg;
}
function cap(deg: number) {
  return deg > 255 ? 255 : deg;
}
