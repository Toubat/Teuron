import { EMPTY_STRING, FALSE, TRUE } from "../shared";
import { createInput, createOutput, PromptExample } from "./prompt_utils";
import { VType } from "./vtype";

const BRANCH_PROMPT_INTRO = `Given a context and a hypothesis, return whether the hypothesis is true or false based on the context.\n`;

interface BranchOptions {
  context: string;
  hypothesis: string;
  examples?: PromptExample<VType.Boolean>[];
}

export function createBranchPrompt({ context, hypothesis, examples = [] }: BranchOptions): string {
  const prompts: string[] = [];
  const push = (str: string) => prompts.push(str);

  push(BRANCH_PROMPT_INTRO);

  examples.forEach((example) => {
    push(createInput(example.prompt));
    push(createOutput(`${example.output ? TRUE : FALSE}\n`));
  });

  push(createInput(`Context: ${context}, Hypothesis: ${hypothesis}`));
  push(createOutput(EMPTY_STRING));

  return prompts.join("\n");
}
