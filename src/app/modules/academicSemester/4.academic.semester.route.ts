import express from 'express'
import { AcademicSemesterControllers } from './5.academic.semester.controllers'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './3.academic.semester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
)
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester
)
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester
)
export const AcademicSemesterRoutes = router
