import path from "path"
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver } from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from "../services/products.service";
import { PurchasesResolver } from "./graphql/resolvers/purchases.resolver";
import { PurchasesService } from "../services/purchases.service";
import { CustomerService } from "../services/customers.service";
import { CustomerResolver } from "./graphql/resolvers/customer.resolver";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: path.resolve(process.cwd(), "src/schema.gql")
  })],
  providers: [
    ProductsResolver,
    ProductsService,

    PurchasesResolver,
    PurchasesService,

    CustomerResolver,
    CustomerService,
  ]
})
export class HttpModule { }
