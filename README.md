# Forgent AI

Agentic workflows that plan, tool, and ship.

Forgent AI is an application inspired by [OpenJarvis](https://github.com/open-jarvis/OpenJarvis) — personal AI primitives for intelligence, agents, tools/memory, and learning — focused on composing those primitives into inspectable workflows.

## Features

- **Landing** — brand-first product surface for Forgent AI
- **Studio** — pick an agent (Orchestrator, Deep Research, Code Assistant, Monitor) and run a goal
- **Trace view** — plan → tool → observe → answer
- **Netlify Functions + AI Gateway** — live model runs via OpenAI SDK; demo planner fallback when the gateway is offline

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deploy on Netlify

```bash
npm run build
npx netlify deploy --prod
```

After the first production deploy, enable **AI Features** on the Netlify site so the AI Gateway can inject provider credentials. Do not set your own `OPENAI_API_KEY` — that bypasses the gateway.

## Stack

- Vite + React + TypeScript
- Netlify Functions (`/api/workflow`)
- Netlify AI Gateway (`gpt-4.1-mini`)
- Motion + Instrument Sans / Syne

## OpenJarvis lineage

Forgent mirrors OpenJarvis agent modes and the Goal → Plan → Act → Ship loop, adapted for a Netlify-hosted workflow studio rather than a full local-first runtime.
