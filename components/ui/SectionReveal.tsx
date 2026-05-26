'use client'

import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
}

export default function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Accent hairline draws left→right on scroll entry */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--color-accent-primary)',
          transformOrigin: 'left',
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{
          duration: 0.6,
          delay: 0.18 + delay / 1000,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
