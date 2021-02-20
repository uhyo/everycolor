import { checkFromRGB } from "./util/checkColorNames";

describe("threefactor", () => {
  checkFromRGB([
    [255, 128, 64, "redolivequarterwhite"],
    [
      240,
      200,
      80,
      "maroonhalfquartersomewhatredolivehalflittleyellowquarterlittlewhite",
    ],
    [
      33,
      58,
      19,
      "quartersomewhatlittleslightgreenquarterimperceptibleolivesomewhatslightimperceptiblegray",
    ],
    [
      255,
      254,
      253,
      "redyellowbutslightolivehalfquartersomewhatlittlebitslightinfinitesimalwhite",
    ],
    [1, 3, 5, "bitimperceptiblenavyslightimperceptibletealimperceptiblegray"],
    [8, 250, 68, "greenhalfquartersomewhatlittleslightlimehalfbittealbitwhite"],
  ]);
});
