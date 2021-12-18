import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entity/User";
import { LoginInput } from "./lib/LoginInput";
import { LoginResponse } from "./lib/LoginResponse";

@Resolver(User)
class LoginResolver {
    @Mutation(() => LoginResponse)
    async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
        const { email, password } = input;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Incorrect email or password");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            throw new Error("Incorrect email or password");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "30 days",
        });

        return { token };
    }
}

export { LoginResolver };
