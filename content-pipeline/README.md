# Flutter content pipeline for Claude Code

A four-agent pipeline that takes a raw technical snippet and returns a fact-checked,
publish-ready LinkedIn post plus a full distribution plan. Built for ankitranjan.dev.

## What's inside

```
.claude/
├── agents/
│   ├── content-researcher.md   # fact-checks claims against dart.dev / docs.flutter.dev
│   ├── content-drafter.md      # rewrites in your voice, fixes research flags, hooks the fold
│   ├── content-reviewer.md     # adversarial GO / REVISE gate
│   └── content-marketer.md     # link placement, timing, Shorts-first reel brief, cross-posts
└── commands/
    └── post.md                 # /post — orchestrates all four in sequence
```

## Install

Drop the `.claude/` folder into a project root (project scope, shareable via git):

```
cp -r .claude /path/to/your/repo/
```

…or into `~/.claude/` for personal scope (available in every project — agents go in
`~/.claude/agents/`, the command in `~/.claude/commands/`).

Run `/agents` in Claude Code to confirm the four subagents loaded.

## Use

```
/post "My Flutter app is huge!" No, you're just not tree shaking properly. ...
```

or point it at a file:

```
/post drafts/tree-shaking.md
```

The main session runs research → draft → review → market, carrying context between
agents (they don't share memory), and returns one consolidated report.

## Tuning

- **Models**: researcher/marketer default to `sonnet`, drafter/reviewer to `opus`.
  Change the `model:` line in any agent, or set `CLAUDE_CODE_SUBAGENT_MODEL` to
  override globally.
- **Voice / rules**: each agent's system prompt (the body below the frontmatter)
  encodes the standing rules — Flutter-first positioning, the staccato style, the
  accuracy bar, link-in-first-comment, and the Veo-3-never-touches-code split.
  Edit the body to adjust; you won't have to restate them per post.
- **Run a single stage**: `Use the content-reviewer subagent on <draft>`.
