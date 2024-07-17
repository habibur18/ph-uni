import express from 'express'
import { UserRoutes } from '../modules/User/4.user.route'
import { studentRoutes } from '../modules/student/3.student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/4.academic.semester.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/6.academicDepartment.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/6.academic.Faculty.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
// router.use('/users', UserRoutes)
// router.use('/students', studentRoutes)

export default router
