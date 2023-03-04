import { describe, it, expect } from "vitest";
import type { VTypeValue } from "../openai/vtype";
import { VType, createVTypeValueString } from "../openai/vtype";

describe("createVarTypeValueString", () => {
  it("number", () => {
    const value: VTypeValue<VType.Number> = 1;
    const result = createVTypeValueString(value);
    expect(result).toBe("1");
  });

  it("boolean", () => {
    const value: VTypeValue<VType.Boolean> = true;
    const result = createVTypeValueString(value);
    expect(result).toBe("true");

    const value2: VTypeValue<VType.Boolean> = false;
    const result2 = createVTypeValueString(value2);
    expect(result2).toBe("false");
  });

  it("string", () => {
    const value: VTypeValue<VType.String> = "hello";
    const result = createVTypeValueString(value);
    expect(result).toBe('"hello"');
  });

  it("array", () => {
    const value: VTypeValue<VType.Array> = [1, 2, 3];
    const result = createVTypeValueString(value);
    expect(result).toBe("[1, 2, 3]");
  });

  it("object", () => {
    const value: VTypeValue<VType.Object> = {
      a: "hello",
      b: 1,
    };

    const result = createVTypeValueString(value);
    expect(result).matchSnapshot();
  });

  it("nested object", () => {
    const value: VTypeValue<VType.Object> = {
      a: "hello",
      b: 1,
      c: {
        d: "world",
      },
    };

    const result = createVTypeValueString(value);
    expect(result).matchSnapshot();
  });

  it("nested array", () => {
    const value: VTypeValue<VType.Object> = {
      a: "hello",
      b: 1,
      c: {
        d: "world",
      },
      e: [1, 2, 3],
    };

    const result = createVTypeValueString(value);
    expect(result).matchSnapshot();

    const value2: VTypeValue<VType.Object> = {
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

    const result2 = createVTypeValueString(value2);
    expect(result2).matchSnapshot();
  });
});
