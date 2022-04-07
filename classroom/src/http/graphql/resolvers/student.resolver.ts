import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { EnrollmentsService } from "../../../services/enrollment.service";

import { StudentsService } from "../../../services/student.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { CurrentUser, IAuthUser } from "../../auth/current-user";

import { Student } from "../model/student";

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: IAuthUser) {
    return this.studentsService.getStudentByAuthId(user.sub)
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents()
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentByStudent(student.id)
  }
}