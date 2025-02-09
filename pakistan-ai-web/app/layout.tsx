import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pakistan AI Chat',
  description: 'A culturally aware AI chat assistant for Pakistani relationships and values',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-guard`}>
        <main className="min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
} 