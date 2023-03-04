import { ARROW, VAR_TYPE_VALUE_STOP_SYMBOL } from "../shared";
import { createArgumentDescription, PromptExample } from "./prompt_utils";
import {
  createVTypeDeclerationString,
  createVTypeValueString,
  VType,
  VTypeDecleration,
} from "./vtype";

const DEFAULT_RETURN_NAME = "ReturnType";
const DEFAULT_PROMPT_DESCRIPTION = "A natural language description";
const DEFAULT_RESULT_DESCRIPTION = "The result of the function";

interface ConversionOptions<T extends VType> {
  typeNode: VTypeDecleration<T>;
  prompt: string;
  functionName: string;
  returnName?: string;
  promptDescription?: string;
  resultDescription?: string;
  examples?: PromptExample<T>[];
}

export function createConversionPrompt<T extends VType>({
  typeNode,
  prompt,
  functionName,
  returnName = DEFAULT_RETURN_NAME,
  promptDescription = DEFAULT_PROMPT_DESCRIPTION,
  resultDescription = DEFAULT_RESULT_DESCRIPTION,
  examples = [],
}: ConversionOptions<T>): string {
  const prompts: string[] = [];
  const push = (str: string) => prompts.push(str);

  push(`type ${returnName} = ${createVTypeDeclerationString(typeNode)};\n`);
  push(`/*`);
  push(`Input:`);
  push(` ${createArgumentDescription("prompt", VType.String, promptDescription)}`);
  push(`Return:`);
  push(` ${createArgumentDescription("result", returnName, resultDescription)}`);

  if (examples.length > 0) {
    push(`Examples:`);
    examples.forEach(({ prompt, output }) => {
      push(`${functionName}("${prompt}")`);
      push(`${ARROW} ${createVTypeValueString(output)}${VAR_TYPE_VALUE_STOP_SYMBOL}`);
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
