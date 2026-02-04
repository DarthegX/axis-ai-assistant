import { createAgent } from "langchain";
import { SYSTEM_PROMPT } from "./prompts.ts";
import { getWeather, searchKnowledge } from "./tools.ts";

const tools = [
  getWeather,
  searchKnowledge
];

/**
 * The main agent instance.
 *
 * Uses createAgent from LangChain, which provides:
 * - A simpler interface for building agents
 * - Built-in middleware support for customization
 * - Automatic tool binding and execution
 * - Runs on LangGraph for durable execution
 */
export const agent = createAgent({
  model: "anthropic:claude-haiku-4-5",

  tools: tools,

  systemPrompt: SYSTEM_PROMPT,

  // Optional: Add middleware for advanced customization
  // middleware: [
  //   summarizationMiddleware({
  //     model: "anthropic:claude-haiku-4-5",
  //     trigger: { tokens: 4000 },
  //   }),
  //   humanInTheLoopMiddleware({
  //     interruptOn: { sensitive_tool: { allowedDecisions: ["approve", "reject"] } },
  //   }),
  // ],
});
