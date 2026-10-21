# Hacklanta I → II — Hudl PM interview presentation

A presenter-controlled deck that tells Hacklanta I and II as two releases of one
product. It opens in Hacklanta I's casino identity and turns into Hacklanta II's
festival identity at scene 8.

## Run it

```sh
pnpm install
pnpm build && pnpm preview          # http://localhost:4173  ← use this for the interview
# or: pnpm dev                       # http://localhost:5173 while editing
```

Everything is local: fonts are self-hosted, there are no analytics, APIs, or
network calls. The deck runs offline once it's built.

| URL | What |
|---|---|
| `/` | The deck (phones get the reading view automatically) |
| `/#/turn` | Deep link to any scene by id (see `src/content/story.ts`) |
| `/?view=presenter` | Speaker notes, timers, prev/next — open in a second window |
| `/?view=print` | Every scene + appendix, one 16:9 page each → **Print → Save as PDF** |
| `/?view=read` | Stacked reading view |
| `/?view=notes` | Speaker-notes document (printable) |
| `/?view=report` | Content completeness: every unresolved placeholder |

### Keys

`→` / `Space` / `PageDown` next (the first press finishes any running animation) ·
`←` previous · `S` skip motion · `O` overview / jump · `A` appendix · `M` motion
on/off · `F` fullscreen · `Home`/`End`. Keys are ignored while typing in inputs; the
trackpad and scroll wheel never navigate.

### Zoom setup

1. `pnpm build && pnpm preview`, then open `http://localhost:4173` in one browser
   window and `http://localhost:4173/?view=presenter` in another.
2. In Zoom, share **only the audience window** (not the whole screen).
3. Press `F` in the audience window. Clicking Next/Prev in the presenter window drives it.

### PDF backup

Open `/?view=print` in Chrome → Print → Destination *Save as PDF* → Margins *None*
→ enable *Background graphics*. The page size is already 1600×900.

## Edit the story

**All copy, notes, metrics and sources are in `src/content/story.ts`.** Claims use
four helpers:

- `v(text, source)`: verified fact
- `h()`: hypothesis held at the time
- `r()`: retrospective view
- `m()`: missing

`[ADD: …]` / `[CONFIRM: …]` placeholders render as dashed chips, so unfinished
copy can't pass as final. `/?view=report` lists every one.

Metrics: give a funnel step a `value` and set `status: "actual"` (plus `source`,
`cohort`) and its bar appears. Steps without data show an explicit empty state.
Sample numbers are never filled in.

See `CONTENT-TODO.md` for the prioritized list of facts still needed, and
`PROVENANCE.md` for where every reused asset came from.

## Checks

```sh
pnpm test                                   # navigation / turn logic / content invariants
pnpm build && pnpm preview &                # then:
SHOTS=/tmp/deck pnpm check:browser          # 25 browser checks + screenshots + PDF
SHOTS=/tmp/deck pnpm shots                  # screenshot every scene
```

## Structure

```
src/content/      story.ts (edit me), types.ts
src/deck/         Deck shell, keyboard, overview, presenter, static views, sync
src/scenes/       SceneView (one composition per layout), AppendixView
src/components/   casino.tsx (chips, cards, labels), festival.tsx (ribbons, pass, stickers), Funnel
src/styles/       base (tokens, shell), casino, festival, scenes, turn (I→II), static (print/read/notes)
```
