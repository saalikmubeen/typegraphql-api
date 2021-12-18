import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class LoginInput {
    @Field()
    @IsEmail({}, { message: "Email is not valid" })
    email: string;

    @Field()
    password: string;
}

export { LoginInput };
