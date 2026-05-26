'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const PRODUCTS = [
  { sku: 'SKU-0042', name: 'Studio Reference',    price: '€1,290', dim: 'W 285mm',  img: '/images/hero-product.png' },
  { sku: 'SKU-0118', name: 'Field Chronograph',   price: '€890',   dim: 'Ø 44mm',   img: '/images/product-02.png'   },
  { sku: 'SKU-0271', name: 'Tactile Input Board', price: '€340',   dim: 'L 360mm',  img: '/images/product-03.png'   },
  { sku: 'SKU-0394', name: 'Studio Microphone',   price: '€1,650', dim: 'Ø 51mm',   img: null },
  { sku: 'SKU-0512', name: 'Optical Scope 12×',   price: '€2,100', dim: 'L 340mm',  img: null },
  { sku: 'SKU-0601', name: 'Signal Analyser',     price: '€760',   dim: 'W 220mm',  img: null },
  { sku: 'SKU-0748', name: 'Lathe Caliper Set',   price: '€480',   dim: 'Δ 0.01mm', img: null },
  { sku: 'SKU-0833', name: 'Modular Sequencer',   price: '€1,140', dim: 'H 128mm',  img: null },
]

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        width: '320px',
        minWidth: '320px',
        height: '440px',
        background: 'var(--color-bg-secondary)',
        borderRadius: '2px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderBottom: '1px solid var(--color-stroke-hairline)',
        filter: hovered ? 'brightness(1.06)' : 'brightness(1)',
        transition: hovered
          ? 'filter 120ms cubic-bezier(0.2,0.8,0.2,1)'
          : 'filter 400ms cubic-bezier(0.16,1,0.3,1)',
        userSelect: 'none',
        cursor: 'none',
      }}
    >
      {/* SKU label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-mono)',
          textTransform: 'uppercase',
        }}
      >
        {product.sku}
      </span>

      {/* Product image area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Left caliper */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -16, opacity: 0 }}
              transition={{ duration: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                position: 'absolute',
                left: '-8px', top: '0', bottom: '0', width: '12px',
                borderLeft: '1px solid var(--color-accent-primary)',
                borderTop: '1px solid var(--color-accent-primary)',
                borderBottom: '1px solid var(--color-accent-primary)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Right caliper */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16, opacity: 0 }}
              transition={{ duration: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                position: 'absolute',
                right: '-8px', top: '0', bottom: '0', width: '12px',
                borderRight: '1px solid var(--color-accent-primary)',
                borderTop: '1px solid var(--color-accent-primary)',
                borderBottom: '1px solid var(--color-accent-primary)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Dimension callout */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-accent-primary)',
                letterSpacing: 'var(--tracking-mono)',
                whiteSpace: 'nowrap',
              }}
            >
              {product.dim}
            </motion.span>
          )}
        </AnimatePresence>

        {product.img ? (
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <Image
              src={product.img}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : (
          <div style={{ width: '200px', height: '200px', background: 'var(--color-bg-tertiary)', borderRadius: '2px' }} />
        )}
      </div>

      {/* Product name */}
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--color-text-heading)',
          marginBottom: '8px',
        }}
      >
        {product.name}
      </span>

      {/* Price */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 400,
          color: 'var(--color-text-heading)',
          textAlign: 'right',
        }}
      >
        {product.price}
      </span>

      {/* Accent underline on hover */}
      <motion.div
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{
          duration: hovered ? 0.2 : 0.4,
          ease: hovered ? [0.2, 0.8, 0.2, 1] : [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          height: '1px',
          background: 'var(--color-accent-primary)',
        }}
      />
    </motion.div>
  )
}

export default function InventoryStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  const isDragging   = useRef(false)
  const dragStartX   = useRef(0)
  const scrollOrigin = useRef(0)

  function onMouseDown(e: React.MouseEvent) {
    if (!trackRef.current) return
    isDragging.current   = true
    dragStartX.current   = e.pageX
    scrollOrigin.current = trackRef.current.scrollLeft
    document.body.style.userSelect = 'none'
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return
    const delta = (e.pageX - dragStartX.current) * 1.5
    trackRef.current.scrollLeft = scrollOrigin.current - delta
  }

  function stopDrag() {
    isDragging.current = false
    document.body.style.userSelect = ''
  }

  return (
    <SectionReveal>
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '48px',
            paddingLeft: 'var(--margin-desktop)',
            paddingRight: 'var(--margin-desktop)',
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
            § 02 — INVENTORY
          </span>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--color-stroke-hairline)',
            marginLeft: 'var(--margin-desktop)',
            marginRight: 'var(--margin-desktop)',
          }}
        />

        <div style={{ position: 'relative' }}>
          {/* Right-edge fade — uses page bg color so it blends seamlessly */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0,
              width: '120px',
              background: 'linear-gradient(to right, transparent, var(--color-bg-primary))',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          <div
            ref={trackRef}
            className="no-scrollbar"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            style={{
              display: 'flex',
              gap: 'var(--gutter-desktop)',
              overflowX: 'auto',
              paddingLeft: 'var(--margin-desktop)',
              paddingRight: 'calc(var(--margin-desktop) + 80px)',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              cursor: 'none',
            }}
          >
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.sku} product={product} index={i} />
            ))}
          </div>
        </div>

      </section>
    </SectionReveal>
  )
}
