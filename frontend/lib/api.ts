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

interface TaskCreate {
  title: string
  description?: string
  due_date?: string
}

interface TaskUpdate {
  title?: string
  description?: string
  due_date?: string
  completed?: boolean
}

const API_BASE = 'http://localhost:8000'

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

export const api = {
  async getTasks(status: 'all' | 'pending' | 'completed' = 'all'): Promise<Task[]> {
    const res = await fetch(`${API_BASE}/api/tasks?status=${status}`, {
      cache: 'no-store',
      headers: getAuthHeaders()
    })
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return res.json()
  },

    async createTask(data: TaskCreate): Promise<Task> {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Failed to create task')
    }
    return res.json()
  },

  async updateTask(id: number, data: TaskUpdate): Promise<Task> {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Failed to update task')
    }
    return res.json()
  },

  async deleteTask(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Failed to delete task')
    }
  },

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Login failed')
    }
    const data = await res.json()
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access_token)
    }
    return data
  },

  async signup(email: string, password: string, name?: string): Promise<{ access_token: string }> {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Signup failed')
    }
    const data = await res.json()
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access_token)
    }
    return data
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }
}

