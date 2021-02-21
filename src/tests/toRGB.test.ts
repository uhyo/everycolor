import {
  basicColorTestcases,
  grayscaleTestcases,
  threefactorTestcases,
  twofactorTestCases,
} from "./cases";
import { checkToRGB } from "./util/checkColorNames";

describe("toRGB", () => {
  describe("basic colors", () => {
    checkToRGB(basicColorTestcases);
  });
  describe("grayscale", () => {
    checkToRGB(grayscaleTestcases);
  });
  describe("twofactor", () => {
    checkToRGB(twofactorTestCases);
  });
  describe("threefactor", () => {
    checkToRGB(threefactorTestcases);
  });
});
