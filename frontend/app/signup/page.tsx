'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    startTransition(async () => {
      try {
        await api.signup(email, password, name || undefined)
        router.push('/tasks')
        router.refresh()
      } catch (err: any) {
        setError(err.message)
      }
    })
  }

  return (
    <div className= "container mx-auto p-8 max-w-md" >
    <h1 className="text-3xl font-bold mb-8" > Sign Up </h1>
      < form onSubmit = { handleSubmit } className = "space-y-4" >
        <div>
        <label className="block text-sm font-medium mb-2" > Name(optional) </label>
          < input
  type = "text"
  value = { name }
  onChange = {(e) => setName(e.target.value)
}
className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
disabled = { isPending }
  />
  </div>
  < div >
  <label className="block text-sm font-medium mb-2" > Email </label>
    < input
type = "email"
value = { email }
onChange = {(e) => setEmail(e.target.value)}
className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
required
disabled = { isPending }
  />
  </div>
  < div >
  <label className="block text-sm font-medium mb-2" > Password </label>
    < input
type = "password"
value = { password }
onChange = {(e) => setPassword(e.target.value)}
className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
minLength = { 8}
required
disabled = { isPending }
  />
  </div>
{ error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded" > { error } </div> }
<button
          type="submit"
disabled = { isPending }
className = "w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
  >
  { isPending? 'Signing up...': 'Sign Up' }
  </button>
  </form>
  < p className = "mt-4 text-center" >
    Have account ? <Link href="/login" className = "text-blue-500 hover:underline" > Login </Link>
      </p>
      </div>
  )
}
