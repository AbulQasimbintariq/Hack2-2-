'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../../lib/api'
import Link from 'next/link'

export default function NewTaskPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (title.length < 1 || title.length > 200) {
      setError('Title must be 1-200 characters')
      return
    }
    if (description.length > 1000) {
      setError('Description must be <=1000 characters')
      return
    }

    startTransition(async () => {
      try {
        await api.createTask({ title, description: description || undefined })
        router.push('/tasks')
        router.refresh()
      } catch (err: any) {
        setError(err.message)
      }
    })
  }

  return (
    <div className= "container mx-auto p-8 max-w-md" >
    <Link href="/tasks" className = "text-blue-500 hover:underline mb-4 inline-block" >
        ← Back to tasks
    </Link>
    < h1 className = "text-3xl font-bold mb-8" > New Task </h1>
      < form onSubmit = { handleSubmit } className = "space-y-4" >
        <div>
        <label className="block text-sm font-medium mb-2" > Title * </label>
          < input
  type = "text"
  value = { title }
  onChange = {(e) => setTitle(e.target.value)
}
className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
maxLength = { 200}
required
disabled = { isPending }
  />
  <p className="text-xs text-gray-500 mt-1" > { title.length } / 200 </p>
    </div>
    < div >
    <label className="block text-sm font-medium mb-2" > Description </label>
      < textarea
value = { description }
onChange = {(e) => setDescription(e.target.value)}
className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
rows = { 4}
maxLength = { 1000}
disabled = { isPending }
  />
  <p className="text-xs text-gray-500 mt-1" > { description.length } / 1000 </p>
    </div>
{ error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded" > { error } </div> }
<button
          type="submit"
disabled = { isPending }
className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
  >
  { isPending? 'Creating...': 'Create Task' }
  </button>
  </form>
  </div>
  )
}
