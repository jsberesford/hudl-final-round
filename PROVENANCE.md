# Source & asset provenance

Both sources are private to progsu / Hacklanta. Neither repository has a LICENSE
file; `hacklanta-ii`'s package.json says `"license": "ISC"` (npm default) with
`private: true`. Treat the brand assets as Hacklanta/progsu property, reused here by
an organizer for an interview. Don't publish this deck publicly without
checking with the team.

## Hacklanta I — casino

- **Repo:** `progsu-official/hacklanta-v0`, via the fork `jsberesford/hacklanta-v0`
- **Branch:** local `casino-snapshot` @ `48438c5` (2026-03-28, "final schedule"). This is the event-day site.
  `main` later merged `recap-and-fall-teaser` on top of it.

| Used here | Source path | Adaptation |
|---|---|---|
| Color tokens (`--cz-*`) | `apps/web/src/styles/global.css` `@theme` | Renamed with a `cz-` prefix |
| Fonts: Instrument Serif (italic display), JetBrains Mono, Manrope | `apps/web/src/layouts/BaseLayout.astro` (Google Fonts) | Self-hosted via `@fontsource` |
| Poker chip | `apps/web/src/components/landing/Hero.astro` `.poker-chip` / `.chip-*` | Ported to React `Chip`, `.cz-chip-*` |
| Playing cards (back pattern, aged front) | `Hero.astro` `.deco-card*` | `CardBack` / `CardFront`, adds a bottom-right corner index |
| `[01] // LABEL` section header | `apps/web/src/components/landing/TrackGrid.astro:70` | `Label` |
| Red radial glow, vignette, ghost suits, film grain | `Hero.astro`, `global.css` `body::after` | Full-bleed `CasinoBackdrop` |
| Italic serif wordmark | `Hero.astro` `.text-logo-hero` | Text, as in the source |
| Slot-machine info strip | `Hero.astro` `.slot-info` | Used for the opening facts row |
| `favicon.ico` | `apps/web/public/favicon.ico` | Copied as-is |
| `public/assets/casino/hacklanta-logo-white.png` | `apps/web/public/logo_trimmed.png` | Resized to 1000px. Not currently rendered; kept for edits |

Left out: Clerk, Supabase, Tally/Resend webhooks, Vercel Analytics, GSAP
ScrollTrigger hero, slot-machine countdown.

## Hacklanta II — festival

- **Repo:** `progsu-official/hacklanta-ii`
- **Ref:** `origin/main` @ `4643f46` (2026-10-10), checked out as a detached worktree at
  `../hacklanta-ii-live`. The existing `../hacklanta-ii` checkout (242 commits
  behind) was left untouched.
- **Uncertainty:** the live hacklanta.dev, captured 2026-10-21, shows elements
  that don't appear in `4643f46`: an MLH "2027 Season" banner, a "LOG IN" button,
  and a lowercase wordmark on the pass. Production is likely deployed from a
  later commit or another branch. The deck uses the verified source.

| Used here | Source path | Adaptation |
|---|---|---|
| Color tokens (`--fz-*`) | `src/app/globals.css` | Prefixed `fz-` |
| Fonts: Teko, Space Grotesk | `src/app/layout.tsx` (`next/font/google`) | Self-hosted via `@fontsource-variable` |
| Ribbon paths, 4-stroke stack, spectrum gradient, glow filter | `src/components/galaxy/galaxy.tsx` | Same geometry. Dropped the sprite caching, parallax, and tiling. Added a path-length draw-in for the turn |
| Pass: rainbow conic border, card gradient, slot, prong | `src/components/credential/credential.module.css` | Static CSS `Pass`. The r3f + Rapier lanyard is replaced by a CSS strap (no WebGL) |
| Pass face (logo, dashes, info tiles) | `src/components/credential/states/cover.tsx` | Tiles read Dates / City / Duration / **Version II**. Dropped the "1,000+ students" marketing claim |
| `hacklanta2_logo_white.png` | `public/brand/` | Resized to 1100px |
| Stickers: dj-set, speakers, saturn, yellow-flower, green-shrub, note-pink, note-orange, sparkle-{blue,yellow,white} | `public/brand/festival/` | Resized to ≤600px |

Left out: Supabase, Resend, referral/attribution tracking, Vercel Analytics, MLH
badge (external S3), Lenis smooth scroll, three / r3f / rapier.
