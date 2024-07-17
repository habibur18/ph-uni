import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './1.academic.department'
import AppError from '../../errors/App.errors'

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true }
)

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isDepartmentExist) {
    throw new AppError(403, 'Department already exist')
  }
  next()
})

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)
  if (!isDepartmentExist) {
    throw new AppError(404, 'Department does not exist')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema
)
