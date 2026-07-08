import type { AgentId, TraceKind, TraceStep } from "../../src/lib/agents.ts";

const AGENT_TOOLS: Record<AgentId, string[]> = {
  orchestrator: ["web_search", "memory_recall", "calculator", "file_io"],
  deep_research: ["web_search", "retrieve_docs", "cite_sources"],
  code_assistant: ["read_files", "propose_patch", "run_checks"],
  monitor: ["memory_store", "schedule_check", "alert"],
};

function step(
  kind: TraceKind,
  title: string,
  body: string,
  index: number,
): TraceStep {
  return {
    id: `${kind}-${index}`,
    kind,
    title,
    body,
  };
}

export function buildDemoWorkflow(
  agent: AgentId,
  goal: string,
): { steps: TraceStep[]; answer: string; model: string } {
  const tools = AGENT_TOOLS[agent] ?? AGENT_TOOLS.orchestrator;
  const primary = tools[0];
  const secondary = tools[1] ?? tools[0];

  const steps: TraceStep[] = [
    step(
      "plan",
      "Decompose goal",
      `Break the request into executable stages for the ${agent.replaceAll("_", " ")} agent.\nGoal: ${goal}`,
      1,
    ),
    step(
      "tool",
      `Call ${primary}`,
      `Gather grounding context with ${primary} before drafting the deliverable.`,
      2,
    ),
    step(
      "observe",
      "Synthesize findings",
      "Context retrieved. Constraints identified. Ready to produce a concrete next-step plan.",
      3,
    ),
    step(
      "tool",
      `Call ${secondary}`,
      `Use ${secondary} to refine the draft and lock verification criteria.`,
      4,
    ),
    step(
      "observe",
      "Validate output shape",
      "Checks passed for clarity, actionability, and trace completeness.",
      5,
    ),
  ];

  const answer = [
    `Forgent ${agent.replaceAll("_", " ")} demo run`,
    "",
    `Goal: ${goal}`,
    "",
    "Recommended workflow:",
    `1. Clarify success criteria and constraints.`,
    `2. Run ${primary} to collect source material.`,
    `3. Draft the deliverable with explicit assumptions.`,
    `4. Verify with ${secondary} and package a shippable summary.`,
    "",
    "This response was generated in demo mode because the Netlify AI Gateway was unavailable. Deploy the site with AI Features enabled for live model runs.",
  ].join("\n");

  return {
    steps,
    answer,
    model: "forgent-demo-planner",
  };
}

export function parseAgentWorkflowJson(raw: string): {
  steps: TraceStep[];
  answer: string;
} | null {
  try {
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    const parsed = JSON.parse(cleaned) as {
      steps?: Array<{
        kind?: string;
        title?: string;
        body?: string;
      }>;
      answer?: string;
    };

    if (!parsed.answer || !Array.isArray(parsed.steps)) {
      return null;
    }

    const allowed: TraceKind[] = ["plan", "tool", "observe", "answer"];
    const steps = parsed.steps
      .filter((item) => item && item.title && item.body)
      .map((item, index) => {
        const kind = allowed.includes(item.kind as TraceKind)
          ? (item.kind as TraceKind)
          : "plan";
        return step(kind, String(item.title), String(item.body), index + 1);
      });

    if (!steps.length) return null;
    return { steps, answer: String(parsed.answer) };
  } catch {
    return null;
  }
}
