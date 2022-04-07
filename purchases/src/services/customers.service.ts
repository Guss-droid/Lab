import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface ICreateCustomer {
  authUserId: string;
}

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  getCustomerById(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId
      }
    })
  }

  async createCustomer({ authUserId }: ICreateCustomer) {
    return this.prisma.customer.create({
      data: {
        authUserId
      }
    })
  }
}