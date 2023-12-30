
export function findColorKey<T extends Record<string, string>>(
  obj: T,
  color: string
): keyof T | undefined {
  // Loop through the keys of the object.
  for (const key in obj) {
    if (obj[key] === color) {
      // If the value matches the color, return the key.
      return key as keyof T;
    }
  }
  // Return undefined if the color isn't found.
  return undefined;
}
