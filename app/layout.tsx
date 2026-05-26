import type { Metadata } from 'next'
import { Playfair_Display, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Cursor from '@/components/ui/Cursor'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'QE360 — Premium Electronics Atelier',
  description:
    'A curated atelier of audio, optics, and precision tools — measured, photographed, and delivered.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <GrainOverlay />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
