import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/2.academic.model'
import { TStudent } from '../student/1.student.interface'
import { Student } from '../student/2.student.model'
import { TUser } from './1.user.inferface'

import { User } from './2.user.model'
import { generateStudentId } from './7user.utils'
import AppError from '../../errors/App.errors'
import { BAD_REQUEST } from 'http-status'

const CreateStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.DEFAULT_PASSWORD as string)

  //set student role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  if (!admissionSemester) {
    throw new AppError(BAD_REQUEST, 'Invalid admission semester')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a student
    if (!newUser.length) {
      throw new AppError(BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}
export const UserServices = {
  CreateStudentIntoDB,
}
