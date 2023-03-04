import { describe, it, expect } from "vitest";
import type { VTypeDecleration } from "../openai/vtype";
import { VType } from "../openai/vtype";
import { createBranchPrompt } from "../openai/branch_prompt";

describe("createBranchPrompt", () => {
  it("simple case", () => {
    const result = createBranchPrompt({
      context: "I am a cat",
      hypothesis: "I am a dog",
    });

    expect(result).toMatchSnapshot();
  });

  it("add examples", () => {
    const result = createBranchPrompt({
      context: "I am a cat",
      hypothesis: "I am a dog",
      examples: [
        {
          prompt: "I am a cat, I am a dog",
          output: false,
        },
        {
          prompt: "I am a dog, I am a cat",
          output: true,
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});
