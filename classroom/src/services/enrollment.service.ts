import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface IGetCourseAndStudent {
  courseId: string;
  studentId: string;
}

interface ICreateEnrollment {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  getByCourseAndStudentId({ courseId, studentId }: IGetCourseAndStudent) {
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

  createEnrollment({ courseId, studentId }: ICreateEnrollment) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    })
  }
}