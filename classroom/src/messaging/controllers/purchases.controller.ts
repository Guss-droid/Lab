import { Controller } from "@nestjs/common"
import { EventPattern, Payload } from "@nestjs/microservices"
import { CoursesService } from "../../services/courses.service";
import { EnrollmentsService } from "../../services/enrollment.service";
import { StudentsService } from "../../services/student.service";

interface ICustomer {
  authUserId: string;
}

interface IProduct {
  id: string;
  title: string;
  slug: string;
}

interface ICreatePurchase {
  customer: ICustomer;
  product: IProduct;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @EventPattern("purchases.new-purchase")
  async purchaseCreated(@Payload("value") payload: ICreatePurchase) {
    let student = await this.studentsService.getStudentByAuthId(
      payload.customer.authUserId
    )

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId
      })
    }

    let course = await this.coursesService.getCourseBySlug(payload.product.slug)

    if (!course) {
      await this.coursesService.createCourse({
        title: payload.product.title
      })
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id
    })
  }
}