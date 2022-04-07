import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

import slugify from "slugify"

interface ICreateProduct {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  listAllProducts() {
    return this.prisma.product.findMany()
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async createProduct({ title }: ICreateProduct) {
    const slug = slugify(title, {
      lower: true,
    })

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug
      },
    })

    if (productWithSameSlug) {
      throw new Error("Product with same slug already exists")
    }

    return this.prisma.product.create({
      data: {
        title,
        slug
      }
    })
  }
}