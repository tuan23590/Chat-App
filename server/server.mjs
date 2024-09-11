import http from 'http';
import experss from 'express';
import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser';
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';


const app = experss();
const httpServer = http.createServer(app);

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xwqg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
` 
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});


await server.start();

app.use(cors(),bodyParser.json(),expressMiddleware(server));

mongoose.connect(URI).then(async () =>{
    console.log('Connceted to DB')
    await new Promise((resolve)=> httpServer.listen({port: PORT},resolve));
    console.log('Server: http://localhost:4000');
});

