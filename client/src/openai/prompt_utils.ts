import { VType, VTypeValue } from "./vtype";

export interface PromptExample<T extends VType> {
  prompt: string;
  output: VTypeValue<T>;
}

export function createArgumentDescription(
  paramName: string,
  varType: string,
  description: string
): string {
  return `- ${paramName} (${varType}): ${description}`;
}

export function createInput(prompt: string): string {
  return `Input: ${prompt}`;
}

export function createOutput(output: string): string {
  return `Output: ${output}`;
}
