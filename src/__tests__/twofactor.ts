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
    ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
      expect(fromRGB(r, g, b)).toBe(expected);
    });
  });
});
