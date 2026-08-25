# Design System — hello-word-19

> Source of truth: the approved `index.html` (preview: unavailable in repo workspace).
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2025-02-14

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text` | `#000000` | Body text |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `21:1` | AA / AA Large |

### 1.2 Spacing

Base unit: `4px`. Every margin, padding, and gap in the product uses one of these.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |

### 1.3 Typography

Font families (include the fallback stack and how the font is loaded):

- Body: `Arial, Helvetica, sans-serif` (system stack, no external load)
- Headings: `Arial, Helvetica, sans-serif` (system stack, no external load)
- Mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-xs` | `12px` | `1.4` | `400` | Caption, helper text |
| `--text-sm` | `14px` | `1.4` | `400` | Secondary body |
| `--text-base` | `16px` | `1.5` | `400` | Body |
| `--text-lg` | `18px` | `1.5` | `400` | Lead paragraph |
| `--text-xl` | `20px` | `1.2` | `400` | h3 |
| `--text-2xl` | `32px` | `1` | `400` | h2 |
| `--text-3xl` | `80px` | `1` | `400` | h1 |

Heading levels are used in order and never skipped for visual sizing.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | `0` | Input, badge |
| `--radius-md` | `0` | Button, card |
| `--radius-lg` | `0` | Modal |
| `--radius-full` | `0` | Avatar, pill |
| `--border-width` | `0` | Default border |
| `--shadow-sm` | `none` | Resting card |
| `--shadow-md` | `none` | Dropdown, popover |
| `--shadow-lg` | `none` | Modal |
| `--duration-fast` | `0ms` | Hover, focus |
| `--duration-base` | `0ms` | Panel open/close |
| `--easing` | `linear` | All transitions |

Motion respects `prefers-reduced-motion: reduce`: state changes remain, movement is removed.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `sm` | `640px` | `100%` | `1` | `0` |
| `md` | `768px` | `100%` | `1` | `0` |
| `lg` | `1024px` | `100%` | `1` | `0` |
| `xl` | `1280px` | `100%` | `1` | `0` |

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | `0` |
| Dropdown | `0` |
| Modal backdrop | `0` |
| Modal | `0` |
| Toast | `0` |

## 2. Components

One subsection per reusable component. Every component lists **all** states.

### 2.1 Static center message

**Purpose** — one line: when to use it and when not to.

**Anatomy** — `[message]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| default | `--color-text`, `--text-3xl` | Plain centered landing message |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| default | `auto` | `0` | `--text-3xl` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | Centered black text on white background | `--color-text`, `--color-bg` |
| Hover | None | None |
| Focus (keyboard) | No interactive focus state; static content only | None |
| Active / pressed | None | None |
| Disabled | None | None |
| Loading | None | None |
| Error | None | None |
| Empty | None; screen never empties because message is content | None |

**Accessibility** — required role/ARIA, keyboard interaction, focus behavior, minimum hit target (44×44px).

- `main` landmark with `aria-label="Hello Word"`
- No keyboard interaction
- No focus behavior; static content only
- No hit target requirement; not interactive

## 3. Content and formatting

- Voice and tone in one line: plain, minimal, no decoration.
- Date, time, number, and currency formats, with locale: not used.
- Capitalization rule for buttons, headings, and labels: sentence case; only content text shown.
- Empty-state and error-message wording pattern: not used; no empty or error copy in approved design.

## 4. Known deviations

Places where the approved design does not follow its own rules or the
anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| All radius tokens | `0` radius everywhere | Approved design is intentionally flat and plain | None |
| All shadow tokens | `none` shadows everywhere | Approved design has no elevation | None |
| All motion tokens | `0ms` duration, `linear` easing | Approved design has no animation | None |
| Component states | Loading / error / empty are documented but not present in UI | Template requires full state table; screen is static | None |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-02-14 | Initial design system for one-screen hello-word-19 | pending |
