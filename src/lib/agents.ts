export type AgentId =
  | "orchestrator"
  | "deep_research"
  | "code_assistant"
  | "monitor";

export type TraceKind = "plan" | "tool" | "observe" | "answer";

export interface AgentDefinition {
  id: AgentId;
  name: string;
  summary: string;
  tools: string[];
  systemPrompt: string;
  starterPrompt: string;
}

export interface TraceStep {
  id: string;
  kind: TraceKind;
  title: string;
  body: string;
}

export interface WorkflowResponse {
  agent: AgentId;
  goal: string;
  steps: TraceStep[];
  answer: string;
  model: string;
  demo?: boolean;
}

export const AGENTS: AgentDefinition[] = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    summary:
      "Multi-turn reasoning with automatic tool selection across search, memory, and code.",
    tools: ["web_search", "memory_recall", "calculator", "file_io"],
    systemPrompt:
      "You are Forgent Orchestrator, an agentic workflow planner. Break goals into tool-using steps, then produce a clear final answer.",
    starterPrompt:
      "Plan a weekly content pipeline for a B2B AI product launch, including research, drafting, and review checkpoints.",
  },
  {
    id: "deep_research",
    name: "Deep Research",
    summary:
      "Multi-hop research with citations across web sources and local context.",
    tools: ["web_search", "retrieve_docs", "cite_sources"],
    systemPrompt:
      "You are Forgent Deep Research. Investigate thoroughly, compare sources, and cite claims in the final brief.",
    starterPrompt:
      "Compare local-first personal AI stacks versus cloud-only assistants. Summarize tradeoffs for privacy, latency, and cost.",
  },
  {
    id: "code_assistant",
    name: "Code Assistant",
    summary:
      "Reads repos, proposes edits, and runs shell-safe reasoning for implementation work.",
    tools: ["read_files", "propose_patch", "run_checks"],
    systemPrompt:
      "You are Forgent Code Assistant. Prefer concrete implementation plans, file-level changes, and verification steps.",
    starterPrompt:
      "Design an agent workflow runner with typed steps, retries, and a streaming event log for a Vite + Netlify app.",
  },
  {
    id: "monitor",
    name: "Monitor Operative",
    summary:
      "Long-horizon monitoring with memory compression and scheduled follow-ups.",
    tools: ["memory_store", "schedule_check", "alert"],
    systemPrompt:
      "You are Forgent Monitor Operative. Track ongoing goals, compress state, and recommend the next watch actions.",
    starterPrompt:
      "Watch competitor pricing pages and product changelogs for a developer tools company. Propose an alert policy.",
  },
];

export function getAgent(id: AgentId): AgentDefinition {
  return AGENTS.find((agent) => agent.id === id) ?? AGENTS[0];
}
