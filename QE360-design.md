# QE360 — Design System
> Obsidian Atelier · Dark Editorial × Engineering Blueprint × Analog Instrumentation

---

## 1. DESIGN CONCEPT

QE360 is the showroom of a private engineering atelier — not a storefront. The first three seconds should feel like walking into the basement workshop of a horologist who happens to specialize in microprocessors: dim, hushed, smelling faintly of cut aluminum, a single object lit from above by an instrument lamp.

It is unlike every other tech ecommerce site because it refuses the genre's two clichés — the chrome/cyan "future" gradient and the white-Sans-Serif Apple homage. Instead, it borrows from physical instrumentation: blueprint calipers, vacuum-tube phosphor, brushed anthracite, oxidized copper. **Products are not "displayed" — they are measured.**

**Aesthetic Label:** Obsidian Atelier — dark editorial × engineering blueprint × analog instrumentation

**Mood Board References:**
1. The interior of a Leica M-series factory floor in Wetzlar — anthracite paint, brushed metal jigs, single overhead task lamps, parts arranged on green felt mats
2. A late-edition Wallpaper* magazine spread on industrial design — generous negative space, a serif headline crashing into a tight monospaced caption
3. The control panel of a 1970s analog synthesizer (Buchla / EMS Synthi) — sodium-vapor indicator lamps, hairline silkscreen labels, a deeply pragmatic beauty

**The ONE Unforgettable Moment:** The Hero Lathe — animated phosphor caliper brackets sweep in, snap to the hero product silhouette, and print live engineering dimensions in monospace that tick up like a digital scale settling.

---

## 2. COLOR SYSTEM
> Palette name: "Workshop, 11pm"

| Token | Hex | Role |
|---|---|---|
| `--color-bg-primary` | `#0A0A0C` | Anthracite — page background |
| `--color-bg-secondary` | `#131418` | Graphite — card surfaces |
| `--color-bg-tertiary` | `#1C1D22` | Felt — section bands, hover lifts |
| `--color-accent-primary` | `#E8FF5C` | Phosphor — instrument lamp accent |
| `--color-accent-secondary` | `#C2410C` | Ember — oxidized copper warmth |
| `--color-text-heading` | `#F4F1EA` | Bone — warm off-white, never #FFF |
| `--color-text-body` | `#B7B5B0` | Pewter — body copy |
| `--color-text-muted` | `#6B6A66` | Ash — labels, captions, mono callouts |
| `--color-text-inverse` | `#0A0A0C` | On phosphor buttons |
| `--color-stroke-hairline` | `rgba(244,241,234,0.08)` | Dominant divider |
| `--color-stroke-hover` | `rgba(244,241,234,0.40)` | Hover border lift |
| `--color-glow-phosphor` | `rgba(232,255,92,0.35)` | Box-shadow / drop-shadow |
| `--color-glow-ember` | `rgba(194,65,12,0.28)` | Ember glow |

**Gradients (three total — use sparingly):**
```css
--grad-vignette: radial-gradient(120% 80% at 50% 0%, rgba(232,255,92,0.06), transparent 45%);
--grad-plinth:   radial-gradient(60% 40% at 50% 100%, rgba(232,255,92,0.18), transparent 70%);
--grad-felt:     linear-gradient(180deg, #131418, #0F1013);
```

---

## 3. TYPOGRAPHY SYSTEM

| Voice | Font | Role |
|---|---|---|
| Display | `Playfair Display` (PP Editorial New) | Hero headlines, section openers — Italic Light |
| UI Sans | `Helvetica Neue` | Navigation, UI elements, headings |
| Body | `Helvetica Neue` | Running text |
| Mono | `IBM Plex Mono` | Labels, dimensions, prices, SKUs, captions |

**Size Scale (1440px baseline):**

