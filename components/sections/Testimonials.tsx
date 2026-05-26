'use client'

import SectionReveal from '@/components/ui/SectionReveal'

const TESTIMONIALS = [
  {
    quote: 'The calibration report that ships with every unit is more thorough than anything I\'ve seen from OEM distributors. QE360 is the only atelier I trust for reference equipment.',
    attribution: 'SARAH K. · CREATIVE DIRECTOR · MANILA',
  },
  {
    quote: 'I\'ve been sourcing vintage Leica glass through QE360 for three years. Every piece arrives as described — measured, cleaned, and ready to shoot. No surprises.',
    attribution: 'MARCUS T. · DOCUMENTARY PHOTOGRAPHER · OSLO',
  },
  {
    quote: 'For studio reference monitors there is no substitute for a properly calibrated system. QE360\'s measurement documentation changed how I commission equipment.',
    attribution: 'AMARA D. · MASTERING ENGINEER · LONDON',
  },
  {
    quote: 'The return rate speaks for itself. When a product is described with caliper-verified dimensions and scope captures, you know exactly what you\'re receiving.',
    attribution: 'HIDEAKI M. · ACOUSTICS RESEARCHER · TOKYO',
  },
  {
    quote: 'My modular synthesis rig is built entirely from QE360-sourced modules. The condition grading system is honest in a way that the secondhand market rarely manages.',
    attribution: 'LENA V. · ELECTRONIC COMPOSER · BERLIN',
  },
  {
    quote: 'Dispatch under 24 hours is not a marketing claim here — it is a precision target. Three orders, three on-time deliveries. I buy nothing else.',
    attribution: 'DANIEL O. · BROADCAST ENGINEER · LAGOS',
  },
]

export default function Testimonials() {
  const allCards = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <SectionReveal>
      <section
        style={{
          padding: '120px 0',
          borderTop: '1px solid var(--color-stroke-hairline)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0 var(--margin-desktop)', marginBottom: '64px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
            }}
          >
            § 06 — TESTIMONIES
          </span>
        </div>

        <div
          className="testimonials-track"
          style={{
            display: 'flex',
            gap: '48px',
            width: 'max-content',
            animation: 'marquee 35s linear infinite',
          }}
        >
          {allCards.map((t, i) => (
            <div
              key={i}
              style={{
                width: '480px',
                minWidth: '480px',
                background: 'var(--color-bg-tertiary)',
                padding: '40px',
                borderRadius: '2px',
                flexShrink: 0,
              }}
            >
              {/* Opening quote mark */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '96px',
                  fontWeight: 700,
                  lineHeight: 0.7,
                  color: 'var(--color-accent-primary)',
                  marginBottom: '16px',
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: 1.35,
                  color: 'var(--color-text-heading)',
                  margin: 0,
                }}
              >
                {t.quote}
              </p>

              <div
                style={{
                  borderTop: '1px solid var(--color-stroke-hairline)',
                  margin: '24px 0',
                }}
              />

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-mono)',
                  textTransform: 'uppercase',
                }}
              >
                {t.attribution}
              </span>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
