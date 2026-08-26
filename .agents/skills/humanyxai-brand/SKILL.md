---
name: humanyxai-brand
description: Enforce the HumanyxAI design system and brand voice whenever creating or editing HTML, CSS, JS, or user-facing copy for the humanyxai-site project. Triggers on any page build, component, style, or copy task. Authoritative detail lives in private/DESIGN-SYSTEM.md and private/SOUL.md — read those for anything not covered here.
---

# HumanyxAI Brand Enforcement

Apply these rules to **every** visual or copy change. They are the condensed, operational form of `private/DESIGN-SYSTEM.md` and `private/SOUL.md`. If this file and a reference implementation disagree, the reference implementation wins (`reference/hero-d.html`, `reference/demo-2.html`, `reference/demo.css`).

## Before writing any code

1. Read `private/DESIGN-SYSTEM.md` for the full token table, motion spec, and component canon.
2. Read `private/COPY-DECK.md` for approved copy. **Never invent marketing copy.** Where copy is missing, write in the voice below and flag it for review.
3. Match `reference/` files at pixel/token level rather than inventing new patterns.

## Design tokens (never hard-code a colour that has a token)

- Surface `#efeff2` (`--surface`) — the locked cool grey. `#faf9fe` is **retired**; do not resurrect it.
- `--surface-dim` `#dcdce1`, `--surface-card` `#ffffff`, `--ink` `#17161d`, `--ink-soft` `#4b4a55`, `--ink-faint` `#8a8994`, `--blue` `#2d5bff`, `--blue-deep` `#1f44cc`, `--blue-tint` `#9db4ff`, `--line` `rgba(23,22,29,.12)`, `--success` `#22c55e` (live dot only).
- Radius: **8px everywhere**; pills only (badges, voice previews) at `100px`/`50%`.
- One shadow recipe: `--shadow-soft: 0 1px 2px rgba(23,22,29,.04), 0 12px 40px -12px rgba(23,22,29,.12)`; dark panels `0 20px 50px -16px rgba(23,22,29,.4)`.
- Typography: Playfair Display 600 for headlines (H1 `clamp(42px, 4.6vw, 64px)`; H2 `clamp(28–38px)`; H3 20–21px), Inter 400/500/600 for body/UI (13–14.5px UI; 16–17px body, `1.6–1.7` line-height, `--ink-soft`, max 46–56ch). Eyebrow: Inter 600, 11px, `+0.22em`, uppercase, `--ink-faint`, 22px blue rule.
- Google Fonts CDN with `display=swap`: `Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600` + `Inter:wght@400;500;600`.

## Blue discipline (the most-violated rule)

`#2d5bff` appears **only** on interactive/focus elements and italic accent words (max one accent phrase per headline; `--blue` on light, `--blue-tint` on dark). Never blue small body text — it fails contrast and cheapens the system.

## Motion

- Entrance: staggered `.rise` (`translateY(26px)→0`, 1s `cubic-bezier(.22,1,.36,1)`, delays .1s→.7s).
- Hero media: 28s ambient zoom, alternate, infinite. Hover: `translateY(-2px to -6px)` + shadow deepen. CTA arrow: `translateX(0→4px)`.
- **Global rule: `prefers-reduced-motion` disables zoom, pulses, rise animations, smooth scroll.** No exceptions.

## Code patterns

- Plain HTML/CSS/JS. No frameworks, no build step, no package manager. No inline `style=""` attributes.
- BEM-ish component classes (`.voice-card .vc-avatar`, `.stat-dock .stat .num`); shared base in a stylesheet, page overrides in a `<style>` block in `<head>`.
- JS: vanilla, module-scope state, `data-*` hooks, `setTimeout` simulation with timer cleanup (`reference/demo.js`). Demo integration seams are marked `// INTEGRATE:` and stay mocked unless the task explicitly wires a backend.
- Call-record transcript is a **grid row layout** (mono timestamp · uppercase speaker label · text), never chat bubbles.
- Icons: inline SVG only. All interactive elements are real `<button>`/`<a>`/`<input>` with visible focus states.
- Assets: use only files in `assets/`. Images ≤250KB with `alt`; hero video muted, `playsinline`, loop, poster, `preload="metadata"`, ≤3MB.

## Voice (all user-facing text)

Direct, confident, witty — never corporate, never hype. Say the specific thing, not the vague superlative. If a sentence could appear on any AI vendor's website, rewrite it. Banned: "cutting-edge", "revolutionary", "seamless", "unlock the power of", "supercharge", "game-changing", "leverage" (as a verb). Never fabricate testimonials, client logos, or statistics — placeholders (`[Stat A]`, `[TBD]`) stay clearly marked until the client supplies real figures. **Australian English** (organisation, colour, specialise).

## Confidentiality

`private/` is gitignored — never commit it, and never copy strategy, pricing rationale, or competitor analysis from it into user-facing pages. The public site speaks only from approved copy in `private/COPY-DECK.md`.

## Quality gates (run before declaring any page done)

- Check **1440px and 390px** viewports.
- Check `prefers-reduced-motion` behaviour.
- Check all links resolve; all interactive elements are real elements with focus states.
- Schema.org per `private/SITE-ARCHITECTURE.md` (Organization, LocalBusiness (Sydney), FAQPage on FAQ blocks, Service on `/consulting` + `/voice-agents`).

## Open decisions (flag, don't guess)

Pricing entry-tier number · problem-section stats · voice names/descriptors · final CTA wit level · watermark-free hero video · grey-surface logo lockup · `/demo` noindex. Full register: `private/SITE-ARCHITECTURE.md` §5.
