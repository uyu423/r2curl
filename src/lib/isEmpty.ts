export default function isEmpty(value: any): value is null | undefined {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'number' && isNaN(value)) {
    return true;
  }
  if (typeof value === 'string' && value === '') {
    return true;
  }
  if (Array.isArray(value) && value.length < 1) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length < 1) {
    return true;
  }
  return false;
}
