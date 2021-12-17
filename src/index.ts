import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { RegisterResolver } from "./resolvers/user/Register";

const start = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
    });

    await apolloServer.start();

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql....!");
    });
};

start();
