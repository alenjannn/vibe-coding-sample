'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from '@/components/ui/ThemeProvider'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { label: 'Instruments', href: '#inventory' },
  { label: 'Inventory',   href: '#inventory' },
  { label: 'Atelier',     href: '#spotlight' },
  { label: 'Contact',     href: '#footer' },
]

function scrollTo(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const { theme } = useTheme()
  const [scrolled, setScrolled]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 100)
  })

  function openSearch() {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function closeSearch() {
    setSearchOpen(false)
    setQuery('')
  }

  const navHeight = scrolled ? 64 : 80

  /* Theme-aware nav background colors for framer-motion animate */
  const navBgSolid       = theme === 'dark' ? '#0A0A0C' : '#F4F1EA'
  const navBgTransparent = theme === 'dark' ? 'rgba(10,10,12,0.7)' : 'rgba(244,241,234,0.7)'

  return (
    <>
      <motion.nav
        animate={{
          height: navHeight,
          backgroundColor: scrolled ? navBgSolid : navBgTransparent,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--margin-desktop)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        initial={false}
      >
        {/* Bottom hairline — appears when nav solidifies */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '1px',
            background: 'var(--color-stroke-hairline)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--color-text-heading)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          qe.360
        </motion.div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); scrollTo(href) }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-mono)',
                color: i === 0 ? 'var(--color-accent-primary)' : 'var(--color-text-body)',
                textDecoration: 'none',
                cursor: 'none',
              }}
            >
              {i === 0 && <span style={{ color: 'var(--color-accent-primary)' }}>· </span>}
              {label}
            </motion.a>
          ))}
        </div>

        {/* Right cluster */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: 'var(--tracking-mono)',
            textTransform: 'uppercase',
            color: 'var(--color-text-body)',
          }}
        >
          {/* Theme toggle — ◐ LIGHT / ◑ DARK */}
          <ThemeToggle />

          {/* SEARCH toggle */}
          <button
            onClick={searchOpen ? closeSearch : openSearch}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
              color: searchOpen ? 'var(--color-accent-primary)' : 'var(--color-text-body)',
              cursor: 'none',
              padding: 0,
              transition: searchOpen
                ? 'color 120ms cubic-bezier(0.2,0.8,0.2,1)'
                : 'color 400ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            SEARCH
          </button>

          <span style={{ fontSize: '12px' }}>[02]</span>

          {/* Live status dot */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#E8FF5C',
                animation: 'pulse-phosphor 2s ease-in-out infinite',
              }}
            />
            open · 24h
          </span>
        </motion.div>
      </motion.nav>

      {/* Search panel — slides down from nav */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 72, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: navHeight,
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'var(--color-bg-primary)',
              borderBottom: '1px solid var(--color-stroke-hairline)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '0 var(--margin-desktop)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') closeSearch() }}
              placeholder="SEARCH INVENTORY →"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--color-stroke-mid)',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: 'var(--tracking-mono)',
                color: 'var(--color-text-heading)',
                padding: '10px 0',
                caretColor: 'var(--color-accent-primary)',
                cursor: 'text',
              }}
            />

            <button
              onClick={closeSearch}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: 'var(--tracking-mono)',
                color: 'var(--color-text-muted)',
                cursor: 'none',
                padding: 0,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ESC ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
