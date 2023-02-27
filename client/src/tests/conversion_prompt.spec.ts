import { describe, it, expect } from "vitest";
import type { VarTypeDecleration } from "../openai/var_types";
import { VarType } from "../openai/var_types";
import { createConversionPrompt } from "../openai/conversion_prompt";

describe("createConversionPrompt", () => {
  it("primitive types", () => {
    const typeNode: VarTypeDecleration<VarType.Number> = {
      type: VarType.Number,
      inner: VarType.Number,
    };

    const result = createConversionPrompt({
      typeNode,
      prompt: "1",
      functionName: "toString",
      returnName: "MyString",
      promptDescription: "Hello World",
      resultDescription: "Goodbye World",
    });
    expect(result).toMatchSnapshot();
  });

  it("array of object", () => {
    const typeNode: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: {
        type: VarType.Object,
        inner: {
          item: {
            type: VarType.String,
            inner: VarType.String,
          },
          price: {
            type: VarType.Number,
            inner: VarType.Number,
          },
          unit: {
            type: VarType.String,
            inner: VarType.String,
          },
        },
      },
    };

    const result = createConversionPrompt({
      typeNode,
      prompt: "yesterday, I ordered two crabs, total amount is $231.13; I also spent 35 cents",
      functionName: "extract",
      returnName: "ItemRecord",
      promptDescription: "message that contains a set of items and their prices",
      resultDescription: "a list of items and their associated prices",
      examples: [
        {
          prompt: "I eat a pancake that costs me $15",
          output: [{ item: "pancake", price: 15, unit: "dollar" }],
        },
        {
          prompt: "I bought three eggs, each costs me 1.5 cents",
          output: [{ item: "eggs", price: 4.5, unit: "cent" }],
        },
        {
          prompt: "I bought three eggs.",
          output: [{ item: "eggs", price: 0, unit: "" }],
        },
      ],
    });
    expect(result).toMatchSnapshot();
  });
});
