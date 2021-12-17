import {
    Arg,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";

@Resolver(User)
class RegisterResolver {
    @Query(() => String, { nullable: true })
    async helloWorld() {
        return "Hello World";
    }

    @FieldResolver()
    name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Mutation(() => User)
    async register(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        }).save();

        return newUser;
    }
}

export { RegisterResolver };
