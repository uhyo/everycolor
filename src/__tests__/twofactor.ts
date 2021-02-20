import { fromRGB } from "../fromRGB";

describe("twofactor", () => {
  describe("red", () => {
    it.each([
      // basic color
      [255, 0, 0, "red"],
      [128, 0, 0, "maroon"],
      // ligher than red
      [255, 1, 1, "redinfinitesimalwhite"],
      [255, 2, 2, "redimperceptiblewhite"],
      [255, 6, 6, "redslightimperceptiblewhite"],
      [255, 32, 32, "redsomewhatwhite"],
      [255, 65, 65, "redquarterinfinitesimalwhite"],
      [255, 127, 127, "redhalfwhitebutinfinitesimalred"],
      [255, 128, 128, "redhalfwhite"],
      [
        255,
        251,
        251,
        "redhalfquartersomewhatlittlebitimperceptibleinfinitesimalwhite",
      ],
      [255, 254, 254, "whitebutimperceptiblered"],
      // darker than red
      [1, 0, 0, "imperceptiblemaroon"],
      [2, 0, 0, "slightmaroon"],
      [3, 0, 0, "slightimperceptiblemaroon"],
      [4, 0, 0, "bitmaroon"],
      [124, 0, 0, "maroonbutbitblack"],
      [127, 0, 0, "maroonbutimperceptibleblack"],
      [129, 0, 0, "maroonimperceptiblered"],
      [133, 0, 0, "maroonbitimperceptiblered"],
      [200, 0, 0, "maroonhalflittlered"],
      [254, 0, 0, "redbutslightmaroon"],
      // non-pure
      [64, 4, 4, "halfmaroonbitgray"],
      [96, 9, 9, "halfquartermaroonlittleimperceptiblegray"],
      [128, 16, 16, "maroonlittlewhite"],
      [128, 127, 127, "maroonhalfwhitebutinfinitesimalred"],
      [192, 64, 64, "maroonhalfredquarterwhite"],
      [
        250,
        240,
        240,
        "maroonhalfquartersomewhatlittleslightredwhitebutlittlered",
      ],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("yellow", () => {
    it.each([
      // basic color
      [255, 255, 0, "yellow"],
      [128, 128, 0, "olive"],
      // ligher than yellow
      [255, 255, 3, "yellowimperceptibleinfinitesimalwhite"],
      [255, 255, 128, "yellowhalfwhite"],
      [255, 255, 192, "yellowhalfquarterwhite"],
      [255, 255, 240, "whitebutlittleyellow"],
      // darker than yellow
      [5, 5, 0, "bitimperceptibleolive"],
      [16, 16, 0, "somewhatolive"],
      [33, 33, 0, "quarterimperceptibleolive"],
      [240, 240, 0, "olivehalfquartersomewhatyellow"],
      // non-pure
      [9, 9, 2, "littleimperceptibleoliveslightgray"],
      [127, 127, 100, "olivebutimperceptibleblackhalfquarterbitgray"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("lime", () => {
    it.each([
      // basic color
      [0, 255, 0, "lime"],
      [0, 128, 0, "green"],
      // ligher than lime
      [12, 255, 12, "limebitslightwhite"],
      [24, 255, 24, "limelittlebitwhite"],
      [128, 255, 128, "limehalfwhite"],
      [222, 255, 222, "limehalfquartersomewhatwhitebutimperceptiblelime"],
      // darker than lime
      [0, 4, 0, "bitgreen"],
      [0, 11, 0, "littleslightimperceptiblegreen"],
      [0, 96, 0, "halfquartergreen"],
      [0, 120, 0, "greenbutlittleblack"],
      [0, 129, 0, "greenimperceptiblelime"],
      [0, 192, 0, "greenhalflime"],
      [0, 193, 0, "greenhalfimperceptiblelime"],
      [0, 201, 0, "greenhalflittleimperceptiblelime"],
      [0, 252, 0, "limebutbitgreen"],
      [0, 253, 0, "greenhalfquartersomewhatlittlebitimperceptiblelime"],
      [0, 254, 0, "limebutslightgreen"],
      // non-pure
      [15, 34, 15, "quarterslightgreensomewhatgraybutimperceptiblelime"],
      [90, 130, 90, "greenslightlimequarterlittlebitimperceptiblewhite"],
      [128, 160, 128, "greenquarterlimehalfwhite"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("aqua", () => {
    it.each([
      // basic color
      [0, 255, 255, "aqua"],
      [0, 128, 128, "teal"],
      // ligher than aqua
      [31, 255, 255, "aquasomewhatwhitebutinfinitesimalaqua"],
      [192, 255, 255, "aquahalfquarterwhite"],
      [250, 255, 255, "aquahalfquartersomewhatlittlebitimperceptiblewhite"],
      [254, 255, 255, "whitebutimperceptibleaqua"],
      // darker than aqua
      [0, 16, 16, "somewhatteal"],
      [0, 40, 40, "quarterlittleteal"],
      [0, 63, 63, "halftealbutimperceptibleblack"],
      [0, 99, 99, "halfquarterslightimperceptibleteal"],
      [0, 124, 124, "tealbutbitblack"],
      [0, 129, 129, "tealimperceptibleaqua"],
      [0, 200, 200, "tealhalflittleaqua"],
      [0, 203, 203, "tealhalflittleslightimperceptibleaqua"],
      [0, 248, 248, "aquabutlittleteal"],
      // non-pure
      [5, 8, 8, "littletealbitimperceptiblegray"],
      [18, 19, 19, "somewhatslightimperceptibletealsomewhatslightgray"],
      [1, 126, 126, "tealbutslightblackimperceptiblegray"],
      [240, 248, 248, "aquabutlittletealwhitebutlittleaqua"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("blue", () => {
    it.each([
      // basic color
      [0, 0, 255, "blue"],
      [0, 0, 128, "navy"],
      // ligher than blue
      [39, 39, 255, "bluesomewhatslightimperceptibleinfinitesimalwhite"],
      [80, 80, 255, "bluequarterlittlewhite"],
      [128, 128, 255, "bluehalfwhite"],
      [191, 191, 255, "bluehalfquarterwhitebutinfinitesimalblue"],
      [254, 254, 255, "whitebutimperceptibleblue"],
      // darker than blue
      [0, 0, 2, "slightnavy"],
      [0, 0, 17, "somewhatimperceptiblenavy"],
      [0, 0, 58, "quartersomewhatlittleslightnavy"],
      [0, 0, 63, "halfnavybutimperceptibleblack"],
      [0, 0, 88, "halfsomewhatlittlenavy"],
      [0, 0, 130, "navyslightblue"],
      [0, 0, 199, "navyhalfbitslightimperceptibleblue"],
      [0, 0, 224, "navyhalfquarterblue"],
      // non-pure
      [30, 30, 130, "navyslightbluesomewhatwhitebutimperceptibleblue"],
      [
        59,
        59,
        177,
        "navyquartersomewhatimperceptiblebluesomewhatlittlebitimperceptibleinfinitesimalwhite",
      ],
      [
        185,
        185,
        213,
        "navyhalfsomewhatbitimperceptiblebluehalfsomewhatlittlebitinfinitesimalwhite",
      ],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("fucusia", () => {
    it.each([
      // basic color
      [255, 0, 255, "fuchsia"],
      [128, 0, 128, "purple"],
      // ligher than fuchsia
      [255, 3, 255, "fuchsiaimperceptibleinfinitesimalwhite"],
      [255, 124, 255, "fuchsiahalfwhitebutslightfuchsia"],
      [255, 200, 255, "fuchsiahalfquarterbitwhite"],
      [255, 254, 255, "whitebutimperceptiblefuchsia"],
      // darker than fuchsia
      [7, 0, 7, "bitslightimperceptiblepurple"],
      [15, 0, 15, "somewhatpurplebutimperceptibleblack"],
      [31, 0, 31, "quarterpurplebutimperceptibleblack"],
      [77, 0, 77, "halflittlebitimperceptiblepurple"],
      [100, 0, 100, "halfquarterbitpurple"],
      [150, 0, 150, "purplesomewhatbitslightfuchsia"],
      [224, 0, 224, "purplehalfquarterfuchsia"],
      // non-pure
      [2, 1, 2, "slightpurpleimperceptiblegray"],
      [96, 13, 96, "halfquarterpurplelittlebitimperceptiblegray"],
      [
        224,
        50,
        224,
        "purplehalfquarterfuchsiasomewhatlittleimperceptiblewhite",
      ],
      [254, 1, 254, "fuchsiabutslightpurpleinfinitesimalwhite"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
});
