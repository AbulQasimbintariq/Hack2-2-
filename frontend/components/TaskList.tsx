'use client'

import { useState, useTransition } from 'react'
import { api } from '@/lib/api'
import TaskItem from './TaskItem'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
}

interface Props {
  initialTasks: Task[]
}

export default function TaskList({ initialTasks }: Props) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isPending, startTransition] = useTransition()

  const refreshTasks = async () => {
    const newTasks = await api.getTasks()
    setTasks(newTasks)
  }

  const handleToggle = async (id: number, completed: boolean) => {
    startTransition(async () => {
      await api.updateTask(id, { completed: !completed })
      await refreshTasks()
    })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task?')) return
    startTransition(async () => {
      await api.deleteTask(id)
      await refreshTasks()
    })
  }

  if (isPending) return <div>Updating...</div>

  if (tasks.length === 0) {
    return <div className="text-gray-500 text-lg" > No tasks found.Create one to get started! </div>
  }

  return (
    <ul className= "space-y-4" >
    {
      tasks.map((task) => (
        <TaskItem
          key= { task.id }
          task = { task }
          onToggle = { handleToggle }
          onDelete = { handleDelete }
        />
      ))
    }
    </ul>
  )
}
