import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './1.student.interface'

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [3, 'First name must be at least 3 characters long'],
      maxlength: [15, 'First name must be at most 15 characters long'],
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
          if (firstNameStr !== value) {
            throw new Error('First name must start with a capital letter')
          }
        },
      },
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [15, 'Middle name must be at most 15 characters long'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
  },
  { _id: false }
)

const GuardianSchema = new Schema<TGuardian>(
  {
    fatherName: { type: String, required: [true, "Father's name is required"] },
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    fatherContactNo: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    mothercontactNo: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
    address: { type: String, required: [true, 'Address is required'] },
  },
  {
    _id: false,
  }
)

const LocalGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: [true, "Local guardian's name is required"],
    },
    occupation: {
      type: String,
      required: [true, "Local guardian's occupation is required"],
    },
    contactNo: {
      type: String,
      required: [true, "Local guardian's contact number is required"],
    },
    address: {
      type: String,
      required: [true, "Local guardian's address is required"],
    },
  },
  {
    _id: false,
  }
)

const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: GuardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// virtual
StudentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// query middleware
StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// custom static methods
StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await this.findOne({ id })
  return existingUser
}

// create model
export const Student = model<TStudent, StudentModel>('Student', StudentSchema)
