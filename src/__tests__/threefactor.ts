import { fromRGB } from "../fromRGB";

describe("threefactor", () => {
  it.each([
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
  ])("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
    expect(fromRGB(r, g, b)).toBe(expected);
  });
});
