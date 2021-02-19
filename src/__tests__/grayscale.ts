import { fromRGB } from "../fromRGB";

describe("fromRGB grayscale", () => {
  describe("basic colors", () => {
    it.each([
      [0, 0, 0, "black"],
      [128, 128, 128, "gray"],
      [192, 192, 192, "silver"],
      [255, 255, 255, "white"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
  describe("other colors", () => {
    it.each([
      // gray zone
      [1, 1, 1, "infinitesimalgray"],
      [2, 2, 2, "slightgray"],
      [3, 3, 3, "slightinfinitesimalgray"],
      [4, 4, 4, "bitgray"],
      [5, 5, 5, "bitinfinitesimalgray"],
      [6, 6, 6, "bitslightgray"],
      [7, 7, 7, "bitslightinfinitesimalgray"],
      [8, 8, 8, "littlegray"],
      [15, 15, 15, "somewhatgraybutinfinitesimalblack"],
      [16, 16, 16, "somewhatgray"],
      [20, 20, 20, "somewhatbitgray"],
      [32, 32, 32, "quartergray"],
      [41, 41, 41, "quarterlittleinfinitesimalgray"],
      [64, 64, 64, "halfgray"],
      [72, 72, 72, "halflittlegray"],
      [124, 124, 124, "graybutbitblack"],
      [125, 125, 125, "halfquartersomewhatlittlebitinfinitesimalgray"],
      [126, 126, 126, "graybutslightblack"],
      [127, 127, 127, "graybutinfinitesimalblack"],
      // sliver zone
      [129, 129, 129, "grayslightsilver"],
      [130, 130, 130, "graybitsilver"],
      [131, 131, 131, "graybitslightsilver"],
      [134, 134, 134, "graylittlebitsilver"],
      [136, 136, 136, "graysomewhatsilver"],
      [190, 190, 190, "silverbutbitgray"],
      [191, 191, 191, "silverbutslightgray"],
      [224, 224, 224, "silverhalfwhite"],
      [252, 252, 252, "whitebutlittlesilver"],
      [253, 253, 253, "silverhalfquartersomewhatlittleslightwhite"],
      [254, 254, 254, "whitebutbitsilver"],
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
});
