import express from 'express'
import { UserControllers } from './5.user.controller'

import { StudentValidations } from '../student/7.student.validator.zod'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
)

export const UserRoutes = router
