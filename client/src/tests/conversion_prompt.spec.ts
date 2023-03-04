import { describe, it, expect } from "vitest";
import type { VTypeDecleration } from "../openai/vtype";
import { VType } from "../openai/vtype";
import { createConversionPrompt } from "../openai/conversion_prompt";

describe("createConversionPrompt", () => {
  it("primitive types", () => {
    const typeNode: VTypeDecleration<VType.Number> = {
      type: VType.Number,
      inner: VType.Number,
    };

    const result = createConversionPrompt({
      typeNode,
      prompt: "1",
      functionName: "toString",
      returnName: "MyString",
      promptDescription: "Hello World",
      resultDescription: "Goodbye World",
      examples: [
        {
          prompt: "abc",
          output: 123,
        },
      ],
    });
    expect(result).toMatchSnapshot();
  });

  it("array of object", () => {
    const typeNode: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: {
        type: VType.Object,
        inner: {
          item: {
            type: VType.String,
            inner: VType.String,
          },
          price: {
            type: VType.Number,
            inner: VType.Number,
          },
          unit: {
            type: VType.String,
            inner: VType.String,
          },
        },
      },
    };

    /*
    type ItemRecord = {
      item: string;
      price: number;
      unit: string;
    };


    */

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
