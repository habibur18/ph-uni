import { UserServices } from './6.user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  // console.log(studentData)
  // validation with zod
  //   const zodParsedData = studentValidationSchema.parse(studentData)

  const result = await UserServices.CreateStudentIntoDB(password, studentData)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student is created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
