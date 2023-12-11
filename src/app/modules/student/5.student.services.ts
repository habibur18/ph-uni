import { StudentModel } from '../2.student.model'
import { Student } from './1.student.interface'

const CreateStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getAllStudentsFromDB = async () => {
  const result = StudentModel.find({})
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = StudentModel.findOne({ id })
  return result
}

export const studentServices = {
  CreateStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
