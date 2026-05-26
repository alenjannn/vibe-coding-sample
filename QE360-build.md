# QE360 — Build Specification
> Next.js 14 · Framer Motion · Tailwind CSS · No video files

Read `QE360-design.md` first. Every decision in this file references that design system.
Do not deviate from the design tokens, color palette, typography, or motion rules defined there.

---

## TECH STACK

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14 (App Router) | Framework |
| Tailwind CSS | 3.x | Utility classes only |
| Framer Motion | Latest | All animations |
| Google Fonts | — | Playfair Display + IBM Plex Mono via `next/font/google` |
| TypeScript | — | All files `.tsx` |

**Rules:**
- All design tokens live in `app/globals.css` as CSS custom properties
- Tailwind is used for layout utilities only — never for colors, fonts, or spacing that override tokens
- Zero video files. Zero Lottie files. Zero GIFs. CSS + Framer Motion only.
- Never use: Inter, Roboto, Arial, Space Grotesk, or any system sans-serif as primary fonts

---

## FILE STRUCTURE

```
app/
  layout.tsx              ← fonts, metadata, global overlays
  page.tsx                ← assembles all sections in order
  globals.css             ← ALL design tokens + grain animation + scrollbar

components/
  ui/
    Cursor.tsx            ← phosphor crosshair + live XY coordinates
    GrainOverlay.tsx      ← animated film grain fixed overlay
    SectionReveal.tsx     ← reusable wrapper: hairline tick + content fade-up
    HairlineTick.tsx      ← the 1px phosphor line that draws on section entry

  sections/
    Navbar.tsx            ← floating nav, solidifies on scroll
    HeroSection.tsx       ← Hero Lathe caliper animation (most complex)
    InventoryStrip.tsx    ← 4 product cards with caliper hover
    SpecsBar.tsx          ← 4 animated stat counters
    FeaturedSpotlight.tsx ← asymmetric full-bleed layout + parallax
    CategoryGrid.tsx      ← staggered 3-col grid + mousemove parallax
    Testimonials.tsx      ← infinite CSS scroll ticker
    Footer.tsx            ← 4-col + newsletter hairline input
```

---

## COMPONENT SPECS

### `app/globals.css`
- Paste ALL tokens from `QE360-design.md` Section 9 verbatim
- Custom scrollbar:
  ```css
  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-track { background: #0A0A0C; }
  ::-webkit-scrollbar-thumb { background: #E8FF5C; }
  ```
- Grain animation:
  ```css
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    25%       { transform: translate(1px, 0); }
    50%       { transform: translate(1px, 1px); }
    75%       { transform: translate(0, 1px); }
  }
  ```
- Base: `cursor: none` on `body`. `background: var(--color-bg-primary)` on `html`.
- Phosphor pulse animation for live status dot:
  ```css
  @keyframes pulse-phosphor {
    0%, 100% { opacity: 0.15; }
    50%       { opacity: 0.45; }
  }
  ```
