import { isArray, isBoolean, isNumber, isObject, isString } from "../shared";

export enum VType {
  Boolean = "boolean",
  Number = "number",
  String = "string",
  Array = "array",
  Object = "object",
}

type BoolDecleration = {
  type: VType.Boolean;
  inner: VType.Boolean;
};

type NumberDecleration = {
  type: VType.Number;
  inner: VType.Number;
};

type StringDecleration = {
  type: VType.String;
  inner: VType.String;
};

type ArrayDecleration = {
  type: VType.Array;
  inner: VTypeDecleration;
};

type ObjectDecleration = {
  type: VType.Object;
  inner: Record<string, VTypeDecleration>;
};

export type VTypeDecleration<T extends VType = any> = T extends VType.Boolean
  ? BoolDecleration
  : T extends VType.Number
  ? NumberDecleration
  : T extends VType.String
  ? StringDecleration
  : T extends VType.Array
  ? ArrayDecleration
  : T extends VType.Object
  ? ObjectDecleration
  : never;

export type VTypeValue<T extends VType = any> = T extends VType.Boolean
  ? boolean
  : T extends VType.Number
  ? number
  : T extends VType.String
  ? string
  : T extends VType.Object
  ? Record<string, VTypeValue>
  : T extends VType.Array
  ? VTypeValue[]
  : never;

export function createVTypeDeclerationString<T extends VType>(
  typeNode: VTypeDecleration<T>,
  indent = 1
): string {
  const { type, inner } = typeNode;
  const indentStr = "\t".repeat(indent);

  switch (type) {
    case VType.Boolean:
    case VType.Number:
    case VType.String:
      return inner;

    case VType.Array:
      return `${createVTypeDeclerationString(inner, indent)}[]`;

    case VType.Object:
      const lines: string[] = [];
      const push = (str: string) => lines.push(str);

      push("{");
      Object.entries(inner).forEach(([key, value]) => {
        push(`${indentStr}"${key}": ${createVTypeDeclerationString(value, indent + 1)};`);
      });
      push(`${indentStr.slice(1)}}`);
      return lines.join("\n");

    default:
      throw new Error("Invalid type");
  }
}

export function createVTypeValueString<T extends VType>(value: VTypeValue<T>): string {
  let raw: string;

  if (isBoolean(value)) {
    raw = value ? "true" : "false";
  } else if (isNumber(value)) {
    raw = value.toString();
  } else if (isString(value)) {
    raw = `"${value}"`;
  } else if (isArray(value)) {
    raw = `[${(value as VTypeValue[]).map((item) => createVTypeValueString(item)).join(", ")}]`;
  } else if (isObject(value)) {
    raw = `{${Object.entries(value as Record<string, VTypeValue>)
      .map(([key, value]) => `"${key}": ${createVTypeValueString(value)}`)
      .join(", ")}}`;
  } else {
    throw new Error("Invalid value");
  }

  return raw;
}
