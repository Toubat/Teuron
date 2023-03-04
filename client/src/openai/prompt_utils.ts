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