- Marquee animation for testimonials:
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  ```

---

### `app/layout.tsx`
```tsx
// Import from next/font/google:
// - Playfair_Display: weights [300, 400], style ['normal', 'italic']
// - IBM_Plex_Mono: weights [400, 500], style ['normal']
// Apply fonts as CSS variables: --font-display, --font-mono
// Render in body: <GrainOverlay /> and <Cursor /> as fixed overlays (z-index 200 and 100)
// Metadata: title "QE360 — Premium Electronics Atelier", description from design brief
```

---

### `components/ui/Cursor.tsx`
```
- `cursor: none` on body (set in globals.css)
- Track `mousemove` with useEffect + requestAnimationFrame
- Lerp interpolation: cursorX += (mouseX - cursorX) * 0.12 per frame (80ms lag feel)
- Render: 16px phosphor (#E8FF5C) SVG crosshair (+)
- Float mono text "X 1284  Y 0492" 12px lower-right of cursor, updates live
- On `<a>`, `<button>` hover: hide crosshair, restore default pointer temporarily
- Font: IBM Plex Mono, 9px, ash color (#6B6A66)
- Position: fixed, z-index: var(--z-cursor), pointer-events: none
```

---

### `components/ui/GrainOverlay.tsx`
```
- Fixed, full-viewport, pointer-events: none, z-index: var(--z-overlay)
- SVG with feTurbulence baseFrequency="0.65" numOctaves="3" + feColorMatrix
- Opacity: 0.08 (--grain-opacity)
- Apply `animation: grain 600ms steps(1) infinite`
- Background: none (transparent)
```

---

### `components/ui/SectionReveal.tsx`
```
Reusable wrapper component. Props: children, delay? (ms)

On viewport entry (Framer Motion whileInView, once: true):
1. First: draw 1px phosphor horizontal line across top edge of section
   - width: 0 → 100%, duration: 180ms, ease: var(--ease-instrument)
2. Then: children fade up
   - opacity: 0 → 1, y: 12 → 0, duration: 600ms, delay: 180ms + prop delay
   - ease: var(--ease-settle)
3. Stagger children: 60ms between siblings if multiple children
```

---

### `components/sections/Navbar.tsx`
```
Layout:
- Fixed top, full width
- Default: height 80px, background rgba(10,10,12,0.6), backdrop-filter: blur(20px) saturate(140%)
- On scroll > 100px: height → 64px, background → #0A0A0C, border-bottom: var(--hairline)
  Use Framer Motion useScroll + useMotionValueEvent

Left: "qe.360" — Playfair Display Italic, 24px, bone color
Center: nav links in IBM Plex Mono 12px uppercase. Active item prefixed with "· " in phosphor
Right: 
  - "SEARCH" in mono (no icon)
  - "[02]" cart count in mono
  - Phosphor dot (8px circle) + "open · 24h" in mono 11px
  - Dot uses animation: pulse-phosphor 2s ease-in-out infinite

Load animation: nav items stagger in 40ms apart, fade up 8px, after 200ms page load delay
```

---

### `components/sections/HeroSection.tsx`
> This is the most complex component. Build it with precision.

```
Layout: full viewport height, position relative, overflow hidden

Background layers (bottom to top):
1. Base: var(--color-bg-primary)
2. Vignette div: absolute, full size, background: var(--grad-vignette)
   CSS animation: translateX -40px → 40px → -40px, 24s ease-in-out infinite
3. GrainOverlay handles grain globally

Rotated section label (far left):
- "§ 01 / FRONTISPIECE" — IBM Plex Mono 11px, ash color
- transform: rotate(-90deg), position absolute, left: var(--margin-desktop)

Hero product (centered, 30% from top):
- Placeholder: rounded rect on felt background (#1C1D22), 280×280px
- Below product: var(--grad-plinth) as absolute div (the phosphor glow plinth)
- Product breathe animation: translateY 0 → -4px → 0, 8s ease-in-out infinite
- Plinth glow: opacity 0.6 → 1.0 → 0.6 counter-rhythm at 8s × 0.92

Caliper system (Framer Motion, runs once on load at 900ms):
- Two bracket elements: "[" and "]" 
- Start: translateX(-200px) and translateX(200px) respectively (off-canvas)
- Animate to: snapping around product silhouette (product width + 32px padding each side)
- Duration: 600ms, ease: var(--ease-instrument)
- Dimension callouts (4 strings, appear after caliper settles at 1200ms):
  - "Ø 71.40mm" — top-center of product
  - "m 248g"    — right-center
  - "Δ 0.02"    — bottom-center  
  - "ƒ 40kHz"   — left-center
  - Each counts from 0 to value using a counter animation (useEffect + setInterval settle curve)
  - Font: IBM Plex Mono 11px, phosphor color
- Caliper brackets rotate ±4deg in sync with product breathe (useMotionValue)

Headline (appears at 500ms via character reveal):
- "Instruments, not gadgets."
- Playfair Display Italic, var(--text-hero), bone color
- Period rendered as separate <span> in phosphor (#E8FF5C)
- Reveal: split into characters array, each character opacity 0 → 1 sequentially, 14ms per char
- Position: flush to column 2 (left: var(--margin-desktop)), bottom ~58% viewport

Sub-deck (appears after headline):
- Playfair body text, pewter, 20px, max-width 480px
- "A curated atelier of audio, optics, and precision tools — measured, photographed, and delivered."
- Framer Motion: opacity 0 → 1, y: 8 → 0, delay: 900ms

CTA row (appears at 1500ms):
- Primary: phosphor rectangular button "ENTER THE INVENTORY →"
  - Height 56px, padding 0 40px, background #E8FF5C, color #0A0A0C
  - Radius: 0px
  - Arrow → is a separate span, 24px right of text
  - On hover: arrow translateX +8px, thin line draws between text and arrow (width: 0 → 24px)
  - Box-shadow on hover: var(--glow-cta)
  - Load reveal: border draws left→right (scaleX: 0→1), then background fills (200ms)
- Secondary: ghost button "View the journal"
  - Border: var(--hairline), bone text, same height
  - Hover: border → var(--hairline-hover)

Pagination indicator:
- Bottom-right: "01 / 24" — IBM Plex Mono 11px, ash
```

---

### `components/sections/InventoryStrip.tsx`
```
Section marker: "§ 02 — INVENTORY" — IBM Plex Mono 11px uppercase, ash, flush-right, above hairline

Product row:
- 4 cards in a flex row, gap: 88px (--gutter-desktop)
- Anchored on a full-width 1px hairline (border-top: var(--hairline))
- Each card: 320px × 440px, background: #131418, radius: 2px
  - border: none except border-bottom: var(--hairline)
  - padding: 32px

Card internals:
- Top-left: mono SKU "SKU-0042" — IBM Plex Mono 11px, ash
- Center: product image placeholder (200×200px, felt background #1C1D22)
- Product name: Helvetica Neue 18px, bone, bottom section
- Price: Playfair Display 28px, bone, bottom-right corner

Card hover:
- Background: luminance lifts (filter: brightness(1.06))
- Phosphor underline draws left→right (width: 0 → 100%, 200ms)
- Caliper brackets appear around product image
- One dimension string ticks in mono (e.g. "Ø 71mm")
- Transition in: 120ms, out: 400ms

Scroll entry: whileInView, each card stagger 60ms, opacity 0→1, y: 12→0
```

---

### `components/sections/SpecsBar.tsx`
```
Section marker: "§ 03 — SPECIFICATIONS"
Layout: 4-column horizontal row. Between each stat: full-height 1px hairline.

Each stat structure (top to bottom):
1. Mono label (IBM Plex Mono 11px uppercase, ash) — e.g. "TOTAL SKUs"
2. Giant number (Playfair Display 300 weight, 160px, bone) — e.g. "2,847"
3. 1px hairline rule
4. Mono caption (IBM Plex Mono 14px, ash) — e.g. "and growing daily"

Stats:
- 2,847 · SKUs
- 94 · Brands
- < 24h · Dispatch time
- 0.02% · Return rate

On whileInView:
- Numbers count from 0 to target value
- Easing curve: fast start (60% of value in 30% of time), then slow settle
- Duration: 1.2s per counter
- Use useEffect + requestAnimationFrame for smooth counting
```

---

### `components/sections/FeaturedSpotlight.tsx`
```
Layout: CSS Grid, full viewport width
- Left (columns 1-7): product image bleeding off left viewport edge, overflow hidden
- Right (columns 9-12): all text content, padding-right: var(--margin-desktop)

Left side:
- Product image: large, felt background, fills the column
- Slow-rotating phosphor caliper brackets around product (12s loop, 360deg, linear infinite)
- Dimension callouts at cardinal points

Right side (top to bottom):
- Mono label: "§ 04 / SPOTLIGHT —" IBM Plex Mono 11px, ash
- Title: "The Studio Reference." — Playfair Display Italic 64px, bone
- Body paragraph: pewter, 16px, max-width 380px
- Price: Playfair Display weight 300, 88px, bone (NOT UI sans)
- CTA: phosphor rectangular button (same as hero)
- Spec ladder:
  - Three rows: "DRIVER" · "IMPEDANCE" · "WEIGHT"
  - Each: mono label left, mono value right, 1px hairline between rows
  - Font: IBM Plex Mono 11px

Image parallax:
- useScroll + useTransform from Framer Motion
- Product image translateY: scrollYProgress maps to ["-8%", "8%"]
- Text column stays static

SectionReveal wraps the entire component
```

---

### `components/sections/CategoryGrid.tsx`
```
Section marker: "§ 05 — CATEGORIES"
Layout: CSS Grid, 3 columns equal width, gap: 24px
- Middle column: transform translateY(64px) — the stagger offset
- 6 tiles total (2 per column)

Each tile:
- Aspect ratio: 1 / 1.2
- Background: #1C1D22
- overflow: hidden
- Content:
  - Top-left: mono "§ 05.1" — IBM Plex Mono 11px, ash
  - Center: placeholder product/category image
  - Bottom-left: category name — Helvetica Neue 24px, bone
  - Bottom-right: "→ 124 items" — IBM Plex Mono 11px, ash

Hover effect:
- Border-bottom of hovered tile: animates width from 100% → 200% (extends into adjacent tile space)
- Use Framer Motion layout or CSS width animation

Mouse parallax (per tile):
- Track mousemove on the grid container
- Each tile: translateX(mouseX * 0.02 * (index - 3)), translateY(mouseY * 0.02 * (index - 3))
- Creates a subtle depth/parallax feel without being obvious
- useRef on container, addEventListener mousemove
```

---

### `components/sections/Testimonials.tsx`
```
Section marker: "§ 06 — TESTIMONIES"
Layout: overflow: hidden, full width

Inner: flex row of cards, width: 200% (duplicated array for seamless loop)
Animation: 
  animation: marquee 35s linear infinite
  On hover (.testimonials-track:hover): animation-play-state: paused
  Pure CSS — no Framer Motion needed here

Each card (480px wide, gap 48px):
- Background: #1C1D22
- Padding: 40px
- Opening quote mark: Playfair Display 96px, phosphor, line-height 0.7
- Quote body: Playfair Display Italic 24px / 1.35, bone
- Hairline rule: var(--hairline), margin 24px 0
- Attribution: IBM Plex Mono 11px uppercase ash — "SARAH K. · CREATIVE DIRECTOR · MANILA"
- No avatars. No star ratings.

6 testimonial entries minimum (duplicate for seamless loop = 12 rendered)
```

---

### `components/sections/Footer.tsx`
```
Background: var(--color-bg-primary) — same as page (no color change)
Top: 96px margin, full-width hairline top border

Newsletter band (full-width, above columns):
- Left: "Quarterly dispatches from the atelier." — Playfair Display Italic 40px, bone
- Center: hairline-only input (no box, 1px bone underline)
  - Placeholder: "your@email.com" in mono ash
  - Submit: "subscribe →" in phosphor color, underlined, inline (no button shape)
- Right: mono "issue 14 — may 2026" — IBM Plex Mono 11px, ash, aligned bottom

Column grid (4 columns, 48px gap, margin-top 80px):
- Col 1: "qe.360" Playfair Italic + mission line in pewter 14px
- Col 2: "INSTRUMENTS" — mono header + 4 nav links
- Col 3: "ATELIER" — mono header + 4 links
- Col 4: "SUPPORT" — mono header + 4 links
- Link style: Helvetica Neue 14px, pewter, no underline. Hover: bone color, 400ms transition

Bottom strip (margin-top 64px, padding-top 24px, top hairline):
- Left: IBM Plex Mono 11px ash — "© 2026 QE360 Ltd. All rights reserved."
- Right: IBM Plex Mono 11px ash — phosphor pulse dot + "All systems · live"
  - Dot: 6px circle, background phosphor, animation: pulse-phosphor 2s infinite
```

---

## GLOBAL PATTERNS

### SectionReveal Usage
Wrap every section's content in `<SectionReveal>`:
```tsx
<SectionReveal>
  <InventoryStrip />
</SectionReveal>
```
This automatically applies the phosphor hairline tick + fade-up on every section entry.

### Framer Motion Variants (define at top of each file)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.06 } }
}
```

### Hover Transition Pattern (CSS)
```css
/* Apply to all interactive elements */
.interactive {
  transition: all var(--dur-hover-out) var(--ease-settle);
}
.interactive:hover {
  transition: all var(--dur-hover-in) var(--ease-instrument);
}
```

---

## STRICT DO-NOT LIST

- ❌ No rounded corners above 2px on cards or buttons
- ❌ No drop shadows on typography
- ❌ No gradient text
- ❌ No purple, teal, or cyan anywhere
- ❌ No bouncing, spring, or elastic animations
- ❌ No icons in the stats section — numbers are the graphic
- ❌ No lifestyle photography — placeholders on felt (#1C1D22) only
- ❌ No Inter, Roboto, Arial, Space Grotesk, or system fonts as primary
- ❌ No borders except 1px hairlines
- ❌ No `box-shadow` on cards in default state (`--shadow-card: none` is deliberate)
- ❌ No `<form>` HTML tags — use React event handlers only
- ❌ No video, Lottie, or GIF files

---

## OUTPUT ORDER

Build files in this exact order:

1. `app/globals.css`
2. `app/layout.tsx`
3. `components/ui/GrainOverlay.tsx`
4. `components/ui/Cursor.tsx`
5. `components/ui/SectionReveal.tsx`
6. `components/sections/Navbar.tsx`
7. `components/sections/HeroSection.tsx`
8. `components/sections/InventoryStrip.tsx`
9. `components/sections/SpecsBar.tsx`
10. `components/sections/FeaturedSpotlight.tsx`
11. `components/sections/CategoryGrid.tsx`
12. `components/sections/Testimonials.tsx`
13. `components/sections/Footer.tsx`
14. `app/page.tsx`
15. `package.json` (dependencies only)

Add comments in every animation block explaining what it does and what to change to customize.

---

## DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```
