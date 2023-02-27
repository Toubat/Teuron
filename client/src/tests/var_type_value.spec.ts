import { describe, it, expect } from "vitest";
import type { VarTypeValue } from "../openai/var_types";
import { VarType, createVarTypeValueString } from "../openai/var_types";

describe("createVarTypeValueString", () => {
  it("number", () => {
    const value: VarTypeValue<VarType.Number> = 1;
    const result = createVarTypeValueString(value);
    expect(result).toBe("1");
  });

  it("boolean", () => {
    const value: VarTypeValue<VarType.Boolean> = true;
    const result = createVarTypeValueString(value);
    expect(result).toBe("true");

    const value2: VarTypeValue<VarType.Boolean> = false;
    const result2 = createVarTypeValueString(value2);
    expect(result2).toBe("false");
  });

  it("string", () => {
    const value: VarTypeValue<VarType.String> = "hello";
    const result = createVarTypeValueString(value);
    expect(result).toBe('"hello"');
  });

  it("array", () => {
    const value: VarTypeValue<VarType.Array> = [1, 2, 3];
    const result = createVarTypeValueString(value);
    expect(result).toBe("[1, 2, 3]");
  });

  it("object", () => {
    const value: VarTypeValue<VarType.Object> = {
      a: "hello",
      b: 1,
    };

    const result = createVarTypeValueString(value);
    expect(result).matchSnapshot();
  });

  it("nested object", () => {
    const value: VarTypeValue<VarType.Object> = {
      a: "hello",
      b: 1,
      c: {
        d: "world",
      },
    };

    const result = createVarTypeValueString(value);
    expect(result).matchSnapshot();
  });

  it("nested array", () => {
    const value: VarTypeValue<VarType.Object> = {
      a: "hello",
      b: 1,
      c: {
        d: "world",
      },
      e: [1, 2, 3],
    };

    const result = createVarTypeValueString(value);
    expect(result).matchSnapshot();

    const value2: VarTypeValue<VarType.Object> = {
      a: "hello",
      b: 1,
      c: {
        d: "world",
      },
      e: [1, 2, 3],
      f: {
        g: "hello",
        h: 1,
        i: {
          j: "world",
        },
        k: [1, 2, 3],
      },
    };

    const result2 = createVarTypeValueString(value2);
    expect(result2).matchSnapshot();
  });
});
