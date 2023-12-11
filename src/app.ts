import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
const port = 3000

// body parsar
app.use(express.json())
// allow cors
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  const x = 10
  res.send('Hello World!')
})

export default app
