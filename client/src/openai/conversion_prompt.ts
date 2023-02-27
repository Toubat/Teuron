import { ARROW, VAR_TYPE_VALUE_STOP_SYMBOL } from "../shared";
import {
  createVarTypeDeclerationString,
  createVarTypeValueString,
  VarType,
  VarTypeDecleration,
  VarTypeValue,
} from "./var_types";

interface CraeteConversionExample<T extends VarType> {
  prompt: string;
  output: VarTypeValue<T>;
}

interface CreateConversionOptions<T extends VarType> {
  typeNode: VarTypeDecleration<T>;
  prompt: string;
  functionName: string;
  returnName?: string;
  promptDescription?: string;
  resultDescription?: string;
  examples?: CraeteConversionExample<T>[];
}

export function createArgumentDescription(
  paramName: string,
  varType: string,
  description: string
): string {
  return `- ${paramName} (${varType}): ${description}`;
}

export function createConversionPrompt<T extends VarType>({
  typeNode,
  prompt,
  functionName,
  returnName = "ReturnType",
  promptDescription = "A natural language description",
  resultDescription = "The result of the function",
  examples = [],
}: CreateConversionOptions<T>): string {
  const prompts: string[] = [];
  const push = (str: string) => prompts.push(str);

  push(`type ${returnName} = ${createVarTypeDeclerationString(typeNode)};\n`);
  push(`/*`);
  push(`Input:`);
  push(` ${createArgumentDescription("prompt", VarType.String, promptDescription)}`);
  push(`Return:`);
  push(` ${createArgumentDescription("result", returnName, resultDescription)}`);

  if (examples.length > 0) {
    push(`Examples:`);
    examples.forEach(({ prompt, output }) => {
      push(`${functionName}("${prompt}")`);
      push(`${ARROW} ${createVarTypeValueString(output)}${VAR_TYPE_VALUE_STOP_SYMBOL}`);
    });
  }

  push(`*/\n`);
  push(`function ${functionName}(prompt: string): ${returnName};\n`);
  push(
    `// Given input of ${functionName}, return the output (end with ${VAR_TYPE_VALUE_STOP_SYMBOL})`
  );
  push(`${functionName}("${prompt}")`);
  push(`${ARROW} `);

  return prompts.join("\n");
}
