import { academicSemesterNameCodeMapper } from './1.1.academic.semester.constant'
import { TAcademicSemester } from './1.academic.interface'
import { AcademicSemester } from './2.academic.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check semester name --> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}
// get all AcademicSemesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find({})
  return result
}
// get single AcademicSemester by id
const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id })
  console.log(result)
  return result
}

// update single Academic Semester by id
const updateSingleAcademicSemesterFromDB = async (
  _id: string,
  payload: Partial<TAcademicSemester>
) => {
  // check semester name --> semester code
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Don't match with code and name")
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id },
    { ...payload },
    { new: true }
  )
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
}
