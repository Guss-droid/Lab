import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface IGetCourseAndStudent {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  getByCourseAndStudentId({courseId, studentId}: IGetCourseAndStudent) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      },
    })
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  listEnrollmentByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}