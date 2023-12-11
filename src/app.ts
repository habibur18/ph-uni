import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// body parsar
app.use(express.json())
// allow cors
app.use(cors())

// application routes
import { studentRoutes } from './app/modules/student/3.student.route'

app.use('/api/v1/students', studentRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
