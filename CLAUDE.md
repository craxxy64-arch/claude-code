# CLAUDE.md

Public repo for Claude Code: docs, changelog, bundled plugins, mods, and issue-automation scripts. The CLI source is not here.

## Layout

- `plugins/` — marketplace plugins (listed in `.claude-plugin/marketplace.json`). Each has `.claude-plugin/plugin.json` plus `commands/`, `agents/`, `skills/`, `hooks/` as needed. Adding a plugin: create folder, add it to `marketplace.json` and the table in `plugins/README.md`.
- `mods/` — built-in mods (`diff`, `sec-default`, `telemetry`), TypeScript function-hook plugins. Read `mods/README.md` before editing.
- `scripts/` — Bun/TS scripts run by `.github/workflows/` (issue triage, dedupe, lifecycle, sweep). Need `GITHUB_TOKEN`; `sweep.ts` and `lifecycle-comment.ts` take `--dry-run`.
- `.claude/commands/` — repo slash commands (`/commit-push-pr`, `/dedupe`, `/triage-issue`).
- `examples/` — sample settings, hooks, MDM, gateway configs.
- `CHANGELOG.md`, `feed.xml` — updated by automation; don't hand-edit.

## Mods

- Entry: `hooks/hooks.json` → `register.ts` exporting `register(on, options)`; hooks are `($, e, next)`.
- Types: `mods/types/claude-code.d.ts`; a mod adding a `$` noun owns it in `<mod>/types/index.d.ts` (no imports). Never copy another mod's types — import by path.
- Style: one concept per folder, `name/name.ts` + `name/index.ts` re-export.
- Tests: `<mod>/tests/<name>.test.ts`, one `describe` per file, shared bits in `tests/fixtures/` (one export per file). Use `claude-code/testing` (`mock.clock/env/store`).

## Checks

```sh
npm i -g @anthropic-ai/claude-code typescript@5.9.3
tsc -p mods/tsconfig.json                                   # typecheck all mods
CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 claude plugin test mods/diff   # per-mod tests
claude --plugin-dir mods/diff                               # run a mod from source
bun run scripts/sweep.ts --dry-run                          # scripts
```

CI (`mod-tests.yml`) runs the typecheck + tests on any `mods/**` change. Run both before pushing.

## Rules

- Keep changes minimal; match nearby style (TS strict, `noUncheckedIndexedAccess`).
- Never skip or disable tests to go green.
- Don't edit `CHANGELOG.md`/`feed.xml` by hand.
