# AGENTS.md — HumanyxAI Website

> Steering file for AI coding agents (Kimi Code CLI and compatible tools).
> Read this fully before writing any code. If anything here conflicts with a user instruction, ask before proceeding.

## Project overview

Marketing site for **HumanyxAI** (`humanyxai.com`), an independent Australian AI consultancy run by a freelance operator with ~20 years of enterprise delivery background. Positioning is **consultancy-first**: voice/conversational AI agents are a *specialisation within* the consultancy, not the brand identity.

Three service lines (deliberately separated):

1. **AI Audit & Tool Recommendation** — standalone, priced, vendor-agnostic door-opener engagement.
2. **Conversational & Voice AI Agents** — the specialisation; agents that handle real customer conversations and hand off honestly.
3. **Forward-Deployed Delivery (FDE)** — top-ticket offering from $30,000 AUD; an engineer embeds on-site end-to-end with three months of support and ROI reporting.

**Current state: pre-build.** The repository contains strategy docs, approved reference prototypes, and media assets only — no site pages exist yet. The launch site is 6 pages + 1: `/` (homepage), `/consulting`, `/voice-agents`, `/demo`, `/pricing`, `/about`, `/contact` (see `private/SITE-ARCHITECTURE.md` §1). The planned first task is the homepage per `HANDOVER-PROMPT.md`.

Tagline: "Enterprise-grade conversations without enterprise-grade timelines." Signature: "Human by design."

## Locked decisions (do not re-litigate)

- Hero = "Cinematic Split" (reference implementation: `reference/hero-d.html`)
- Voice agent demo = "The Call", phone-first dial-out pattern (reference: `reference/demo-2.html`)
- Page surface is `#efeff2` (cool grey) — NOT the `#faf9fe` you may see in older notes (it is retired; `reference/styles.css` still carries it in `:root` and `hero-d.html` overrides it — follow the override, not the base)
- Typography: Playfair Display (headlines, 600) + Inter (body/UI, 400/500/600), via Google Fonts CDN with `display=swap`
- Strategic blue `#2d5bff` is for actions and italic accent words only — never small body text
- Corner radius 8px everywhere (exception: pills at `100px`/`50%`); flat "docked" elevation with one soft-shadow recipe
- Australian English spelling throughout (organisation, colour, specialise)

## Repository layout

```
/                      # site source will live here at the root (index.html etc. — not yet built)
assets/                # approved media: hero video loop, poster, logos, imagery (use ONLY these)
reference/             # APPROVED reference implementations — treat as ground truth for look & feel
private/               # strategy docs (gitignored — never commit, never quote on the public site)
HANDOVER-PROMPT.md     # setup + kickoff prompt + phase plan for the build
```

- No `package.json`, `pyproject.toml`, or any other manifest exists — there is deliberately nothing to install or configure.
- `HANDOVER-PROMPT.md` mentions a custom skill at `.kimi-code/skills/humanyxai-brand/SKILL.md` (mirrored in `.agents/skills/`). **Those directories are not present in this checkout** — if a task relies on the brand skill, enforce the same rules directly from `private/DESIGN-SYSTEM.md` and `private/SOUL.md`.
- `humanyxai-kimi-code-handover.zip` in the root is the original handover archive; it is gitignored. Do not extract or modify it.

## Authoritative documents (read in this order)

1. `private/DESIGN-SYSTEM.md` — all tokens, components, motion spec, accessibility/performance guardrails. **The law for anything visual.**
2. `private/COPY-DECK.md` — approved page copy (homepage + `/demo`). Do not invent marketing copy; where copy is missing, write in the voice defined in `private/SOUL.md` and flag it for review.
3. `private/SITE-ARCHITECTURE.md` — page list, per-page section schemas, build order, open decisions register, launch checklist.
4. `private/SOUL.md` — brand voice and values.
5. `reference/hero-d.html`, `reference/demo-2.html`, `reference/styles.css`, `reference/demo.css`, `reference/demo.js` — pixel/token-level reference. Match these patterns rather than inventing new ones.
6. `private/ORIGINAL-SITE-SPEC.md` — superseded product-first spec. Valid background only (keyword research, social-proof strategy, technical checklist); where it conflicts with `SITE-ARCHITECTURE.md`, the architecture doc wins.

## Stack, build and test

Static site. Plain HTML/CSS/JS, **no framework, no build step, no package manager** (deliberate — the design system is hand-tuned and a framework adds no value at this scale). If a future task genuinely requires a build tool, ask first.

- **Build:** none. Pages are hand-authored HTML with a shared stylesheet, page-specific `<style>` blocks in `<head>`, and vanilla JS.
- **Run/preview:** open the HTML file directly or serve the root with any static server, e.g. `python3 -m http.server`.
- **Tests:** no test suite exists. Verification is manual and visual:
  - Check at **1440px and 390px** viewports before declaring any page done
  - Check `prefers-reduced-motion` behaviour (rise animations, ambient zoom, pulses disabled)
  - Check all links resolve and all interactive elements are real `<button>`/`<a>`/`<input>` with visible focus states
