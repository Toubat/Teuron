import { EMPTY_STRING } from "../shared";
import { createInput, createOutput } from "./prompt_utils";

const BRANCH_PROMPT_INTRO = `Given a context and a hypothesis, return whether the hypothesis is true or false based on the context.\n`;

interface BranchOptions {
  context: string;
  hypothesis: string;
  examples?: string[];
}

export function createBranchPrompt({ context, hypothesis, examples }: BranchOptions): string {
  const prompts: string[] = [];
  const push = (str: string) => prompts.push(str);

  push(BRANCH_PROMPT_INTRO);
  push(createInput(`Context: ${context}, Hypothesis: ${hypothesis}`));
  push(createOutput(EMPTY_STRING));

  return prompts.join("\n");
}
