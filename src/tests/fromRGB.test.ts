import {
  basicColorTestcases,
  grayscaleTestcases,
  threefactorTestcases,
  twofactorTestCases,
} from "./cases";
import { checkFromRGB } from "./util/checkColorNames";

describe("fromRGB", () => {
  describe("basic colors", () => {
    checkFromRGB(basicColorTestcases);
  });
  describe("grayscale", () => {
    checkFromRGB(grayscaleTestcases);
  });
  describe("twofactor", () => {
    checkFromRGB(twofactorTestCases);
  });
  describe("threefactor", () => {
    checkFromRGB(threefactorTestcases);
  });
});
