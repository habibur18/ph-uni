import { Student } from './2.student.model'
import { TStudent } from './1.student.interface'
import mongoose from 'mongoose'
import AppError from '../../errors/App.errors'
import { User } from '../User/2.user.model'
import { BAD_REQUEST } from 'http-status'

const getAllStudentsFromDB = async () => {
  const result = Student.find({})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = Student.findOne({ id })
  const result = Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  // check if student exists
  if (!(await Student.isUserExists(id))) {
    throw new AppError(BAD_REQUEST, 'Student not found')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedStudent) {
      throw new AppError(BAD_REQUEST, 'Failed to delete student')
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )

    if (!deleteUser) {
      throw new AppError(BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

const updateSingleStudentFromDB = async (id: string, studentData: TStudent) => {
  const result = await Student.updateOne({ id }, { $set: studentData })
  return result
}
export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
}
