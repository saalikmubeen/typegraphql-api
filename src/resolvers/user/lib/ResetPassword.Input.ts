import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class ResetPasswordInput {
    @Field()
    token: string;

    @Field()
    @Length(8, 20, {
        message: "Password must be between 8 and 20 characters",
    })
    password: string;
}

export { ResetPasswordInput };
