# HumanyxAI × Kimi Code — Handover Pack

Everything you need to get Kimi Code building the site. Three parts: **setup**, **the kickoff prompt** (paste-ready), and **operating tips**.

---

## Part 1 — Setup (5 minutes)

```bash
# 1. Install / verify Kimi Code CLI
kimi --version        # or: curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

# 2. Create the project and drop this handover pack in as the repo root
mkdir humanyxai-site && cd humanyxai-site
#    → copy the CONTENTS of this handover folder into humanyxai-site/

# 3. Initialise git (this matters: Kimi Code finds the project root via .git,
#    and it protects your private strategy docs via the included .gitignore)
git init && git add -A && git status
#    → confirm nothing under private/ is staged. If it is: git rm -r --cached private

# 4. Launch
kimi
#    → first run: /login
#    → then run /init so Kimi scans the project — it will merge its findings
#      with the AGENTS.md provided (ours takes precedence; keep ours)
```

**What each piece does for the agent:**

| File/Folder | Role |
|---|---|
| `AGENTS.md` | Project steering — read automatically every session. Locked decisions, doc reading order, quality gates, scope fences. |
| `.kimi-code/skills/humanyxai-brand/SKILL.md` (mirrored in `.agents/skills/`) | Auto-triggering design skill — fires whenever the agent touches HTML/CSS/copy, enforcing tokens and voice rules without you repeating them. Invoke manually anytime with `/skill:humanyxai-brand`. |
| `private/` | Design system, copy deck, site architecture, brand soul, original spec. Gitignored — never ships. |
| `reference/` | Approved hero + demo implementations. The agent treats these as ground truth for look and feel. |
| `assets/` | Approved media (hero loop, poster, logos, imagery). The agent may only use these. |

---

## Part 2 — The kickoff prompt (paste this as your first message)

```
Read AGENTS.md fully, then read private/SITE-ARCHITECTURE.md, private/DESIGN-SYSTEM.md,
private/COPY-DECK.md, and private/SOUL.md in that order. Study the approved reference
implementations in reference/ (hero-d.html is the locked hero; demo-2.html is the locked
voice-agent demo) along with styles.css, demo.css, and demo.js.

Then build the homepage (index.html) exactly per the section schema in
SITE-ARCHITECTURE.md §2.1, all 8 sections, desktop and mobile responsive:

1. Hero: port reference/hero-d.html verbatim, using assets/hero-loop.mp4
2. The problem (copy deck §1 S2 — stat cards may use clearly-marked placeholder figures)
3. What we do — the journal-style service index (Audit → Voice AI specialisation →
   Forward-Deployed Delivery), linking to /consulting, /voice-agents (stub pages are fine)
4. The demo section — studio-forward variant of reference/demo-2.html with the mock
   interaction layer from demo.js; link out to /demo
5. How we work (3 steps)
6. Why HumanyxAI (3 pillars)
7. FAQ (6 items from copy deck §1 S7, FAQPage schema markup)
8. Final CTA

Plus: sticky nav (frosted on scroll) and the footer per SITE-ARCHITECTURE.md §3.

Constraints: follow the humanyxai-brand skill exactly; static HTML/CSS/JS only (no
frameworks, no build step); copy comes from the copy deck — do not invent marketing
copy; the demo stays mocked (do not wire real telephony); Organisation + LocalBusiness
schema; verify 1440px and 390px and prefers-reduced-motion before finishing.

Work section by section and show me the result before moving to the next phase.
```

**Why it's shaped this way:** it forces the doc-reading order (architecture → tokens → copy → voice), pins the reference files as ground truth, fences scope ("stays mocked", "no frameworks"), names the quality gates, and breaks the work into reviewable milestones rather than one giant autonomous run.

**Subsequent sessions** (once the homepage is approved), in order:

```
Phase 2: Build /demo (demo.html) as a standalone page per SITE-ARCHITECTURE.md §2.4,
porting reference/demo-2.html exactly. Mock interactions only.

Phase 3: Build /consulting and /voice-agents per §2.2 and §2.3 — same page shell as the
homepage (nav/footer/tokens), Service + FAQPage schema. /voice-agents carries the
missed-call maths stats and the 6-card capability grid.

Phase 4: Build /pricing, /about, /contact per §2.5–2.7. Pricing tiers: leave the entry
price as a clearly-marked [TBD] token I can find and fill — do not invent a number.
```

---

## Part 3 — Operating tips (what actually moves quality)

1. **Don't install plugins for this build.** The official marketplace is datasources and utilities — none serve a static marketing site. Your *custom skill* is the plugin that matters, and it's included. Adding third-party plugins now adds surface area, not quality.
2. **One page per session.** Kimi Code holds 256K context, but quality drifts on long autonomous runs. A page per session with your review between them beats a 6-page marathon. Use `/new` between phases.
3. **Use Plan mode for anything ambiguous.** `Shift-Tab` toggles it — the agent researches and presents an approach before touching files. Useful when you get to the backend wiring phase.
4. **If the agent drifts from the design**, say `/skill:humanyxai-brand` explicitly and point at the reference file: "Compare your section 3 against reference/hero-d.html's stat dock — match it."
5. **Video input is supported** — you can drop a screen recording of the prototype into chat and say "match this," which is a remarkably effective way to correct visual drift.
6. **Protect the private docs twice.** The `.gitignore` is included; also say in your first session: "never copy text from private/ into user-facing pages." (AGENTS.md already instructs this, but redundancy is cheap.)
7. **Voice/agent wiring comes last.** When you're ready: the seams are marked `// INTEGRATE:` in `demo.js` (ElevenLabs previews, realtime session, outbound-call endpoint). That phase is when MCP configuration (`/mcp-config`) becomes genuinely useful — e.g. wiring docs/API references for Twilio/Telnyx.
8. **Commit between phases** so `/undo` and git give you two layers of rollback.

---

## Open items the agent will encounter (decide these as you go)

These are marked in the docs, so the agent will pause at them rather than guess: pricing entry-tier number, problem-section statistics (needs sourced figures), voice names/descriptors, final CTA wit level ("Talk to a human about the machines."), watermark-free hero video, grey-surface logo lockup.
