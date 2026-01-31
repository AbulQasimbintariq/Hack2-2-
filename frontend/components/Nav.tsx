'use client'

import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    api.logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className= "bg-blue-600 text-white" >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between" >
      <Link href="/" className = "flex items-center gap-3" >
        {/* Clean task/checklist SVG icon */ }
    <svg
  className = "h-8 w-8 text-white"
  viewBox = "0 0 24 24"
  fill = "none"
  xmlns = "http://www.w3.org/2000/svg"
  aria-hidden="true"
    >
    <rect
    x="3"
  y = "3"
  width = "18"
  height = "18"
  rx = "3"
  stroke = "currentColor"
  strokeWidth = "1.5"
  fill = "rgba(255,255,255,0.06)"
    />
    <path
    d="M8 12.5l2.5 2.5L16 9"
  stroke = "currentColor"
  strokeWidth = "1.5"
  strokeLinecap = "round"
  strokeLinejoin = "round"
    />
    </svg>

              <span className="text-xl font-bold" > Task App </span>
                </Link>

  {/* Mobile menu button */ }
  <div className="md:hidden" >
    <button
            aria-expanded={ open }
  aria-label="Toggle menu"
  onClick = {() => setOpen(!open)
}
className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
  >
  {
    open?(
              // X icon
              <svg className = "h-6 w-6" viewBox = "0 0 24 24" fill = "none" xmlns = "http://www.w3.org/2000/svg" aria-hidden="true" >
  <path d="M6 18L18 6M6 6l12 12" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
    </svg>
   ) : (
  <>
  {/* Menu icon */ }
  < svg
  className = "h-6 w-6"
  viewBox = "0 0 24 24"
  fill = "none"
  xmlns = "http://www.w3.org/2000/svg"
  aria-hidden="true"
  >
  <path
        d="M4 6h16M4 12h16M4 18h16"
  stroke = "currentColor"
  strokeWidth = "2"
  strokeLinecap = "round"
  strokeLinejoin = "round"
  />
  </svg>
  </>
)}
</button>
  </div>

{/* Desktop nav */ }
<div className="hidden md:flex items-center space-x-4" >
  <Link href="/tasks" className = "hover:underline" > Tasks </Link>
    < Link href = "/login" className = "hover:underline" > Login </Link>
      < Link href = "/signup" className = "hover:underline" > Signup </Link>
        < button onClick = { handleLogout } className = "hover:underline" > Logout </button>
          </div>
          </div>

{/* Mobile menu (collapsible) */ }
<div className={ `${open ? 'block' : 'hidden'} md:hidden bg-blue-500 border-t border-blue-400` }>
  <div className="px-4 py-4 space-y-2" >
    <Link href="/tasks" className = "block w-full py-2 rounded hover:bg-blue-600" > Tasks </Link>
      < Link href = "/login" className = "block w-full py-2 rounded hover:bg-blue-600" > Login </Link>
        < Link href = "/signup" className = "block w-full py-2 rounded hover:bg-blue-600" > Signup </Link>
          < button onClick = {() => { handleLogout(); setOpen(false); }} className = "w-full text-left py-2 rounded hover:bg-blue-600" > Logout </button>
            </div>
            </div>
            </nav>
  )
}
