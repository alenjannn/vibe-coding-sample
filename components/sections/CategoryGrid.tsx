'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const CATEGORIES = [
  { id: '05.1', name: 'Audio',       count: 124, img: '/images/hero-product.png' },
  { id: '05.2', name: 'Optics',      count: 87,  img: '/images/product-02.png'  },
  { id: '05.3', name: 'Measurement', count: 312, img: '/images/product-03.png'  },
  { id: '05.4', name: 'Synthesis',   count: 56,  img: null },
  { id: '05.5', name: 'Recording',   count: 198, img: null },
  { id: '05.6', name: 'Signal',      count: 143, img: null },
]

function CategoryTile({
  category,
  index,
  mouseX,
  mouseY,
}: {
  category: (typeof CATEGORIES)[0]
  index: number
  mouseX: number
  mouseY: number
}) {
  const [hovered, setHovered] = useState(false)

  const tx = mouseX * 0.02 * (index - 2.5)
  const ty = mouseY * 0.02 * (index - 2.5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ x: tx, y: ty }}
      style={{
        aspectRatio: '1 / 1.2',
        background: 'var(--color-bg-tertiary)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        cursor: 'none',
      }}
    >
      {/* Section ID label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-mono)',
          textTransform: 'uppercase',
        }}
      >
        § {category.id}
      </span>

      {/* Category image */}
      <div
        style={{
          flex: 1,
          margin: '16px -20px',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--color-bg-secondary)',
        }}
      >
        {category.img && (
          <Image
            src={category.img}
            alt={category.name}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.55,
              transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}
      </div>

      {/* Bottom row — name + count */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--color-text-heading)',
            lineHeight: 1.2,
          }}
        >
          {category.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--tracking-mono)',
          }}
        >
          → {category.count} items
        </span>
      </div>

      {/* Hover hairline extends past tile edge */}
      <motion.div
        animate={{ width: hovered ? '200%' : '100%' }}
        transition={{
          duration: hovered ? 0.2 : 0.4,
          ease: hovered ? [0.2, 0.8, 0.2, 1] : [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          background: 'var(--color-stroke-hover)',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}

export default function CategoryGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouseX((e.clientX - rect.left - rect.width / 2) / rect.width)
    setMouseY((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const onMouseLeave = () => {
    setMouseX(0)
    setMouseY(0)
  }

  return (
    <SectionReveal>
      <section
        style={{
          padding: '120px var(--margin-desktop)',
          borderTop: '1px solid var(--color-stroke-hairline)',
        }}
      >
        <div style={{ marginBottom: '64px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
            }}
          >
            § 05 — CATEGORIES
          </span>
        </div>

        <div
          ref={gridRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[0, 3].map((i) => (
              <CategoryTile
                key={CATEGORIES[i].id}
                category={CATEGORIES[i]}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>

          {/* Column 2 — offset 64px down */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '64px' }}>
            {[1, 4].map((i) => (
              <CategoryTile
                key={CATEGORIES[i].id}
                category={CATEGORIES[i]}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[2, 5].map((i) => (
              <CategoryTile
                key={CATEGORIES[i].id}
                category={CATEGORIES[i]}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
