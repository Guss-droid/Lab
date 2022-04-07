import path from "path"
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import { StudentResolver } from "./graphql/resolvers/student.resolver";
import { CourseResolver } from "./graphql/resolvers/course.resolver";
import { EnrollmentResolver } from "./graphql/resolvers/enrollment.resolver";
import { StudentsService } from "../services/student.service";
import { CoursesService } from "../services/courses.service";
import { EnrollmentsService } from "../services/enrollment.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
     DatabaseModule,
      GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: path.resolve(process.cwd(), "src/schema.gql")
  })],
  providers: [
    StudentResolver,
    StudentsService,

    CourseResolver,
    CoursesService,

    EnrollmentResolver,
    EnrollmentsService,
  ]
})
export class HttpModule { }
