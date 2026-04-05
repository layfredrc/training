import express, { Request, Response } from 'express'
import tasksRouter from './routes/tasks'
import cors from 'cors'

const app = express()

// Middlewares globaux
app.use(express.json()) // parse le body JSON des requêtes POST/PATCH
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
    }),
)
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' })
})
app.use('/api/tasks', tasksRouter)

app.listen(4000, () => console.log('API running on port 4000'))

// Maintenant GET /api/tasks → router.get('/')
// Et GET /api/tasks/42 → router.get('/:id')
