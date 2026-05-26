'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const STATS = [
  {
    label:   'TOTAL SKUs',
    value:   2847,
    caption: 'and growing daily',
    format:  (v: number) => Math.round(v).toLocaleString(),
  },
  {
    label:   'BRANDS',
    value:   94,
    caption: 'curated partners',
    format:  (v: number) => String(Math.round(v)),
  },
  {
    label:   'DISPATCH',
    value:   24,
    caption: 'hour fulfilment guarantee',
    format:  (v: number) => `< ${Math.ceil(v)}h`,
  },
  {
    label:   'RETURN RATE',
    value:   0.02,
    caption: 'industry lowest',
    format:  (v: number) => `${v.toFixed(2)}%`,
  },
]

function easeSettle(t: number): number {
  if (t < 0.3) return (t / 0.3) * 0.6
  return 0.6 + ((t - 0.3) / 0.7) * 0.4
}

function StatCounter({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const [display, setDisplay] = useState(stat.format(0))

  useEffect(() => {
    if (!active) return
    const duration = 1200
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const eased = easeSettle(t)
      setDisplay(stat.format(stat.value * eased))
      if (t < 1) requestAnimationFrame(tick)
      else setDisplay(stat.format(stat.value))
    }

    requestAnimationFrame(tick)
  }, [active, stat])

  return <>{display}</>
}

export default function SpecsBar() {
  const containerRef = useRef<HTMLElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-10%' })

  return (
    <SectionReveal>
      <section
        ref={containerRef}
        style={{
          padding: '120px var(--margin-desktop)',
          borderTop: '1px solid var(--color-stroke-hairline)',
        }}
      >
        <div style={{ marginBottom: '72px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
            }}
          >
            § 03 — SPECIFICATIONS
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '0 20px',
                borderRight: i < STATS.length - 1 ? '1px solid var(--color-stroke-hairline)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-mono)',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                {stat.label}
              </span>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 5.5vw, 96px)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  color: 'var(--color-text-heading)',
                  letterSpacing: 'var(--tracking-tight)',
                  whiteSpace: 'nowrap',
                }}
              >
                <StatCounter stat={stat} active={inView} />
              </div>

              <div style={{ borderTop: '1px solid var(--color-stroke-hairline)', flexShrink: 0 }} />

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-mono)',
                  flexShrink: 0,
                }}
              >
                {stat.caption}
              </span>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
