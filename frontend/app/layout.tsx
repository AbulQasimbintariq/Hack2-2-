import type { Metadata } from 'next'
import Nav from '../components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task App',
  description: 'Task CRUD App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang= "en" >
    <body className="font-sans" >
      <Nav/>
  { children }
  </body>
    </html>
  )
}

