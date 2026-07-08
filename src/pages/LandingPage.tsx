import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteNav } from "../components/SiteNav";

const primitives = [
  {
    index: "01",
    title: "Intelligence",
    copy: "Route each step to the right model for the job — fast local reasoning when it fits, stronger models when the task demands it.",
  },
  {
    index: "02",
    title: "Agents",
    copy: "Built-in agent types for orchestration, deep research, code work, and long-horizon monitoring — the same shape as OpenJarvis.",
  },
  {
    index: "03",
    title: "Tools & Memory",
    copy: "Search, retrieval, file I/O, calculators, and persistent state so workflows can act, not just chat.",
  },
  {
    index: "04",
    title: "Learning Loop",
    copy: "Every run leaves a trace. Traces become the feedback that tightens prompts, tool choice, and agent behavior over time.",
  },
];

const steps = [
  {
    title: "Goal",
    copy: "State the outcome. Forgent turns it into an executable agent plan.",
  },
  {
    title: "Plan",
    copy: "The agent decomposes work into tool-using steps with clear success criteria.",
  },
  {
    title: "Act",
    copy: "Tools run in sequence — search, recall, draft, verify — with observations logged.",
  },
  {
    title: "Ship",
    copy: "A final answer lands with a readable trace you can inspect and reuse.",
  },
];

export function LandingPage() {
  return (
    <div>
      <SiteNav />
      <section className="hero">
        <div className="hero__media" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />
        <div className="shell hero__content">
          <motion.h1
            className="hero__brand"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Forgent <span>AI</span>
          </motion.h1>
          <motion.p
            className="hero__headline"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Agentic workflows that plan, tool, and ship.
          </motion.p>
          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Personal AI primitives — agents, engines, tools, and memory —
            composed into workflows you can run and inspect.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            <Link className="btn btn--primary" to="/studio">
              Launch Studio
              <ArrowRight size={18} />
            </Link>
            <a className="btn btn--ghost" href="#primitives">
              See primitives
            </a>
          </motion.div>
        </div>
      </section>

      <section className="section" id="primitives">
        <div className="shell">
          <p className="section__eyebrow">From OpenJarvis DNA</p>
          <h2 className="section__title">Four primitives for agentic work</h2>
          <p className="section__copy">
            Forgent AI takes the OpenJarvis stack — intelligence, agents, tools,
            and learning — and focuses it on workflow composition.
          </p>
          <div className="primitive-list">
            {primitives.map((item, index) => (
              <motion.article
                className="primitive"
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="primitive__index">{item.index}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="shell">
          <p className="section__eyebrow">Workflow loop</p>
          <h2 className="section__title">Goal → plan → act → ship</h2>
          <p className="section__copy">
            One composition, one job per stage. Every run leaves a trace you can
            audit.
          </p>
          <div className="workflow-strip">
            {steps.map((step, index) => (
              <motion.div
                className="workflow-step"
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <strong>
                  {index + 1}. {step.title}
                </strong>
                <span>{step.copy}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell">
          <motion.div
            className="cta-band__panel"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Run your first agentic workflow</h2>
            <p>
              Open the studio, pick an agent, and watch Forgent plan tools,
              observe results, and return a shippable answer.
            </p>
            <Link className="btn btn--warm" to="/studio">
              Enter Studio
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <span>Forgent AI — agentic workflows</span>
          <span>
            Inspired by{" "}
            <a
              href="https://github.com/open-jarvis/OpenJarvis"
              target="_blank"
              rel="noreferrer"
            >
              OpenJarvis
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
