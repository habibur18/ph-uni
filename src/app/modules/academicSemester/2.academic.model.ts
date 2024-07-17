import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './1.academic.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './1.1.academic.semester.constant'

const academicSemesterSchema = new Schema(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true }
)
academicSemesterSchema.pre('save', async function () {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExists) {
    throw new Error('semester is already exists')
  }
})
export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
)
