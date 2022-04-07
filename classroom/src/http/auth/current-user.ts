import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export interface IAuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const ctx = GqlExecutionContext.create(context)

    const req = ctx.getContext().req

    console.log(req.user)

    return req.user
  }
)