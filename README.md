# Hacklanta I to II: Hudl PM interview presentation

A presenter-controlled deck that tells Hacklanta I and II as two releases of one
product. It opens in Hacklanta I's casino identity and turns into Hacklanta II's
festival identity at slide 8, where the playing card flips into the festival pass.

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
| `/` | **The deck.** Arrow keys or Space |
| `/#/turn` | Deep link to any scene by id (see `src/content/story.ts`) |
| `/?view=presenter` | Speaker notes, timers, prev/next: open in a second window |
| `/?view=print` | Every scene + appendix, one 16:9 page each → **Print → Save as PDF** |
| `/?view=read` | Stacked reading view |
| `/?view=notes` | Speaker-notes document (printable) |
| `/?view=report` | Content completeness: every unresolved placeholder |

### Keys

`→` / `Space` / `PageDown` next (a press during the turn completes it) · `S` finish the turn · `←` previous · `Home` / `End` · `O` overview ·
`A` appendix · `Esc` back to the story · `M` motion on/off · `F` fullscreen. Keys are
ignored while typing, and the scroll wheel never navigates.

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

`[ADD: …]` / `[CONFIRM: …]` render as small tags, so unconfirmed copy can't pass as
final. `/?view=report` lists every one.

Metrics: give a step a `value` and set `status: "actual"` (plus `source`) and its bar
and rates appear. Everything else shows only its definition. Never enter an unverified number.

See `VERIFICATION.md` for every claim that needs your confirmation, `SPEAKER-NOTES.md`
for timing and notes, and
`PROVENANCE.md` for where every reused asset came from.

## Checks

```sh
pnpm test                                   # navigation / turn logic / content invariants
pnpm build && pnpm preview &                # then:
SHOTS=/tmp/deck pnpm check:browser          # fit at 4 sizes, navigation, print
SHOTS=/tmp/deck pnpm shots                  # screenshot every scene
```

## Structure

```
src/content/      story.ts (edit me), types.ts
src/deck/         Deck shell, keyboard, overview, presenter, static views, sync
src/scenes/       SceneView (one composition per layout), AppendixView
src/components/   casino.tsx (chips, cards, labels), festival.tsx (ribbons, pass, stickers), Funnel
src/styles/       base (tokens, backdrops, shell), casino, festival, scenes, turn (I to II), static (print/read/notes)
```
