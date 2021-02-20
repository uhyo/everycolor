import { fromRGB } from "../../fromRGB";
import { toRGB } from "../../toRGB";

export type ColorNameTestCase = readonly [
  r: number,
  g: number,
  b: number,
  name: string
];

export function checkFromRGB(colors: readonly ColorNameTestCase[]) {
  it.each(colors)("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
    expect(fromRGB(r, g, b)).toBe(expected);
  });
}

export function checkToRGB(colors: readonly ColorNameTestCase[]) {
  it.each(colors)("rgb(%i, %i, %i) is %s", (r, g, b, name) => {
    expect(toRGB(name)).toEqual({ r, g, b });
  });
}
