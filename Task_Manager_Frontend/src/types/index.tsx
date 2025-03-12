export type Column = {
  id: string
  title: string
}

export type Task = {
  id: string
  title: string
  description: string
  status: string
  createdAt?: string
  completedAt?: string
  userId?: number
}

export type TaskCardRequest = {
  title: string
  description: string
  status: string
  userId: number
}

export type User = {
  token: {
    token: string
    user?: {
      id: number
      name: string
      email: string
    }
  }
}