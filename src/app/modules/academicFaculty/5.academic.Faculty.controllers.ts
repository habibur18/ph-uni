import { OK } from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './4.academic.faculty.services'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  })
})

// get all AcademicFaculties
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'All academic faculties are retrieved successfully',
    data: result,
  })
})
// get single AcademicFaculties
const getSingleAcademicFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const academicFaculty =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: academicFaculty,
  })
})

// update single AcademicFaculty
const updateSingleAcademicFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const academicFacultyData = req.body
  const result =
    await AcademicFacultyServices.updateSingleAcademicFacultyFromDB(
      facultyId,
      academicFacultyData
    )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  })
})
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculties,
  updateSingleAcademicFaculties,
}
