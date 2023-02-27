import { Configuration, OpenAIApi } from "openai";
import type { CreateCompletionRequest } from "openai";

// TODO: delete this
const API_KEY = "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";
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createCompletion(request: CreateCompletionRequest) {
  const completion = await openai.createCompletion(request);
  return completion;
}
