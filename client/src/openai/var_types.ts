import { isArray, isBoolean, isNumber, isObject, isString } from "../shared";

export enum VarType {
  Boolean = "boolean",
  Number = "number",
  String = "string",
  Array = "array",
  Object = "object",
}

export type VarTypeDecleration<T = VarType> = {
  type: T;
  inner: VarTypeDeclerationInner<T>;
};

export type VarTypeDeclerationInner<T = VarType> = T extends VarType.Boolean
  ? VarType.Boolean
  : T extends VarType.Number
  ? VarType.Number
  : T extends VarType.String
  ? VarType.String
  : T extends VarType.Object
  ? Record<string, VarTypeDecleration>
  : T extends VarType.Array
  ? VarTypeDecleration
  : never;

export type VarTypeValue<T = VarType> = T extends VarType.Boolean
  ? boolean
  : T extends VarType.Number
  ? number
  : T extends VarType.String
  ? string
  : T extends VarType.Object
  ? {
      [key: string]: VarTypeValue;
    }
  : T extends VarType.Array
  ? VarTypeValue[]
  : never;

export function createVarTypeDeclerationString<T extends VarType>(
  typeNode: VarTypeDecleration<T>,
  indent = 1
): string {
  const { type, inner } = typeNode;
  const indentStr = "\t".repeat(indent);

  switch (type) {
    case VarType.Boolean:
      return VarType.Boolean;

    case VarType.Number:
      return VarType.Number;

    case VarType.String:
      return VarType.String;

    case VarType.Array:
      return `${createVarTypeDeclerationString(inner as VarTypeDecleration, indent)}[]`;

    case VarType.Object:
      const lines: string[] = [];
      const push = (str: string) => lines.push(str);

      push("{");
      Object.entries(inner as Record<string, VarTypeDecleration>).forEach(([key, value]) => {
        push(`${indentStr}"${key}": ${createVarTypeDeclerationString(value, indent + 1)};`);
      });
      push(`${indentStr.slice(1)}}`);
      return lines.join("\n");

    default:
      throw new Error("Invalid type");
  }
}

export function createVarTypeValueString<T extends VarType>(value: VarTypeValue<T>): string {
  let raw: string;

  if (isBoolean(value)) {
    raw = value ? "true" : "false";
  } else if (isNumber(value)) {
    raw = value.toString();
  } else if (isString(value)) {
    raw = `"${value}"`;
  } else if (isArray(value)) {
    raw = `[${(value as VarTypeValue[]).map((item) => createVarTypeValueString(item)).join(", ")}]`;
  } else if (isObject(value)) {
    raw = `{${Object.entries(value as Record<string, VarTypeValue>)
      .map(([key, value]) => `"${key}": ${createVarTypeValueString(value)}`)
      .join(", ")}}`;
  } else {
    throw new Error("Invalid value");
  }

  return raw;
}
