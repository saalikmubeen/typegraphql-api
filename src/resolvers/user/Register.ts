import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver(User)
class RegisterResolver {
    @Query(() => String, { nullable: true })
    async helloWorld() {
        return "Hello World";
    }

    // @FieldResolver()
    // name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`;
    // }

    @Mutation(() => User)
    async register(@Arg("input") input: RegisterInput): Promise<User> {
        const { email, firstName, lastName, password } = input;
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
