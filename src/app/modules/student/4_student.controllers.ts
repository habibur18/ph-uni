import { studentServices } from './5.student.services'
import sendResponse from '../../utils/sendResponse'
import { OK } from 'http-status'
import catchAsync from '../../utils/catchAsync'

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB()
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  })
})

// get single student by id
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentServices.getSingleStudentFromDB(studentId)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentServices.deleteStudentFromDB(studentId)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
  res.status(200).json({
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
})

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
