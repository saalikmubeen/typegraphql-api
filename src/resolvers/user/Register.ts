import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { promisify } from "util";
import { User } from "../../entity/User";
import { RegisterInput } from "./lib/RegisterInput";
import { MyContext } from "src/types/MyContext";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../../constants/redisPrefixes";
import { sendMail } from "../../utils/email";
import { EmailTypes } from "../../types/EmailType";

@Resolver(User)
class RegisterResolver {
    @Query(() => String, { nullable: true })
    async helloWorld() {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("input") input: RegisterInput,
        @Ctx() ctx: MyContext
    ): Promise<User> {
        const { email, firstName, lastName, password } = input;
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        }).save();

        const promisedRandomBytes = promisify(randomBytes);
        const confirmToken = (await promisedRandomBytes(20)).toString("hex");

        await redis.set(
            confirmUserPrefix + confirmToken,
            newUser.id,
            "ex",
            1 * 24 * 60 * 60
        ); // 1 day expiration

        const url = `${ctx.req.protocol}://${ctx.req.get("host")}/confirm/${
            newUser.id
        }/${confirmToken}`;

        await sendMail(newUser.email, url, EmailTypes.CONFIRM_EMAIL);

        return newUser;
    }
}

export { RegisterResolver };
