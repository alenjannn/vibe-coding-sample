'use client'

import { useTheme } from './ThemeProvider'

/* Film grain overlay — SVG feTurbulence noise sheet animated at 600ms steps.
   Opacity is higher in dark mode (white grain on black is harder to see at low alpha)
   and slightly lower in light mode (dark grain on parchment shows more easily). */
export default function GrainOverlay() {
  const { theme } = useTheme()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 200,
        opacity: theme === 'dark' ? 0.18 : 0.12,
        transition: 'opacity 300ms ease',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'grain 600ms steps(1) infinite' }}
      >
        <filter id="qe-grain">
          {/* baseFrequency 0.65 → medium grain size; numOctaves 3 → natural texture */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          {/* saturate 0 → neutral gray grain, no colour cast */}
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#qe-grain)" />
      </svg>
    </div>
  )
}
