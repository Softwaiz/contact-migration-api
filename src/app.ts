import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import express from "express";
import { gql } from "graphql-tag";
import cors from "cors";
import { ApplicationContext } from "./global";
import { createSchema, createYoga, } from "graphql-yoga";
import { Resolvers } from "./resolvers";

async function main() {
    config();
    const schemaSource = readFileSync(join(__dirname, "../schema.graphql"), "utf-8");

    const yoga = createYoga<ApplicationContext>({
        schema: createSchema({
            typeDefs: gql(schemaSource),
            resolvers: Resolvers,
        }),
        graphqlEndpoint: "/",
    });

    const expressServer = express();

    const port = parseInt(process.env.PORT || "8080");

    
    expressServer
        .use(cors())
        .use(express.json())
        .use((req, res, next) => {
            //req.db = client;
            next();
        })
        //.use(authMiddleware)
        .use("/", async (req, res) => {
            await yoga(req as any, res as any, {  });
        })
        .listen(port, () => {
            console.log(`[Contact Exporter/core]: Started on port ${port} !`);
        });
}


main()
    .then(() => {

    });

