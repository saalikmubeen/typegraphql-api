import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import { ResetPasswordInput } from "./lib/ResetPassword.Input";

@Resolver()
class ResetPasswordResolver {
    @Mutation(() => User, { nullable: true })
    async resetPassword(
        @Arg("input") input: ResetPasswordInput
    ): Promise<User | null> {
        const { token, password } = input;

        const userId = await redis.get(forgotPasswordPrefix + token);

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return null;
        }

        user.password = await bcrypt.hash(password, 12);
        await user.save();

        await redis.del(forgotPasswordPrefix + token);

        return user;
    }
}

export { ResetPasswordResolver };
