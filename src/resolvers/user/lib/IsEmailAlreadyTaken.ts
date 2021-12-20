import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { User } from "../../../entity/User";

@ValidatorConstraint({ name: "customText", async: false })
class IsEmailAlreadyTaken implements ValidatorConstraintInterface {
    async validate(email: string, _: ValidationArguments): Promise<boolean> {
        const user = await User.findOne({ where: { email } });
        return !user;
    }

    defaultMessage(_: ValidationArguments) {
        return "Email is already in use";
    }
}

export { IsEmailAlreadyTaken };
