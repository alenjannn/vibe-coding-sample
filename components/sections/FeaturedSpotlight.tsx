'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const SPEC_LADDER = [
  { label: 'DRIVER',    value: '40mm Dynamic' },
  { label: 'IMPEDANCE', value: '300 Ω' },
  { label: 'WEIGHT',    value: '260g' },
]

export default function FeaturedSpotlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const [arrowHovered, setArrowHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <SectionReveal>
      <section
        ref={sectionRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '58.33% 1fr',
          minHeight: '90vh',
          borderTop: '1px solid var(--color-stroke-hairline)',
          overflow: 'hidden',
        }}
      >
        {/* Left: product image */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-bg-tertiary)',
          }}
        >
          <motion.div style={{ y: imageY, height: '110%', position: 'relative' }}>
            <Image
              src="/images/hero-product.png"
              alt="Auraltech Studio Reference Headphones"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Rotating caliper overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div style={{ position: 'relative', width: '340px', height: '340px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    inset: '-32px',
                    border: '1px solid rgba(232,255,92,0.25)',
                    borderRadius: '2px',
                  }}
                />
                {[
                  { text: 'W 285mm', top: '-24px',   left: '50%',   transform: 'translateX(-50%)' },
                  { text: '300 Ω',   top: '50%',     right: '-64px',transform: 'translateY(-50%)' },
                  { text: '260g',    bottom: '-24px', left: '50%',   transform: 'translateX(-50%)' },
                  { text: 'ƒ 40kHz', top: '50%',     left: '-72px', transform: 'translateY(-50%)' },
                ].map((d) => (
                  <span
                    key={d.text}
                    style={{
                      position: 'absolute',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#E8FF5C',
                      letterSpacing: 'var(--tracking-mono)',
                      whiteSpace: 'nowrap',
                      ...d,
                    }}
                  >
                    {d.text}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px var(--margin-desktop) 80px 64px',
            background: 'var(--color-bg-primary)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            § 04 / SPOTLIGHT —
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'var(--text-h1)',
              lineHeight: 1.05,
              color: 'var(--color-text-heading)',
              margin: '0 0 24px',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            The Studio Reference.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.625,
              color: 'var(--color-text-body)',
              maxWidth: '380px',
              margin: '0 0 32px',
            }}
          >
            Open-back planar magnetic transducer with oxygen-free copper voice coil.
            Referenced by mastering engineers in 14 countries. No EQ required.
          </p>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '88px',
              fontWeight: 400,
              lineHeight: 0.9,
              color: 'var(--color-text-heading)',
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: '32px',
            }}
          >
            €2,890
          </div>

          <button
            onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              height: '56px',
              padding: '0 40px',
              background: '#E8FF5C',
              color: '#0A0A0C',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wide)',
              border: 'none',
              borderRadius: '0',
              cursor: 'none',
              gap: '8px',
              boxShadow: arrowHovered
                ? '0 0 0 1px #E8FF5C, 0 0 48px rgba(232,255,92,0.25)'
                : 'none',
              transition: arrowHovered
                ? 'box-shadow 120ms cubic-bezier(0.2,0.8,0.2,1)'
                : 'box-shadow 400ms cubic-bezier(0.16,1,0.3,1)',
              marginBottom: '48px',
            }}
          >
            ADD TO ATELIER
            <motion.span
              animate={{ x: arrowHovered ? 8 : 0 }}
              transition={{ duration: arrowHovered ? 0.12 : 0.4 }}
            >
              →
            </motion.span>
          </button>

          {/* Spec ladder */}
          <div style={{ borderTop: '1px solid var(--color-stroke-hairline)' }}>
            {SPEC_LADDER.map((spec) => (
              <div
                key={spec.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-stroke-hairline)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    letterSpacing: 'var(--tracking-mono)',
                    textTransform: 'uppercase',
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-text-body)',
                    letterSpacing: 'var(--tracking-mono)',
                  }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
