import { z } from 'zod'

// Define Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(15)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().max(15).optional(),
  lastName: z.string().min(3).max(15),
})

// Define Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  mothercontactNo: z.string(),
  address: z.string(),
})

// Define Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(4).max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
})

export const StudentValidations = {
  createStudentValidationSchema,
}
