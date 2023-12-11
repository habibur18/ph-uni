import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/1.student.interface'

const userNameSchema = new Schema<UserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false }
)

const GuardianSchema = new Schema<Guardian>(
  {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    mothercontactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    _id: false,
  }
)

const LocalGuardianSchema = new Schema<LocalGuardian>(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    _id: false,
  }
)

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'blocked'],
})

// create model
export const StudentModel = model<Student>('Student', StudentSchema)
