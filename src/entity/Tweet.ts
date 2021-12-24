import { Field, ID, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "tweets" })
@ObjectType()
export class Tweet extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column({ type: "text" })
    @Field()
    description!: string;

    @Column({ type: "boolean", default: false, nullable: false })
    @Field()
    published!: boolean;

    @ManyToOne(() => User, (user) => user.tweets, {
        onDelete: "CASCADE",
        eager: true,
    })
    @JoinTable()
    @Field(() => User)
    user!: User;
}