| Token | Size / Line Height | Use |
|---|---|---|
| `--text-hero` | 144px / 0.92 | Editorial italic, one per page |
| `--text-display` | 96px / 1.00 | Section openers |
| `--text-h1` | 64px / 1.05 | Featured spotlight |
| `--text-h2` | 40px / 1.10 | Subsection titles |
| `--text-h3` | 24px / 1.25 | Card titles |
| `--text-body-lg` | 20px / 1.50 | Hero deck |
| `--text-body` | 16px / 1.625 | Running text |
| `--text-small` | 14px / 1.50 | Secondary |
| `--text-label` | 11px / 1.00 | Mono uppercase, tracking 0.14em |

**Special Treatments:**
- Mixed-case italic headlines — lowercase setting in italic serif feels personal
- Prices set in Playfair Display Ultralight 88px — inverts the usual hierarchy
- Hairline rules (1px phosphor, 24px long) under every mono uppercase section label
- No drop shadows on type. No gradient text. Ever.

---

## 4. LAYOUT & COMPOSITION

- **Grid:** 12 columns, 88px gutter, 1440px max-width, 96px outer margin
- **Section breaks:** Single 1px hairline full-width + mono section number `§ 02 — INVENTORY` bottom-left. Like chapter breaks in a hardcover book. No diagonal cuts.
- **Negative space:** Aggressively generous. Above-the-fold has 60%+ empty pixels.

**Asymmetry Rules:**
- Hero headline sits flush to column 2 — column 1 holds only the rotated mono label
- Featured spotlight: product image bleeds off left edge (columns 1–7), copy in columns 9–12
- Category grid: 3-column staggered, middle column offset 64px down

**Mobile (390px):**
- Outer margin: 24px, gutter: 16px
- Hero headline: clamp 144px → 56px
- Caliper animation still runs, narrower
- Category grid collapses to single column

---

## 5. COMPONENT DESIGN LANGUAGE

### Cards
- Background: `#131418` on `#0A0A0C` page
- Border: **none** — separated by fill alone
- Exception: product cards have 1px hairline `rgba(244,241,234,0.08)` on bottom edge only
- Radius: `2px` — effectively sharp
- Padding: 32px desktop, 24px mobile
- Hover: background lifts 4% luminance + phosphor underline draws left→right. No scale, no translateY.

### Primary CTA Button
- Fill: `#E8FF5C` (phosphor)
- Text: `#0A0A0C`, Helvetica Neue Medium, 14px, uppercase, tracking 0.08em
- Radius: `0px` — perfectly rectangular. Height: 56px. Padding: 0 40px
- Arrow `→` sits 24px right of text. On hover: arrow translates 8px right, thin tail draws between text and arrow
- Hover shadow: `0 0 0 1px #E8FF5C, 0 0 48px rgba(232,255,92,0.25)`
- Button itself never moves

### Secondary Button
- Transparent, 1px hairline border `rgba(244,241,234,0.16)`, bone text, 56px height
- Hover: border brightens to `rgba(244,241,234,0.4)`. No fill change.

### Navigation Bar
- Floats over hero. 80px tall. `rgba(10,10,12,0.6)` + `backdrop-filter: blur(20px) saturate(140%)`
- On scroll past hero: solidifies to `#0A0A0C`, height → 64px (300ms), bottom hairline appears
- Logo: `"qe.360"` in Playfair Display Italic 24px, bone
- Nav items: IBM Plex Mono uppercase 12px. Active: phosphor dot prefix `· `
- Right: mono `SEARCH`, cart `[02]`, phosphor pulse dot + `open · 24h`

### Search & Newsletter Inputs
- No field box. Just a 1px bone hairline on bottom only.
- Mono uppercase placeholder: `SEARCH INVENTORY →`
- Phosphor cursor pulses at 1.2s cadence
- Newsletter submit: `subscribe →` in phosphor underline, no button shape

### Image Treatment
- No drop shadows on products
- Products sit on `--grad-plinth` (radial phosphor glow beneath, anchors without containing)
- Backgrounds: felt `#1C1D22` matte studio sweep
- Hover: caliper brackets appear around product, dimensions tick in mono

---

## 6. MOTION & ANIMATION PHILOSOPHY
> Every motion answers to one of three verbs: **measure, settle, breathe**. No bouncing, no pop-ins.

