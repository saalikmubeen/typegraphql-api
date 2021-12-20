import { Arg, Mutation, Resolver } from "type-graphql";
import { randomBytes } from "crypto";
import { promisify } from "util";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import { sendMail } from "../../utils/email";
import { EmailTypes } from "../../types/EmailType";

@Resolver()
class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return false;
        }

        const promisedRandomBytes = promisify(randomBytes);
        const resetToken = (await promisedRandomBytes(20)).toString("hex");

        await redis.set(
            forgotPasswordPrefix + resetToken,
            user.id,
            "ex",
            1 * 24 * 60 * 60
        ); // 1 day expiration

        const url = `${process.env.FRONTEND_URL}/resetPassword?resetToken=${resetToken}`;

        await sendMail(user.email, url, EmailTypes.FORGOT_PASSWORD);

        return true;
    }
}

export { ForgotPasswordResolver };
