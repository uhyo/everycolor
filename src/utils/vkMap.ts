export function vkMap<T>(array: readonly T[]): Map<T, number> {
  const result = new Map<T, number>();
  for (const [index, elm] of array.entries()) {
    result.set(elm, index);
  }
  return result;
}
