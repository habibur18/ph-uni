import { TAcademicFaculty } from './1.academicFaculty.interface'
import { AcademicFaculty } from './2.academic.Faculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}
// get all AcademicFaculties
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find({})
  return result
}

// get single AcademicFaculties
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}
// update single AcademicFaculties
const updateSingleAcademicFacultyFromDB = async (
  _id: string,
  payload: TAcademicFaculty
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    { _id },
    { $set: payload },
    { new: true }
  )
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
}
