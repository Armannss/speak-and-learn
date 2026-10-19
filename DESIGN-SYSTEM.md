# Armanly design system

How the app looks and behaves, so new screens match the existing ones. Everything lives in `index.html`: tokens in the `:root` block at the top of `<style>`, components as CSS classes, and small JS helpers (`el`, `btn`, `icEl`, `notice`, `progressBar`, `openSheet`) that build them.

The look: white surfaces on a cool grey ground, 2px outlines, buttons with a small "ledge" underneath that disappears when pressed, one hue per topic, and a yellow highlighter on the expression being learned.

Two ideas come from the subject, a speaking class:

- **Speech bubbles.** The next lesson on Home is a bubble with a tail, and the conversation phrases in the Library are chat bubbles, because they are things you say.
- **The highlighter.** Target expressions are marked the way a student marks their notes: inside example sentences, and as slightly tilted marks on the lesson card.

Lessons and exercises take the whole screen (focus mode). The header and the tab bar hide, and the answer button and the feedback sit in a dock at the bottom, under the thumb.

## Tokens

### Colour

Every colour has a light and a dark value. Dark mode follows the system setting unless the learner picks Light or Dark in Settings (saved as `speakLearnTheme` and applied in `<head>` before the first paint).

| Token | Use |
| --- | --- |
| `--bg` | Page ground |
| `--surface`, `--surface-2` | Cards and sheets; tracks, dividers and inactive fills |
| `--ink`, `--ink-2`, `--ink-3` | Text: primary, secondary, hints and labels |
| `--line` | 2px outlines and ledges of neutral buttons |
| `--accent`, `--accent-edge`, `--accent-soft`, `--accent-ink` | Primary actions, active tab, focus of inputs |
| `--good` / `--good-edge` / `--good-soft` | Correct answers, done states |
| `--bad` / `--bad-edge` / `--bad-soft` | Wrong answers, warnings, things to revisit |
| `--sun`, `--sun-soft`, `--flame` | XP, badges, streak |
| `--mark`, `--mark-ink` | Highlighter on the target expression (`<mark>`) |
| `--hl`, `--hl-ink` | Highlighter on coloured fills, the same yellow in both themes |
| `--cat-1` … `--cat-6` | Topic palette. Never use directly: set `--cc` on a container (`catColor(i)` returns `var(--cat-n)`) |
| `--cc` | "This component's colour". Bands, chips, unit cards, flashcards, practice-mode icons read it |

Rule: no new hex values in components. Pick a token, or add one to `:root` and both dark blocks.

### Type

| Token | Font | Use |
| --- | --- | --- |
| `--f-display` | Bricolage Grotesque 600–800 | Wordmark, headings, numbers, flashcard terms. Its ink traps give the app its voice |
| `--f-body` | Plus Jakarta Sans 500–700 | Everything else |
| `--f-fa` | Vazirmatn | Persian text, always with class `fa` (sets `direction:rtl`) |

Sizes in use: 25px page titles (`.pg-head h2`, `.hello h2`), 19px section headings (`h3.sect`), 21–23px card titles, 15–16px body and answers, 13–13.5px secondary, 12–12.5px labels. Inputs are 16px so iOS doesn't zoom.

### Shape, space, motion

- Radius: `--r` (16px) for cards; 20–24px for big cards and sheets; 12–14px for buttons and inputs; 999px for chips and pills.
- Outline: 2px everywhere. Pressable things add a ledge (`border-bottom-width:4px` or `box-shadow:0 4px 0 <edge>`) that goes away on `:active`.
- Page gutter: 16px. Gaps: 6–10px inside groups, 14px between blocks, 22–34px between sections.
- Motion: `pop` for success, `shake` for wrong, `rise` for tab changes, `sheetUp` for sheets. All animation is turned off under `prefers-reduced-motion`.

## Components

