import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextMove Digital Agency - Your Next Move Into Digital',
  description: 'Help local businesses transform online visibility into real customers and revenue. We design websites, build brands, create content, and manage social media.',
  keywords: 'digital agency, web design, brand building, content creation, social media management',
  authors: [{ name: 'NextMove Digital Agency' }],
  creator: 'NextMove Digital Agency',
  publisher: 'NextMove Digital Agency',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextmove.digital',
    title: 'NextMove Digital Agency - Your Next Move Into Digital',
    description: 'Help local businesses turn online visibility into real customers and revenue.',
    siteName: 'NextMove Digital Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextMove Digital Agency',
    description: 'Your Next Move Into Digital',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F12' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
