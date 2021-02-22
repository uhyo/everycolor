import type { Declaration } from "postcss";
import { basicColors } from "../basicColors";
import { degreeWords } from "../degreeWords";
import { toRGB } from "../toRGB";

const possibleNames = new RegExp(
  `\\b(?:${basicColors
    .concat(degreeWords)
    .filter((x) => x)
    .concat(["black", "gray", "silver", "white"])
    .join("|")})[a-zA-Z0-9]+`,
  "g"
);

const processedSymbol = Symbol();

const plugin = () => {
  return {
    postcssPlugin: "everycolor",
    Declaration(decl: Declaration) {
      if ((decl as any)[processedSymbol]) return;
      (decl as any)[processedSymbol] = true;

      decl.value = decl.value.replace(possibleNames, (name) => {
        if (basicColors.includes(name)) {
          return name;
        }
        const res = toRGB(name);
        if (res) {
          return `rgb(${res.r}, ${res.g}, ${res.b})`;
        }
        return name;
      });
    },
  };
};
plugin.postcss = true;
export default plugin;
