import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Tweet } from "./Tweet";

@Entity({ name: "users" })
@ObjectType()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column({ type: "text" })
    @Field()
    firstName!: string;

    @Column({ type: "text" })
    @Field()
    lastName!: string;

    @Field()
    name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @Column({ type: "text", unique: true })
    @Field()
    email!: string;

    @Column({ type: "text" })
    password!: string;

    @Column({ type: "boolean", default: false })
    confirmed!: boolean;

    @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets?: Tweet[];
}

export { User };
