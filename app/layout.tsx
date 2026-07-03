import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Red_Hat_Display, Rosarivo } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-red-hat',
})

const rosarivo = Rosarivo({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-rosarivo',
})

export const metadata: Metadata = {
  title: 'Cottrell — Design System',
  description:
    'An editorial design system inspired by ClassicCottrell.ca: warm cream canvas, forest-green accent, and classic serif typography.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f5f1' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1e1c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${redHat.variable} ${rosarivo.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
