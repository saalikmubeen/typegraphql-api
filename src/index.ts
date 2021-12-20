import "reflect-metadata";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import jwt from "jsonwebtoken";
import { RegisterResolver } from "./resolvers/user/Register";
import { LoginResolver } from "./resolvers/user/Login";
import { User } from "./entity/User";
import { MyContext } from "./types/MyContext";
import { MeResolver } from "./resolvers/user/Me";

dotenv.config();

const start = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, MeResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: async (context: MyContext) => {
            const authorization = context.req.headers["authorization"];

            if (!authorization) {
                return context;
            }

            try {
                const token = authorization.split(" ")[1];

                if (!token) {
                    return context;
                }
                const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
                    id: string;
                };

                const user = await User.findOne({ where: { id: payload.id } });

                if (user) {
                    context.req.user = user;
                }
            } catch (err) {
                console.log(err);
            }

            return context;
        },
    });

    const app = express();

    app.use(
        cors({
            credentials: true,
            origin: "*",
        })
    );

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.get("/confirm/:id/:token", (req, res) => {
        res.send({ userId: req.params.id, token: req.params.token });
    });

    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql....!");
    });
};

start();
