import { TAcademicDepartment } from './1.academic.department'
import { AcademicDepartment } from './2.academic.department.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}
// get all AcademicDepartments
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty')
  return result
}

// get single AcademicDepartments
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}
// update single AcademicDepartments
const updateSingleAcademicDepartmentFromDB = async (
  _id: string,
  payload: TAcademicDepartment
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id },
    { $set: payload },
    {
      new: true,
    }
  )
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
}
