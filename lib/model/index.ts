import { ChatOpenAI } from "langchain/chat_models/openai";

export const model = new ChatOpenAI({
  // modelName: "gpt-4-1106-preview", // Larger context window, need at least 5 dollars for this 🐩
  temperature: 0.0,
});