### Page Load Sequence (≈1.8s total)
1. `0–200ms` — Page dark. Single phosphor dot fades in at logo position
2. `200–500ms` — Logo + nav fade up 8px (`cubic-bezier(0.2, 0.8, 0.2, 1)`). Nav items stagger 40ms
3. `500–900ms` — Hero headline reveals character-by-character at 14ms/char (opacity only, no transform)
4. `900–1500ms` — **Hero Lathe:** caliper brackets sweep in from off-canvas, snap to product. Dimensions tick up (digital-scale settle curve — fast→slow→settle)
5. `1500ms+` — CTA button outline draws left→right (200ms), then fills phosphor

### Scroll Behavior
- Each section: phosphor hairline draws across top edge (180ms) → content fades up 12px
- Featured spotlight image parallaxes at 0.92× scroll rate
- Mono section marker `§ 02` counts up from `00` on enter

### Hover Timing
- **In:** 120ms ease. **Out:** 400ms ease. (Snappy in, slow out — like a damped instrument needle)

### Background Animation
- `--grad-vignette` drifts ±40px horizontally on 24s sine loop
- Film grain overlay: 8% opacity, animated 1px translate on 600ms loop

### Product Breathe (infinite, post-load)
- `translateY: 0 → -4px → 0` on 8s ease-in-out loop
- Plinth glow expands/contracts counter-rhythm at 0.92× cycle
- Caliper brackets rotate ±4° in sync

### Signature Animation: Phosphor Hairline Tick
Every element entering the viewport: 1px phosphor line draws across its top edge in 180ms before element appears. This runs on every section, every card. The visual heartbeat of QE360.

---

## 7. SECTION BRIEFS

### § 01 — Hero
- Rotated mono label `§ 01 / FRONTISPIECE` far-left column
- Headline: `"Instruments, not gadgets."` — Playfair Italic 144px, bone. Period in phosphor.
- Sub-deck: pewter, max-width 480px, 20px
- CTA: `ENTER THE INVENTORY →` (phosphor) + `View the journal` (ghost)
- One hero product, centered, floating at 30% viewport height. Plinth glow. Caliper.
- Mono dimensions floating around product. Pagination `01 / 24` bottom-right.

### § 02 — Inventory Strip
- 4 product cards, 320×440px, 88px gaps, on a horizontal hairline
- Card: mono SKU top-left, felt-background product image, name in 18px, mono price bottom-right
- Hover: caliper brackets appear, dimensions tick in

### § 03 — Specifications Bar
- 4 stats: `2,847 SKUs` · `94 Brands` · `< 24h Dispatch` · `0.02% Return Rate`
- Giant Playfair Ultralight numerals at 160px. Mono label above, mono caption below.
- No icons. Numbers count up on scroll entry.

### § 04 — Featured Spotlight
- Product image bleeds off left edge (columns 1–7). Text in columns 9–12.
- Italic title: `"The Studio Reference."` — Playfair Italic 64px
- Price: Playfair 300 weight, 88px
- Spec ladder: `DRIVER · IMPEDANCE · WEIGHT` in mono with hairlines
- Rotating caliper brackets around product (12s loop)

### § 05 — Categories
- Staggered 3-column grid (middle column +64px down). 6 tiles.
- Each tile: mono `§ 05.1` top-left, category name 24px bottom-left, `→ 124 items` bottom-right
- Hover: bottom hairline extends into adjacent tile

### § 06 — Testimonies
- Infinite horizontal CSS ticker, 35s loop. Pause on hover.
- Cards: large phosphor quote mark (Playfair 96px), italic serif body, mono attribution
- No avatars. No stars.

### § 07 — Footer
- 96px top margin, top hairline
- Newsletter band: italic serif headline + hairline input + `subscribe →` phosphor
- 4-column grid. Bottom strip: legal mono left, `All systems · live` right with phosphor dot.

---

## 8. MICRO-DETAILS (10 Signature Details)

