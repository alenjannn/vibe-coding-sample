'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const cursorPos   = useRef({ x: 0, y: 0 })
  const targetPos   = useRef({ x: 0, y: 0 })
  const rafRef      = useRef<number>()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.12
      cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.12

      if (wrapperRef.current) {
        const x = cursorPos.current.x - 8
        const y = cursorPos.current.y - 8
        wrapperRef.current.style.transform = `translate(${x}px,${y}px)`

        const xyEl = wrapperRef.current.querySelector<HTMLSpanElement>('[data-xy]')
        if (xyEl) {
          const px = String(Math.round(cursorPos.current.x)).padStart(4, '0')
          const py = String(Math.round(cursorPos.current.y)).padStart(4, '0')
          xyEl.textContent = `X ${px}  Y ${py}`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const showDefault = () => setHidden(true)
    const hideDefault = () => setHidden(false)

    const bindInteractives = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', showDefault)
        el.addEventListener('mouseleave', hideDefault)
      })
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)
    bindInteractives()

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100,
        opacity: hidden ? 0 : 1,
        transition: 'opacity 120ms ease',
        willChange: 'transform',
      }}
    >
      {/* Crosshair color follows --color-accent-primary via currentColor */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
      </svg>

      <span
        data-xy
        style={{
          position: 'absolute',
          top: '12px',
          left: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--color-text-muted)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
        }}
      >
        X 0000  Y 0000
      </span>
    </div>
  )
}
