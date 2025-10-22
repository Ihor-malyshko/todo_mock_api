import { http, HttpResponse } from 'msw'

const data = [
  { id: 1, title: 'Sample Task 1', status: 'todo' },
  { id: 2, title: 'Sample Task 2', status: 'doing' },
  { id: 3, title: 'Sample Task 3', status: 'done' },
  // { id: 4, title: 'Sample Task 4', status: 'todo' },
  // { id: 5, title: 'Sample Task 5', status: 'doing' },
  // { id: 6, title: 'Sample Task 6', status: 'done' }
]

export const handlers = [
  // Mock GET /api/tasks - use relative URL to match your API calls
  http.get('/api/tasks', () => {
    // console.log('MSW: Intercepted GET /api/tasks')
    return HttpResponse.json(data)
  }),

  // Mock POST /api/tasks
  http.post('/api/tasks', async ({ request }) => {
    // console.log('MSW: Intercepted POST /api/tasks')
    const newTask = await request.json()
    data.push({ id: Date.now(), ...newTask })
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    return HttpResponse.json(
      { id: Date.now(), ...newTask },
      { status: 201 }
    )
  }),

  // Mock PUT /api/tasks/:id
  http.put('/api/tasks/:id', async ({ params, request }) => {
    // console.log('MSW: Intercepted PUT /api/tasks/:id', params)
    const { id } = params
    const updatedTask = await request.json()
    const index = data.findIndex(task => task.id === Number(id))
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedTask }
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    return HttpResponse.json({ id: Number(id), ...updatedTask })
  }),

  // Mock DELETE /api/tasks/:id
  http.delete('/api/tasks/:id', async ({ params }) => {
    // console.log('MSW: Intercepted DELETE /api/tasks/:id', params)
    const { id } = params
    const index = data.findIndex(task => task.id === Number(id))
    if (index !== -1) {
      data.splice(index, 1)
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    return HttpResponse.json({ message: `Task ${id} deleted` })
  })
]