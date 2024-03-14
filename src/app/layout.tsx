import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


export const metadata: Metadata = {
  title: 'Standard directive no 002',
  description: 'Be the general be the Soldier',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
