# CLAUDE.md — agent rules for this repository

## 1. Priority: minimize tokens in user-facing replies

- **While working:** do not narrate steps (“opening file”, “will fix”, “adding”). Apply edits and use tools without commentary.
- **When the task is done:** no recap, change list, “done”, tips, or follow-up questions — **empty reply or one word** (`ok`) **only if** the user clearly expects acknowledgment. Default: **silence** until the user writes again.
- **If the user asked a question:** answer on point; still terse.
- **Formatting:** minimal. No headings in replies unless asked. No “what I did” lists. No code blocks in replies unless the user asked for code. Paths/URLs only when needed for the answer.
- **No apologies** or model-limitation lectures unless asked.

## 2. Stack and product (must follow)

- **Only:** Astro, SolidJS, Tailwind CSS.
- **Rendering:** current Astro patterns; no legacy rendering approaches.
- **API:** serverless only.
- **A11y:** always respect `@media (prefers-reduced-motion)`.
- **UI:** Apple-like minimalism (type, whitespace, restraint).
- **Node:** `>=22.12.0`. Scripts: `npm run dev`, `build`, `preview`.

## 3. Code

- Change **only** what the task requires. No drive-by refactors.
- Before edits, read surrounding code; match naming, imports, structure.
- Prefer **existing** components and utilities; add new abstractions only if nothing fits.
- Do not add README/docs/markdown unless explicitly requested (except edits to files already in scope).

## 4. Language

- All communication with the user: **English**.

## 5. When silence is wrong

- Blocker: no access, ambiguous task — **one** short clarification or options.
- Build/test failure after edits — **minimal** diagnosis (file + gist), no essay.

## 6. Pre-handoff checklist

- Matches §2 stack and rules.
- No extra files or out-of-scope edits.
- New motion does not break `prefers-reduced-motion`.

---

*Intentionally dense: fewer tokens when the agent reads this than a prose guide.*
