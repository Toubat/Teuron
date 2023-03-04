export const VAR_TYPE_VALUE_STOP_SYMBOL = ";;";
export const ARROW = "->";
export const EMPTY_STRING = "";

export function isObject(value: any): boolean {
  return value !== null && typeof value === "object";
}

export function isString(value: any): boolean {
  return typeof value === "string";
}

export function isNumber(value: any): boolean {
  return typeof value === "number";
}

export function isBoolean(value: any): boolean {
  return typeof value === "boolean";
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}
