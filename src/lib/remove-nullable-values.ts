type Nullable = undefined | null | '' | number | Record<string, never> | [];

/**
 * Checks if a value is nullable (undefined, null, empty string, NaN, empty object/array)
 * but excludes File, Blob, and Date objects
 * @param value - The value to check
 * @returns True if the value is nullable
 */
function isNullable(value: unknown): value is Nullable {
  // Always preserve File, Blob, and Date objects
  if (value instanceof File || value instanceof Blob || value instanceof Date) return false;

  // Explicit checks for primitive nullables
  if (value === undefined || value === null || value === '') return true;
  if (typeof value === 'number' && isNaN(value)) return true;

  // Check for empty objects or arrays
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value) && value.length === 0) return true;
    if (Object.keys(value).length === 0) return true;
  }

  return false;
}


/**
 * Recursively removes all nullable values from an object or array,
 * while preserving File, Blob, and Date objects.
 *
 * If a key path (dot notation) is in `allowNullablesKeys`, that property is preserved as-is.
 */
export function removeNullableValues<T>(
  obj: T,
  allowNullablesKeys: string[] = [],
  parentPath = ""
): T {
  // Handle primitives
  if (typeof obj !== "object" || obj === null) {
    return isNullable(obj) ? (undefined as unknown as T) : obj;
  }

  // Preserve File, Blob, Date
  if (obj instanceof File || obj instanceof Blob || obj instanceof Date) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const cleanArray = obj
      .map((item, index) =>
        removeNullableValues(item, allowNullablesKeys, `${parentPath}[${index}]`)
      )
      .filter((item) => !isNullable(item));

    return (cleanArray.length === 0
      ? (undefined as unknown as T)
      : (cleanArray as unknown as T));
  }

  // Handle objects
  const cleanObj: Record<string, unknown> = {};
  let hasValidProperties = false;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as Record<string, unknown>)[key];
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      // Whitelisted → preserve as-is
      if (allowNullablesKeys.includes(currentPath)) {
        cleanObj[key] = value;
        hasValidProperties = true;
        continue;
      }

      const cleanedValue = removeNullableValues(value, allowNullablesKeys, currentPath);

      if (!isNullable(cleanedValue)) {
        cleanObj[key] = cleanedValue;
        hasValidProperties = true;
      }
    }
  }

  return hasValidProperties
    ? (cleanObj as unknown as T)
    : (undefined as unknown as T);
}