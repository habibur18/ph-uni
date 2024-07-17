import { OK } from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './6.academic.semester.services'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})

// get all semester info
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'All academic semesters are retrived successfully',
    data: result,
  })
})

// get single semester info by _id
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  console.log(semesterId)
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic semester is retrived successfully',
    data: result,
  })
})
// update single semester info by _id
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const academicSemesterData = req.body
  console.log(semesterId, academicSemesterData)
  const result =
    await AcademicSemesterServices.updateSingleAcademicSemesterFromDB(
      semesterId,
      academicSemesterData
    )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic semester is updated successfully',
    data: result,
  })
})
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
}
