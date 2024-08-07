import { TAcademicSemester } from '../academicSemester/1.academic.interface'
import { User } from './2.user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString()
  const lastStudentId = await findLastStudentId()
  // 2030 02 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) // 02
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4) // 2030
  const currentSemesterCode = payload.code
  const currentYear = payload.year
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
