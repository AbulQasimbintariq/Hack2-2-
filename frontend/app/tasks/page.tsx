'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../lib/api'
import TaskList from '../../components/TaskList'
import Link from 'next/link'

interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  due_date?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [status, setStatus] = useState<'all' | 'pending' | 'completed'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const loadTasks = async () => {
      try {
        const fetchedTasks = await api.getTasks(status)
        setTasks(fetchedTasks)
      } catch (err) {
        // Token invalid, logout
        api.logout()
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [status, router])

  if (loading) return <div className="container mx-auto p-8" > Loading tasks...</div>

  return (
    <div className= "container mx-auto p-8 max-w-4xl" >
    <div className="flex justify-between items-center mb-8" >
      <h1 className="text-3xl font-bold" > My Tasks </h1>
        < Link
  href = "/tasks/new"
  className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
    + New Task
      </Link>
      </div>

      < div className = "mb-6" >
        <label className="block text-sm font-medium mb-2" > Filter by status: </label>
          < button
  onClick = {() => setStatus('all')
}
className = {`mr-4 px-4 py-2 rounded ${status === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
  All
  </button>
  < button
onClick = {() => setStatus('pending')}
className = {`mr-4 px-4 py-2 rounded ${status === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
  Pending
  </button>
  < button
onClick = {() => setStatus('completed')}
className = {`px-4 py-2 rounded ${status === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
  Completed
  </button>
  </div>

  < TaskList initialTasks = { tasks } />
    </div>
  )
}

