import { IsEmail, Length, Validate } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyTaken } from "./IsEmailAlreadyTaken";

@InputType()
class RegisterInput {
    @Validate(IsEmailAlreadyTaken)
    @Field()
    @IsEmail({}, { message: "Email is not valid" })
    email: string;

    @Field()
    @Length(3, 255, {
        message: "First name must be between 3 and 255 characters",
    })
    firstName: string;

    @Field()
    @Length(3, 255, {
        message: "Last name must be between 3 and 255 characters",
    })
    lastName: string;

    @Field()
    @Length(8, 255, {
        message: "Password must be between 8 and 255 characters",
    })
    password: string;
}

export { RegisterInput };
