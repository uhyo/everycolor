import { fromRGB } from "../../fromRGB";

export function checkFromRGB(
  colors: readonly [r: number, g: number, b: number, name: string][]
) {
  it.each(colors)("rgb(%i, %i, %i) is %s", (r, g, b, expected) => {
    expect(fromRGB(r, g, b)).toBe(expected);
  });
}