1. **Custom cursor** — 16px phosphor crosshair (+) with live mono XY coordinates trailing lower-right
2. **Film grain** — 8% opacity noise overlay, 1px translate animated at 600ms
3. **Phosphor hairline tick** — draws across every section top on viewport entry
4. **Custom scrollbar** — 2px, anthracite track, phosphor thumb with mono scroll-% indicator
5. **Live status dot** — pulses on 2s cadence at 30% opacity range in nav and footer
6. **Number roll-up** — stats and prices count from 0 on scroll entry, settle curve
7. **Caliper hover** — appears around any product on hover with ticking dimensions
8. **Vignette drift** — slow horizontal migration of radial phosphor highlight
9. **Section counter** — `§ 00` counts up as each section enters viewport
10. **CTA arrow extension** — thin tail draws from text to `→` on hover, button never moves

---

## 9. FULL DESIGN TOKEN REFERENCE

```css
/* COLORS */
--color-bg-primary:        #0A0A0C;
--color-bg-secondary:      #131418;
--color-bg-tertiary:       #1C1D22;
--color-accent-primary:    #E8FF5C;
--color-accent-secondary:  #C2410C;
--color-text-heading:      #F4F1EA;
--color-text-body:         #B7B5B0;
--color-text-muted:        #6B6A66;
--color-text-inverse:      #0A0A0C;
--color-stroke-hairline:   rgba(244,241,234,0.08);
--color-stroke-hover:      rgba(244,241,234,0.40);
--color-glow-phosphor:     rgba(232,255,92,0.35);
--color-glow-ember:        rgba(194,65,12,0.28);

/* GRADIENTS */
--grad-vignette: radial-gradient(120% 80% at 50% 0%, rgba(232,255,92,0.06), transparent 45%);
--grad-plinth:   radial-gradient(60% 40% at 50% 100%, rgba(232,255,92,0.18), transparent 70%);
--grad-felt:     linear-gradient(180deg, #131418, #0F1013);

/* TYPOGRAPHY */
--font-display: "Playfair Display", "Times New Roman", serif;
--font-ui:      "Helvetica Neue", sans-serif;
--font-body:    "Helvetica Neue", sans-serif;
--font-mono:    "IBM Plex Mono", ui-monospace, monospace;

/* SIZE SCALE */
--text-hero:     clamp(56px, 10vw, 144px);
--text-display:  clamp(48px, 6.6vw, 96px);
--text-h1:       clamp(36px, 4.4vw, 64px);
--text-h2:       clamp(28px, 2.8vw, 40px);
--text-h3:       24px;
--text-body-lg:  20px;
--text-body:     16px;
--text-small:    14px;
--text-label:    11px;

/* TRACKING */
--tracking-tight:  -0.02em;
--tracking-normal: 0;
--tracking-wide:   0.08em;
--tracking-mono:   0.14em;

/* SPACING (8px base) */
--space-xs:   4px;   --space-sm:  8px;   --space-md:  16px;
--space-lg:   24px;  --space-xl:  32px;  --space-2xl: 48px;
--space-3xl:  64px;  --space-4xl: 96px;  --space-5xl: 160px;
--space-6xl:  240px;
--gutter-desktop: 88px;
--gutter-mobile:  16px;
--margin-desktop: 96px;
--margin-mobile:  24px;
--max-width:      1440px;

/* RADII */
--radius-none:  0;
--radius-sharp: 2px;
--radius-pill:  999px;

/* EFFECTS */
--hairline:           1px solid var(--color-stroke-hairline);
--hairline-hover:     1px solid var(--color-stroke-hover);
--shadow-card:        none;
--shadow-card-hover:  0 0 0 1px var(--color-stroke-hover);
--glow-cta:           0 0 0 1px var(--color-accent-primary), 0 0 48px rgba(232,255,92,0.25);
--glow-product:       0 24px 64px -16px rgba(232,255,92,0.18);
--blur-glass:         blur(20px) saturate(140%);
--grain-opacity:      0.08;

/* MOTION */
--ease-instrument: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-settle:     cubic-bezier(0.16, 1, 0.3, 1);
--dur-hover-in:    120ms;
--dur-hover-out:   400ms;
--dur-section:     600ms;
--dur-load:        1800ms;

/* Z-INDEX */
--z-base:    0;
--z-product: 10;
--z-nav:     50;
--z-cursor:  100;
--z-overlay: 200;
```
