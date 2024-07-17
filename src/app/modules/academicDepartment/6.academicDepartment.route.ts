import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './3.academicDepartment.validation'
import { AcademicDepartmentControllers } from './5.academicDepartment.controllers'

const router = express.Router()

router.post(
  '/create-academic-Department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
)
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartments
)

export const AcademicDepartmentRoutes = router
