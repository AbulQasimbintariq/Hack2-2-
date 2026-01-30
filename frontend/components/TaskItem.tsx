'use client'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
}

interface Props {
  task: Task
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(task.id, task.completed)}
            className={`px-4 py-1 rounded text-sm font-medium ${
              task.completed
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            disabled={task.completed}
          >
            {task.completed ? 'Done' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 mb-4">{task.description}</p>
      )}
      <p className="text-xs text-gray-400">
        Created: {new Date(task.created_at).toLocaleDateString()}
      </p>
    </li>
  )
}
