'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const DIMENSIONS = [
  { label: 'Ø 280mm',  value: 280,   unit: 'mm',  prefix: 'Ø ', decimals: 0, position: 'top' },
  { label: 'm 248g',   value: 248,   unit: 'g',   prefix: 'm ', decimals: 0, position: 'right' },
  { label: 'Δ 0.02',  value: 0.02,  unit: '',    prefix: 'Δ ', decimals: 2, position: 'bottom' },
  { label: 'ƒ 40kHz', value: 40,    unit: 'kHz', prefix: 'ƒ ', decimals: 0, position: 'left' },
]

function easeSettle(t: number): number {
  if (t < 0.3) return (t / 0.3) * 0.6
  return 0.6 + ((t - 0.3) / 0.7) * 0.4
}

function DimensionCallout({ dim, active }: { dim: typeof DIMENSIONS[0]; active: boolean }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    const duration = 1200
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const eased = easeSettle(t)
      const val = dim.value * eased
      setDisplay(val.toFixed(dim.decimals))
      if (t < 1) requestAnimationFrame(tick)
      else setDisplay(dim.value.toFixed(dim.decimals))
    }

    requestAnimationFrame(tick)
  }, [active, dim])

  const positionStyle: React.CSSProperties = {
    top:    dim.position === 'top'    ? '-28px' : dim.position === 'bottom' ? 'auto' : '50%',
    bottom: dim.position === 'bottom' ? '-28px' : 'auto',
    left:   dim.position === 'left'   ? '-80px' : dim.position === 'right'  ? 'auto' : '50%',
    right:  dim.position === 'right'  ? '-80px' : 'auto',
    transform:
      dim.position === 'top' || dim.position === 'bottom'
        ? 'translateX(-50%)'
        : 'translateY(-50%)',
    whiteSpace: 'nowrap',
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--color-accent-primary)',
        letterSpacing: 'var(--tracking-mono)',
        zIndex: 11,
        ...positionStyle,
      }}
    >
      {dim.prefix}{display}{dim.unit}
    </motion.span>
  )
}

