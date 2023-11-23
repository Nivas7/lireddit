import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { validate } from "graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";


const main =async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: ()=> ({em: orm.em}),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.get('/', (_, res) => {
        res.send("Hello");
    });

    app.listen(4000, () => {
        console.log('server startted on localhost:4000');
    });
};

main().catch((err) => {
    console.log(err);
});