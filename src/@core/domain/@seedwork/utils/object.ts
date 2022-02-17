export function deepFreeze<T>(object: T) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name as keyof T];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze<T>(object);
}
