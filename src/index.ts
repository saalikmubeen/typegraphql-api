import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import express from "express";

@Resolver()
class AppResolver {
    @Query(() => String)
    async helloWorld() {
        return "Hello World";
    }
}

const start = async () => {
    const schema = await buildSchema({
        resolvers: [AppResolver],
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
