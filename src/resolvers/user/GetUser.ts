import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
class GetUserResolver {
    // ...
    @Query(() => User)
    async getUser(@Arg("userId") userId: number): Promise<User | undefined> {
        const user = await User.findOne(
            { id: userId },
            { relations: ["tweets"] }
        );

        return user;
    }
}

export { GetUserResolver };
