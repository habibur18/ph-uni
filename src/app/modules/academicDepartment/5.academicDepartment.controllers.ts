import { OK } from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './4.academicServices'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  })
})

// get all Academic
const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB()
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'All academic departments are retrieved successfully',
    data: result,
  })
})
// get single Academic
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const academicDepartment =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId
    )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: academicDepartment,
  })
})

// update single AcademicDepartment
const updateSingleAcademicDepartments = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const academicDepartmentData = req.body
  const result =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDB(
      departmentId,
      academicDepartmentData
    )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  })
})
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartments,
}
