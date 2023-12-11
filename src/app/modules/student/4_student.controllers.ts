import { Request, Response } from 'express'
import { studentServices } from './5.student.services'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    console.log(studentData)
    const result = await studentServices.CreateStudentIntoDB(studentData)
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'unable to create student',
      error,
    })
  }
}
// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

// get single student by id
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
