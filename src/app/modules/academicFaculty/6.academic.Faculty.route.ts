import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './3.academic.validation'
import { AcademicFacultyControllers } from './5.academic.Faculty.controllers'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculties)
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculties
)

export const AcademicFacultyRoutes = router
