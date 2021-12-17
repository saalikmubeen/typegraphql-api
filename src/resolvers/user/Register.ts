import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
class RegisterResolver {
    @Query(() => String, { nullable: true })
    async helloWorld() {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User> {
        return {
            id: 1,
            firstName,
            lastName,
            email,
            password,
        };
    }
}

export { RegisterResolver };
