import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
const app: Application = express()

// body parsar
app.use(express.json())
// allow cors
app.use(cors())

// application routes
// import { studentRoutes } from './app/modules/student/3.student.route'
// import { UserRoutes } from './app/modules/User/4.user.route'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

// not found route
app.use(notFound)
export default app
