import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CoursesService } from "../../../services/courses.service";
import { EnrollmentsService } from "../../../services/enrollment.service";
import { StudentsService } from "../../../services/student.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { CurrentUser, IAuthUser } from "../../auth/current-user";
import { CreateCourseInput } from "../inputs/create-course-input";

import { Course } from "../model/course";

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args("id") id: string, @CurrentUser() user: IAuthUser) {
    const student = await this.studentsService.getStudentByAuthId(user.sub)

    if(!student) {
      throw new Error("Student not found")
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if(!enrollment) {
      throw new UnauthorizedException()
    }

    return this.coursesService.getCourseById(id)
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args("data") data: CreateCourseInput) {
    return this.coursesService.createCourse(data)
  }
}