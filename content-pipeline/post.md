---
description: Run a content snippet through the full research → draft → review → market pipeline
argument-hint: "<paste a snippet, or give a path to a .md file>"
---

You are orchestrating the content pipeline. The input to process is below. If `$ARGUMENTS` looks like a file path, read that file; otherwise treat `$ARGUMENTS` as the raw snippet itself.

INPUT:
$ARGUMENTS

Run these four stages in order. Pass each stage's full output forward to the next — the agents share no memory, so you are the orchestrator carrying context between them.

1. **Research** — invoke the `content-researcher` subagent on the input. Wait for its findings.
2. **Draft** — invoke the `content-drafter` subagent, giving it BOTH the original input and the research findings.
3. **Review** — invoke the `content-reviewer` subagent, giving it the draft and the research findings.
   - If the verdict is REVISE, apply the fixes (re-invoke `content-drafter` with the reviewer's notes if the changes are substantial), then re-run the reviewer once. Do not loop more than twice.
4. **Market** — once the reviewer returns GO, invoke the `content-marketer` subagent on the final approved post.

Then present a single consolidated report with four clearly labeled sections (Research / Final Post / Review verdict / Distribution plan). Put the final post in its own fenced code block, copy-paste ready, with the link already moved to the first-comment instruction. Keep your synthesis tight — the agents did the work; don't repeat it, assemble it.
