export function isEmpty<T>(value: T | null | undefined): value is null | undefined {
  if (
    value === undefined ||
    value === null ||
    ((typeof value === 'number' && isNaN(value)) ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length < 1) ||
      (typeof value === 'object' && Object.keys(value).length < 1))
  ) {
    return true;
  }
  return false;
}

export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return !isEmpty<T>(value);
}
