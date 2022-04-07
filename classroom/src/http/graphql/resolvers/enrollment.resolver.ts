import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";

import { EnrollmentsService } from "../../../services/enrollment.service";
import { StudentsService } from "../../../services/student.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";

import { Enrollment } from "../model/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) { }

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments()
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId)
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId)
  }
}