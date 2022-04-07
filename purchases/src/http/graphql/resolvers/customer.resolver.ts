import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CustomerService } from '../../../services/customers.service';

import { Customer } from '../models/customer';
import { CurrentUser, IAuthUser } from '../../auth/current-user';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {

  constructor(
    private customersService: CustomerService,
    private purchasesService: PurchasesService
  ) { }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: IAuthUser) {
    return this.customersService.getCustomerById(user.sub)
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id)
  }
}
