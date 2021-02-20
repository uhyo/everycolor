const words = [
  "infinitesimal",
  "imperceptible",
  "slight",
  "bit",
  "little",
  "somewhat",
  "quarter",
  "half",
  "",
];

const isPowerOf2: boolean[] = [];
for (let i = 0; i < 256; i++) isPowerOf2[i] = false;
isPowerOf2[1] = isPowerOf2[2] = isPowerOf2[4] = isPowerOf2[8] = isPowerOf2[16] = isPowerOf2[32] = isPowerOf2[64] = isPowerOf2[128] = true;

/**
 * Pass integer in [1, 255]
 * @param v degree.
 * @param color name of color at 256.
 * @param opposite name of color at 0.
 * @param normalPrefix prefix used when not starting from opposite.
 */
export function degree256(
  v: number,
  color: string,
  opposite: string,
  normalPrefix: string = opposite
): string {
  let result = "";
  for (let p = 8; p >= 0; p--) {
    if (v >= 1 << p) {
      result += words[p];
      v -= 1 << p;
    } else if (isPowerOf2[(1 << p) - v]) {
      // v = 1 => rank = 1, v = 2 => rank = 2, v = 4 => rank = 3, ...
      const rank = 31 - Math.clz32((1 << p) - v);
      if (p - rank >= 4) {
        // special "but" case
        return (
          (p === 8 ? "" : normalPrefix) +
          result +
          words[p] +
          color +
          "but" +
          words[rank] +
          opposite
        );
      }
    }
  }
  return normalPrefix + result + color;
}

export function degree128(
  v: number,
  color: string,
  opposite: string,
  normalPrefix: string = opposite
): string {
  return degree256(v << 1, color, opposite, normalPrefix);
}

export function degree64(
  v: number,
  color: string,
  opposite: string,
  normalPrefix: string = opposite
): string {
  return degree256(v << 2, color, opposite, normalPrefix);
}
