import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    name!: string;

    @Column({ type: "text", unique: true })
    @Field()
    email!: string;

    @Column({ type: "text" })
    password!: string;
}

export { User };
