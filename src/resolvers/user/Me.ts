import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/MyContext";
import { User } from "../../entity/User";

@Resolver()
class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext) {
        return ctx.req.user;
    }
}

export { MeResolver };