- Fonts via Google Fonts CDN with `display=swap`. No CSS frameworks (no Tailwind/Bootstrap) — design tokens are CSS custom properties. Icons: inline SVG only.
- The demo's interactive layer is a **MOCK** (see `reference/demo.js` — integration seams are marked `// INTEGRATE:`). Do not wire real telephony/LLM calls unless the task explicitly says so.

## Code style guidelines

Match the reference files' existing patterns exactly:

- **CSS custom properties** for all tokens (`--surface`, `--ink`, `--ink-soft`, `--ink-faint`, `--blue`, `--blue-deep`, `--blue-tint`, `--line`, `--radius`, `--serif`, `--sans`, `--shadow-soft`); never hard-code a colour that has a token
- **BEM-ish class names** scoped by component (`.voice-card .vc-avatar`, `.console-head .ch-name`, `.stat-dock .stat .num`); shared base styles in a stylesheet, page-specific overrides in a `<style>` block in `<head>` — no inline `style=""` attributes
- **JS:** plain vanilla, no libraries; state in module-scope variables, `data-*` attributes as hooks (`[data-demo]`, `[data-dial]`), `setTimeout`-driven simulation with timer cleanup (see `reference/demo.js`)
- Type scale and motion are specified in `private/DESIGN-SYSTEM.md` §3 and §5 — use the `clamp()` sizes, `cubic-bezier(.22,1,.36,1)` easing, and staggered `.rise` entrance delays from the reference, don't improvise new ones
- The call-record transcript is a **grid row layout** (mono timestamp · uppercase speaker label · text), NOT chat bubbles — this is a deliberate differentiator

## Voice rules (for any user-facing text you must draft)

Say the specific thing, not the vague superlative. Confidence comes from track record, not adjectives. Witty is allowed, corporate and hype are not. Banned words/phrases: "cutting-edge", "revolutionary", "seamless", "unlock the power of", "supercharge", "game-changing", "leverage" (as a verb). If a sentence could appear on any AI vendor's website, rewrite it. Never fabricate testimonials, client logos, or statistics — the copy deck marks placeholders (e.g. `[Stat A]`, `[TBD]`) that must stay clearly marked until the client supplies real figures.

## Security and confidentiality considerations

- `private/` is **gitignored and must stay that way** — never commit it, and never copy text from it (strategy, pricing rationale, competitor analysis) into user-facing pages. The public site speaks only from approved copy.
- The repo is git-initialised but has **no commits yet** — commit between build phases so rollback exists at both the git and tool level. (Do not commit without being asked.)
- Do not wire real credentials or endpoints. Demo integration seams (`// INTEGRATE:` in `demo.js`) cover ElevenLabs voice previews, a realtime browser session (WebRTC/WebSocket), and an outbound-call endpoint (Twilio/Telnyx + 1Convo) — all stay mocked until an explicit backend-wiring task.
- The dial-out form captures real phone numbers once wired: trust microcopy ("We never share your details · One demo call per number") is a commitment — keep it accurate.
- Assets: use only files in `assets/`. Known asset issues to flag, not fix silently: `hero-loop.mp4` carries a faint CapCut watermark pending a clean export; `logo-full.png` has a baked-in light background and needs a grey-surface version from the client.

## Non-negotiable quality gates

- `prefers-reduced-motion`: disable ambient zoom, pulses, and rise animations
- Hero video: muted, `playsinline`, `loop`, poster frame, `preload="metadata"`, file ≤ 3MB
- Images: progressive JPEG/WebP, ≤ 250KB, always with `alt` text
- Blue `#2d5bff` never used for small body text (contrast) — actions and large accents only
- Schema.org where specified in `private/SITE-ARCHITECTURE.md` (Organization, LocalBusiness (Sydney), FAQPage, Service on `/consulting` + `/voice-agents`)
- Australian English. Test at 1440px and 390px viewports before declaring done

## Explicitly out of scope (unless a task says otherwise)

- Real backend wiring (Twilio/Telnyx, ElevenLabs, CRM, analytics) — the demo stays mocked
- Programmatic SEO pages (`/industries/*`, `/integrations/*`, `/voice-agents/*` sub-pages, `/resources/`) — post-launch
- Content/blog section — post-launch
- Redesigning locked components (hero, demo pattern, tokens)

## Workflow expectations

- Work **section-by-section** per `private/SITE-ARCHITECTURE.md` §6 build order (Homepage → /demo → /consulting + /voice-agents → /pricing + /about + /contact → backend wiring); one page per session, don't scaffold all pages at once
- Keep edits surgical; match the reference files' code style
- `private/SITE-ARCHITECTURE.md` §5 keeps an **open decisions register** (pricing entry-tier number, problem-section stats, voice names, final CTA wit level, watermark-free video, grey-surface logo, /demo noindex) — when you hit one, pause and flag it rather than guessing
- Before finishing any page: verify responsive behaviour, reduced-motion, and that all links resolve
