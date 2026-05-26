'use client'

import { useState } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'

const COLUMNS = [
  {
    header: 'INSTRUMENTS',
    links: ['Audio Reference', 'Optical Systems', 'Measurement', 'Synthesis'],
  },
  {
    header: 'ATELIER',
    links: ['Journal', 'Calibration Lab', 'Atelier Story', 'Commissions'],
  },
  {
    header: 'SUPPORT',
    links: ['Warranty Register', 'Returns Policy', 'Dispatch Status', 'Contact'],
  },
]

function FooterLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 400,
        color: hovered ? 'var(--color-text-heading)' : 'var(--color-text-body)',
        textDecoration: 'none',
        display: 'block',
        lineHeight: 1.8,
        transition: `color ${hovered ? '120ms' : '400ms'} cubic-bezier(0.16,1,0.3,1)`,
        cursor: 'none',
      }}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  const [email, setEmail]           = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError]           = useState('')

  function handleSubscribe() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubscribed(true)
  }

  return (
    <SectionReveal>
      <footer
        style={{
          background: 'var(--color-bg-primary)',
          marginTop: '96px',
          borderTop: '1px solid var(--color-stroke-hairline)',
          padding: '80px var(--margin-desktop) 0',
        }}
      >
        {/* Newsletter band */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'end',
            gap: '48px',
            paddingBottom: '64px',
            borderBottom: '1px solid var(--color-stroke-hairline)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(28px, 2.8vw, 40px)',
              lineHeight: 1.1,
              color: 'var(--color-text-heading)',
              margin: 0,
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Quarterly dispatches from the atelier.
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {subscribed ? (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--color-accent-primary)',
                  letterSpacing: 'var(--tracking-mono)',
                  margin: '0',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-stroke-mid)',
                }}
              >
                Dispatched. First issue arrives soon.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubscribe() }}
                  placeholder="your@email.com"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: error ? '1px solid #C2410C' : '1px solid var(--color-text-heading)',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--color-text-heading)',
                    padding: '12px 0',
                    width: '100%',
                    caretColor: 'var(--color-accent-primary)',
                    transition: 'border-color 200ms ease',
                  }}
                />
                {error && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#C2410C',
                      letterSpacing: 'var(--tracking-mono)',
                      paddingTop: '6px',
                    }}
                  >
                    {error}
                  </span>
                )}
                <button
                  onClick={handleSubscribe}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--color-accent-primary)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    padding: '12px 0 0',
                    textAlign: 'left',
                    letterSpacing: 'var(--tracking-mono)',
                  }}
                >
                  subscribe →
                </button>
              </>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                letterSpacing: 'var(--tracking-mono)',
                textTransform: 'uppercase',
              }}
            >
              issue 14 — may 2026
            </span>
          </div>
        </div>

        {/* 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '48px',
            marginTop: '80px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '24px',
                fontWeight: 400,
                color: 'var(--color-text-heading)',
                marginBottom: '16px',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              qe.360
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--color-text-body)',
                margin: 0,
                maxWidth: '260px',
              }}
            >
              An independent atelier for precision electronics. Every instrument measured.
              Every shipment tracked.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.header}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-mono)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '20px',
                }}
              >
                {col.header}
              </span>
              {col.links.map((link) => (
                <FooterLink key={link} label={link} />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '64px',
            paddingTop: '24px',
            paddingBottom: '40px',
            borderTop: '1px solid var(--color-stroke-hairline)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
            }}
          >
            © 2026 QE360 Ltd. All rights reserved.
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#E8FF5C',
                animation: 'pulse-phosphor 2s ease-in-out infinite',
              }}
            />
            All systems · live
          </span>
        </div>
      </footer>
    </SectionReveal>
  )
}
