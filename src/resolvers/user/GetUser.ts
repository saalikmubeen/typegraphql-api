import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
class GetUserResolver {
    // ...
    @Query(() => User)
    async getUser(@Arg("userId") userId: string): Promise<User | undefined> {
        const user = await User.findOne({ where: { id: userId } });

        return user;
    }
}

export { GetUserResolver };
