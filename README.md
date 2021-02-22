# everycolor

This package gives a unique name to every single color in the sRGB namespace.

## Usage

```ts
import { fromRGB, toRGB } from "everycolor";

console.log(fromRGB(255, 0, 0)); // "red"
console.log(fromRGB(255, 128, 128)); // "redhalfwhite"

console.log(toRGB("red")); // { r: 255, g: 0, b: 0 };
console.log(toRGB("readhalfwhite")); // { r: 255, g: 128, b: 128 }
```

### fromRGB

Converts given color to a color name. Throws if invalid value is passed.

### toRGB

Converts given color to RGB values. Returns undefined if unknown name is passed.

**Note**: until the release of 1.0.0, color names may be changed.

## PostCSS Plugin

This package also provides a [PostCSS](https://postcss.org/) plugin. Example `postcss.config.js` configuration:

```js
module.exports = {
  plugins: [require("everycolor/postcss")],
};
```

Then you can use `everycolor` colors in your CSS:

```css
a {
  color: bluetealsomewhatlittleimperceptibleaquasomewhatlittleimperceptibleinfinitesimalwhite;
}
```

Wow, nice!

## Contributing

Welcome

## License

MIT