export default function HeroSection() {
  const [caliperActive, setCaliperActive] = useState(false)
  const [dimsActive, setDimsActive]       = useState(false)
  const [ctaActive, setCtaActive]         = useState(false)
  const [arrowHovered, setArrowHovered]   = useState(false)
  const [isMobile, setIsMobile]           = useState(false)
  const [videoError, setVideoError]       = useState(false)

  const breatheProgress = useMotionValue(0)
  const plinthProgress  = useMotionValue(0)
  const productY        = useTransform(breatheProgress, [0, 0.5, 1], [0, -4, 0])
  const caliperLeftRot  = useTransform(breatheProgress, [0, 0.5, 1], [0, -4, 0])
  const caliperRightRot = useTransform(breatheProgress, [0, 0.5, 1], [0, 4, 0])
  const plinthOpacity   = useTransform(plinthProgress, [0, 0.5, 1], [0.5, 0.9, 0.5])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const breatheControls = animate(breatheProgress, [0, 1], {
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    })

    const plinthControls = animate(plinthProgress, [0, 1], {
      duration: 8 * 0.92,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    })

    const t1 = setTimeout(() => setCaliperActive(true),  900)
    const t2 = setTimeout(() => setDimsActive(true),    1200)
    const t3 = setTimeout(() => setCtaActive(true),     1500)

    return () => {
      breatheControls.stop()
      plinthControls.stop()
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
    }
  }, [breatheProgress, plinthProgress])

  const videoSize = isMobile ? '280px' : '480px'

  const headline = 'Instruments, not gadgets.'
  const chars = headline.split('')

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* Background vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--grad-vignette)',
          animation: 'vignette-drift 24s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Rotated section label */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(var(--margin-desktop) / 2 - 60px)',
          top: '50%',
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-mono)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        § 01 / FRONTISPIECE
      </div>

      {/* Hero product + caliper system — anchored right so it never collides with the left headline */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: 'calc(var(--margin-desktop) + 40px)',
        }}
      >
        {/* Plinth glow — rendered before video so it paints beneath it */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: 'calc(50% - 160px)',
            width: '320px',
            height: '120px',
            background: 'var(--grad-plinth)',
            filter: 'blur(40px)',
            opacity: plinthOpacity,
            pointerEvents: 'none',
          }}
        />

        <motion.div style={{ y: productY }}>
          {/* Left caliper bracket — 24px outside video edge */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={caliperActive ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'absolute',
              left: '-48px',
              top: '-20px',
              bottom: '-20px',
              width: '24px',
              borderLeft: '1px solid var(--color-accent-primary)',
              borderTop: '1px solid var(--color-accent-primary)',
              borderBottom: '1px solid var(--color-accent-primary)',
              rotate: caliperLeftRot,
              zIndex: 11,
            }}
          />

          {/* Right caliper bracket — 24px outside video edge */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={caliperActive ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'absolute',
              right: '-48px',
              top: '-20px',
              bottom: '-20px',
              width: '24px',
              borderRight: '1px solid var(--color-accent-primary)',
              borderTop: '1px solid var(--color-accent-primary)',
              borderBottom: '1px solid var(--color-accent-primary)',
              rotate: caliperRightRot,
              zIndex: 11,
            }}
          />

          <div style={{ position: 'relative' }}>
            {DIMENSIONS.map((dim) => (
              <DimensionCallout key={dim.position} dim={dim} active={dimsActive} />
            ))}

            <div style={{ position: 'relative', width: videoSize, height: videoSize, zIndex: 10 }}>
              {!videoError ? (
                <video
                  src="/videos/headphones-animation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/images/hero-product.png"
                  onError={() => setVideoError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'screen',
                  }}
                />
              ) : (
                <Image
                  src="/images/hero-product.png"
                  alt="Auraltech Studio Reference Headphones"
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Headline — kept left-aligned, maxWidth capped so it stays clear of the right image */}
      <div
        style={{
          position: 'absolute',
          left: 'var(--margin-desktop)',
          bottom: '20%',
          maxWidth: '600px',
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'var(--text-hero)',
            lineHeight: 0.92,
            color: 'var(--color-text-heading)',
            margin: 0,
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.014, duration: 0.1 }}
              style={{
                display: 'inline',
                color: char === '.' ? 'var(--color-accent-primary)' : 'inherit',
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            lineHeight: 1.5,
            color: 'var(--color-text-body)',
            maxWidth: '480px',
            marginTop: '24px',
            marginBottom: 0,
          }}
        >
          A curated atelier of audio, optics, and precision tools — measured,
          photographed, and delivered.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ctaActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {/* Primary CTA */}
          <button
            onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
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
            }}
          >
            ENTER THE INVENTORY
            <span style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <motion.span
                animate={{ width: arrowHovered ? '24px' : '0px' }}
                transition={{ duration: arrowHovered ? 0.12 : 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                style={{
                  display: 'inline-block',
                  height: '1px',
                  background: '#0A0A0C',
                  overflow: 'hidden',
                  verticalAlign: 'middle',
                }}
              />
              <motion.span
                animate={{ x: arrowHovered ? 8 : 0 }}
                transition={{ duration: arrowHovered ? 0.12 : 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ marginLeft: '8px' }}
              >
                →
              </motion.span>
            </span>
          </button>

          {/* Secondary ghost button */}
          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              height: '56px',
              padding: '0 32px',
              background: 'transparent',
              color: 'var(--color-text-heading)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wide)',
              border: '1px solid var(--color-stroke-mid)',
              borderRadius: '0',
              cursor: 'none',
              transition: 'border-color 400ms cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-stroke-hover)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-stroke-mid)'
            }}
          >
            View the journal
          </button>
        </motion.div>
      </div>

      {/* Pagination */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: 'var(--margin-desktop)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-mono)',
        }}
      >
        01 / 24
      </div>
    </section>
  )
}
