'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'none',
        border: 'none',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: 'var(--tracking-mono)',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        cursor: 'none',
        padding: 0,
        transition: 'color 200ms cubic-bezier(0.16,1,0.3,1)',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-heading)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)'
      }}
    >
      {theme === 'dark' ? '◐ LIGHT' : '◑ DARK'}
    </button>
  )
}
