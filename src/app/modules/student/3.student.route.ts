import express from 'express'
import { studentControllers } from './4_student.controllers'
const router = express.Router()

// router.post('/create-student', studentControllers.createStudent)
router.get('/', studentControllers.getAllStudents)
router.get('/:studentId', studentControllers.getSingleStudent)
router.delete('/:studentId', studentControllers.deleteStudent)

export const studentRoutes = router
