import { Router, Request, Response } from 'express'
import { taskRepository } from '../repositories/TaskRepository'
import { CreateTaskDTO, TaskStatus, UpdateTaskDTO } from '../types'

const router = Router()

// GET /api/tasks?status=todo
router.get('/', (req: Request, res: Response) => {
    console.log('GET /tasks — query:', req.query)
    const { status } = req.query
    const tasks = status
        ? taskRepository.findByStatus(status as TaskStatus)
        : taskRepository.findAll()
    res.json({ data: tasks })
})

// GET /api/tasks/:id
router.get('/:id', (req: Request, res: Response) => {
    const task = taskRepository.findById(req.params.id as string)
    if (!task) {
        res.status(404).json({ error: 'Task not found' })
        return
    }
    res.json({ data: task })
})

// POST /api/tasks
router.post('/', (req: Request, res: Response) => {
    const body: CreateTaskDTO = req.body
    console.log('GET /tasks — query:', req.body)
    if (!body.title) {
        res.status(400).json({ error: 'title is required' })
        return
    }
    const task = taskRepository.create(body)
    res.status(201).json({ data: task })
})

// PATCH /api/tasks/:id
router.patch('/:id', (req: Request, res: Response) => {
    const updated = taskRepository.update(
        req.params.id as string,
        req.body as UpdateTaskDTO,
    )
    if (!updated) {
        res.status(404).json({ error: 'Task not found' })
        return
    }
    res.json({ data: updated })
})

// DELETE /api/tasks/:id
router.delete('/:id', (req: Request, res: Response) => {
    const deleted = taskRepository.delete(req.params.id as string)
    if (!deleted) {
        res.status(404).json({ error: 'Task not found' })
        return
    }
    res.status(204).send()
})

export default router
