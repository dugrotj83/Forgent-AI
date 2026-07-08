import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoaderCircle, Sparkles } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { AGENTS, getAgent } from "../lib/agents";
import type { AgentId, TraceStep, WorkflowResponse } from "../lib/agents";

export function StudioPage() {
  const [agentId, setAgentId] = useState<AgentId>("orchestrator");
  const agent = useMemo(() => getAgent(agentId), [agentId]);
  const [goal, setGoal] = useState(agent.starterPrompt);
  const [steps, setSteps] = useState<TraceStep[]>([]);
  const [answer, setAnswer] = useState("");
  const [model, setModel] = useState("");
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setGoal(agent.starterPrompt);
    setSteps([]);
    setAnswer("");
    setModel("");
    setDemo(false);
    setError("");
  }, [agent]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = goal.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError("");
    setSteps([]);
    setAnswer("");
    setDemo(false);

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent: agentId, goal: trimmed }),
      });

      const payload = (await response.json()) as WorkflowResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Workflow request failed");
      }

      setSteps(payload.steps ?? []);
      setAnswer(payload.answer ?? "");
      setModel(payload.model ?? "");
      setDemo(Boolean(payload.demo));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="studio">
      <SiteNav ctaHref="/" ctaLabel="Home" />
      <div className="studio__layout">
        <aside className="studio__sidebar">
          <h2>Agents</h2>
          <p>
            Choose a Forgent agent. Each one mirrors an OpenJarvis execution
            mode with a focused tool set.
          </p>
          {AGENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`agent-option${agentId === item.id ? " is-active" : ""}`}
              onClick={() => setAgentId(item.id)}
            >
              <strong>{item.name}</strong>
              <span>{item.summary}</span>
            </button>
          ))}
        </aside>

        <section className="studio__main">
          <div className="studio__header">
            <div>
              <h1>{agent.name}</h1>
              <p>Tools: {agent.tools.join(" · ")}</p>
            </div>
            {model ? (
              <p>
                {demo ? "Demo mode · " : ""}
                {model}
              </p>
            ) : null}
          </div>

          {error ? <div className="error-banner">{error}</div> : null}

          <div className="trace-panel" aria-live="polite">
            {!steps.length && !answer && !loading ? (
              <p className="trace-empty">
                Submit a goal to forge a workflow. You will see plan, tool, and
                observation steps before the final answer.
              </p>
            ) : null}

            <AnimatePresence initial={false}>
              {steps.map((step, index) => (
                <motion.article
                  className="trace-step"
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <div className="trace-step__meta">
                    <span
                      className={`trace-step__kind trace-step__kind--${step.kind}`}
                    >
                      {step.kind}
                    </span>
                    <span>{step.title}</span>
                  </div>
                  <div className="trace-step__body">{step.body}</div>
                </motion.article>
              ))}
            </AnimatePresence>

            {answer ? (
              <motion.article
                className="trace-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="trace-step__meta">
                  <span className="trace-step__kind trace-step__kind--answer">
                    answer
                  </span>
                  <span>Final output</span>
                </div>
                <div className="trace-step__body">{answer}</div>
              </motion.article>
            ) : null}
          </div>

          <div className="composer">
            <form onSubmit={onSubmit}>
              <label className="visually-hidden" htmlFor="goal">
                Workflow goal
              </label>
              <textarea
                id="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                placeholder="Describe the outcome you want Forgent to forge…"
              />
              <div className="composer__row">
                <p className="composer__hint">
                  Runs through Netlify AI Gateway when enabled; otherwise a
                  local demo planner responds.
                </p>
                <button
                  className="btn btn--primary"
                  type="submit"
                  disabled={loading || !goal.trim()}
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={18} className="spin" />
                      Forging…
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Run workflow
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
