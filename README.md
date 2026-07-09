<div align="center">
  <img alt="Forgent AI" src="assets/Forgent_Horizontal_Logo.png" width="400">

  <p><i>Personal AI, On Personal Devices.</i></p>

  <p>
    <a href="https://github.com/dugrotj83/Forgent-AI"><img src="https://img.shields.io/badge/project-Forgent%20AI-blue" alt="Project"></a>
    <img src="https://img.shields.io/badge/python-%3E%3D3.10-blue" alt="Python">
    <img src="https://img.shields.io/badge/license-Apache%202.0-green" alt="License">
  </p>
</div>

---

<div align="center">
  <img alt="Forgent AI demo reel" src="assets/forgent_demo_reel.webp" width="75%">
</div>

---

> **Forgent AI** is a branded fork of [OpenJarvis](https://github.com/open-jarvis/OpenJarvis)
> (Apache 2.0). Same local-first personal AI stack — agents, engines, tools,
> memory, learning — with the `forgent` CLI and Forgent product naming.
>
> Upstream docs & paper: [openjarvis.stanford.edu](https://openjarvis.stanford.edu/) ·
> [arXiv:2605.17172](https://arxiv.org/abs/2605.17172)
>
> **Forgent docs site:** [dugrotj83.github.io/Forgent-AI](https://dugrotj83.github.io/Forgent-AI/)
> (requires GitHub Pages enabled — see below)

## Docs / GitHub Pages

The docs workflow builds MkDocs and deploys to GitHub Pages. If you see
**Page not found**, Pages is not enabled on the repo yet:

1. Open [Settings → Pages](https://github.com/dugrotj83/Forgent-AI/settings/pages)
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Re-run **Deploy Documentation** on `main` (Actions → Deploy Documentation → Run workflow)

Site URL: `https://dugrotj83.github.io/Forgent-AI/`

## Netlify (web UI)

The Forgent chat frontend (`frontend/`) deploys to Netlify via `netlify.toml`:

- **Base directory:** `frontend`
- **Build command:** `npm ci && npm run build:web`
- **Publish directory:** `frontend/dist` (relative to repo: `dist` under base)

If the Netlify site shows a 404, clear any overridden publish directory in the
Netlify UI so it uses `netlify.toml`, then trigger a new deploy from `main`.

The full local agent runtime is still `uv run forgent` — Netlify hosts the SPA only.

## Why Forgent AI?

Personal AI agents are exploding in popularity, but nearly all of them still route intelligence through cloud APIs. Your "personal" AI continues to depend on someone else's server. OpenJarvis showed that local language models already handle most single-turn chat and reasoning queries — and that the missing piece is the software stack.

Forgent AI is that stack, forked and rebranded for this project: shared primitives for on-device agents; evaluations that treat energy, FLOPs, latency, and dollar cost as first-class constraints; and a learning loop that improves models from local traces.

## Installation

### Contributor / from source (recommended while Forgent installers are wired up)

```bash
git clone https://github.com/dugrotj83/Forgent-AI.git
cd Forgent-AI
uv sync --extra server
uv run forgent --help
```

Optional extras mirror upstream OpenJarvis (`desktop`, `inference-cloud`, `memory-faiss`, channel packs, etc.). See `pyproject.toml`.

Platform installers live under `scripts/install/` (same shape as OpenJarvis). Desktop builds are under `frontend/` + `desktop/`.

Then `forgent` to start. `forgent doctor` shows status.

## Quick Start

```bash
forgent                          # start chatting (default: chat-simple)
forgent init --preset <name>     # switch to a starter config
```

> Prefix `forgent ...` with `uv run`, or `source .venv/bin/activate` first.

| Preset | What it does |
|---|---|
| `morning-digest-mac` / `morning-digest-linux` / `morning-digest-minimal` | Spoken daily briefing from email, calendar, health, news |
| `deep-research` | Multi-hop research across indexed docs with citations |
| `code-assistant` | Agent with code execution, file I/O, and shell access |
| `scheduled-monitor` | Stateful agent on a schedule with memory |
| `chat-simple` | Lightweight conversation, no tools |

Example:

```bash
forgent init --preset morning-digest-mac
forgent connect gdrive          # one OAuth covers Gmail / Calendar / Tasks
forgent digest --fresh          # generate and play your first briefing
```

### Skills

```bash
forgent skill install hermes:arxiv
forgent skill sync hermes --category research
forgent ask "Use the code-explainer skill to explain this Python code: for i in range(5): print(i*2)"
forgent optimize skills --policy dspy
forgent bench skills --max-samples 5 --seeds 42
```

### Built-in Agents

Forgent AI ships with eight built-in agents across three execution modes (on-demand, scheduled, continuous):

| Agent | Type | What it does |
|-------|------|-------------|
| `morning_digest` | Scheduled | Daily briefing from email, calendar, health, news — with TTS audio |
| `deep_research` | On-demand | Multi-hop research with citations across web and local docs |
| `monitor_operative` | Continuous | Long-horizon monitoring with memory, compression, and retrieval |
| `orchestrator` | On-demand | Multi-turn reasoning with automatic tool selection |
| `native_react` | On-demand | ReAct (Thought-Action-Observation) loop agent |
| `operative` | Continuous | Persistent autonomous agent with state management |
| `native_openhands` | On-demand | CodeAct — generates and executes Python code |
| `simple` | On-demand | Single-turn chat, no tools |

## Stack layout

Same architecture as OpenJarvis:

- `src/forgent/` — Python package (agents, engine, memory, server, CLI, …)
- `frontend/` — Vite + React + Tauri desktop/chat UI
- `rust/` — native acceleration crates (`forgent-rust`)
- `configs/forgent/` — presets and prompts
- `deploy/` — Docker, systemd, launchd, Windows service
- `tests/` — upstream test suite, rebranded

## Attribution

This repository is a derivative of **OpenJarvis** by The OpenJarvis Authors,
licensed under Apache 2.0. See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).

```bibtex
@misc{saadfalcon2026openjarvispersonalaipersonal,
      title={OpenJarvis: Personal AI, On Personal Devices},
      author={Jon Saad-Falcon and Avanika Narayan and Robby Manihani and Tanvir Bhathal and Herumb Shandilya and Hakki Orhun Akengin and Gabriel Bo and Andrew Park and Matthew Hart and Caia Costello and Chuan Li and Christopher Ré and Azalia Mirhoseini},
      year={2026},
      eprint={2605.17172},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2605.17172},
}
```

## License

[Apache 2.0](LICENSE)