| Component | Classes | Notes |
| --- | --- | --- |
| Button | `.cbtn` + `.known` (primary), `.light` (on accent), `.ghost`, `.sm`, `.block` | Primary = one per screen |
| Icon button | `.xbtn`, `.tool-btn`, `.spk` (speaker, `.small`, `.big-inline`) | Always has `aria-label` |
| Answer option | `.pr-opt` (`.right`, `.wrong`) | Lettered A–D by CSS counter |
| Card | `.card`, `.pr-card`, `.unit`, `.wotd` | 2px outline on `--surface` |
| Hero card | `.continue` | Speech bubble on the accent colour. Shows the paused exercise if there is one, else the next lesson |
| Header pills | `.pill` | Streak and today's goal. Both open the progress panel |
| Level row | `.lvl` | Level, name and XP bar on Home |
| Segmented control | `.seg`, built with `segmented(label, options, current, onPick)` | Settings choices |
| Answer dock | `.pr-dock` (`.good`, `.bad`, `.idle`) | Fixed to the bottom in focus mode. Turns green or red with the feedback |
| Notice | `.notice`, `.notice.warn` | Built with `notice(kind, icon, title, text, action, onAction)` |
| Progress | `.pbar`, `.ring`, `.res-ring` | Track `--surface-2`, fill `--accent` / `--good` |
| Chips and tabs | `.chip`, `.lib-seg`, `.bottombar` | Active chip is inverted (`--ink` background) |
| Sheet | `.modal` + `.sheet` | `openSheet(id, build)`. Bottom sheet on phones, centred dialog from 640px. Escape closes |
| Form field | `.field`, `.field-err` | Label above, optional fields say "(optional)" |
| Data row | `.data-row` | Label left, value right (`.ok`, `.warn`) |
| Toast | `toast(icon, title, sub)` | Two at a time, the rest queue |

## Saved state

Each learner's data stays in their own browser (`localStorage`); there is no server or account. Keys:

| Key | Holds |
| --- | --- |
| `speakLearnGame`, `speakLearnProgress`, `speakLearnKnown`, `speakLearnSRS`, `speakLearnCustom` | XP, badges, lessons, streak, known cards, spaced repetition, own words |
| `speakLearnProfile` | Name for the greeting, first-visit date, last backup, dismissed tips |
| `speakLearnUI` | Current tab, scroll position per tab, open grammar topic, flashcard filters, order and position |
| `speakLearnSession` | The unfinished lesson or exercise, saved after every step (dropped after 7 days). X pauses it (`paused: true`) instead of deleting it |
| `speakLearnAccent`, `speakLearnSound`, `speakLearnTheme` | Settings |

The backup file and the transfer link ("Send to my other device") include everything except `speakLearnUI` and `speakLearnSession`. The link carries the backup deflate-compressed and base64url-encoded after `#move=`, so it never reaches a server; opening it asks before replacing this device's data. If storage is blocked (private browsing) Home says so. When the app is not installed, Home suggests adding it to the home screen, because Safari clears data of websites not opened for 7 days.

## Audit (October 2026)

Second pass (UI/UX):

- The progress strip that sat on every screen is gone. Streak and today's goal are now small pills in the header, and the level is on Home.
- Sound, theme and accent moved from three header buttons into a Settings sheet.
- Lessons and exercises use focus mode with an answer dock at the bottom.
- X pauses an exercise instead of throwing it away. Home and Practice show it with Resume.
- Bricolage Grotesque for display type, speech-bubble lesson card, highlighter marks, and chat-bubble phrases.
- The footer only shows in the Library.

First pass:

- Topic colours moved from three places in JS (hex arrays and inline hex in practice modes) into the `--cat-*` tokens.
- Confetti used old brand colours, including a near-black that disappeared in dark mode. It now uses the palette.
- `.card.bump` was set by JS but had no style; tapping a word card now gives feedback.
- The theme is applied before the first paint (no light flash in dark mode).
- "Reset card progress" now needs a second tap, like removing a word.

Still open:

| Issue | Where | Suggestion |
| --- | --- | --- |
| `#fff` used for text on coloured fills (18 places) | Flashcard back, tiles, done nodes | Add `--on-color` token |
| `--cat-*` text on dark surfaces is low contrast (for example `--cat-1` on `--surface` is about 3.3:1) | `.band .count`, `.fc-cat`, `.unit-count` | Add dark-mode `--cat-*` values for text, keep the fills |
| 26 different font sizes | Whole file | Snap to a 12 / 13.5 / 15 / 17 / 21 / 25 scale |
| White text on `--cat-5` (amber) is about 2.8:1 | Practice mode icons, flashcard back | Darken `--cat-5` or use dark text on it |
