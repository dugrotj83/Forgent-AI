import type { Config, Context } from "@netlify/functions";
import OpenAI from "openai";
import { AGENTS } from "../../src/lib/agents.ts";
import type { AgentId } from "../../src/lib/agents.ts";
import {
  buildDemoWorkflow,
  parseAgentWorkflowJson,
} from "./_shared/workflow.ts";

const AGENT_IDS = new Set(AGENTS.map((agent) => agent.id));

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

function isAgentId(value: unknown): value is AgentId {
  return typeof value === "string" && AGENT_IDS.has(value as AgentId);
}

export default async (req: Request, _context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: { agent?: unknown; goal?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const goal = typeof body.goal === "string" ? body.goal.trim() : "";
  if (!goal) {
    return json({ error: "goal is required" }, 400);
  }
  if (goal.length > 4000) {
    return json({ error: "goal is too long" }, 400);
  }

  const agentId: AgentId = isAgentId(body.agent) ? body.agent : "orchestrator";
  const agent = AGENTS.find((item) => item.id === agentId) ?? AGENTS[0];

  const hasGateway =
    Boolean(Netlify.env.get("OPENAI_API_KEY")) ||
    Boolean(Netlify.env.get("NETLIFY_AI_GATEWAY_KEY"));

  if (!hasGateway) {
    const demo = buildDemoWorkflow(agentId, goal);
    return json({
      agent: agentId,
      goal,
      ...demo,
      demo: true,
    });
  }

  try {
    const openai = new OpenAI();
    const model = "gpt-4.1-mini";
    const completion = await openai.chat.completions.create({
      model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: [
            agent.systemPrompt,
            "",
            "Return ONLY valid JSON with this shape:",
            '{ "steps": [ { "kind": "plan|tool|observe", "title": string, "body": string } ], "answer": string }',
            `Available tools: ${agent.tools.join(", ")}.`,
            "Include 4-6 steps that show planning and tool use before the final answer.",
            "Do not wrap the JSON in markdown fences.",
          ].join("\n"),
        },
        {
          role: "user",
          content: goal,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = parseAgentWorkflowJson(content);

    if (!parsed) {
      const demo = buildDemoWorkflow(agentId, goal);
      return json({
        agent: agentId,
        goal,
        steps: demo.steps,
        answer: content || demo.answer,
        model,
        demo: !content,
      });
    }

    return json({
      agent: agentId,
      goal,
      steps: parsed.steps,
      answer: parsed.answer,
      model,
      demo: false,
    });
  } catch (error) {
    const demo = buildDemoWorkflow(agentId, goal);
    const message =
      error instanceof Error ? error.message : "Model request failed";
    return json({
      agent: agentId,
      goal,
      ...demo,
      demo: true,
      warning: message,
    });
  }
};

export const config: Config = {
  path: "/api/workflow",
  method: ["POST", "OPTIONS"],
};
