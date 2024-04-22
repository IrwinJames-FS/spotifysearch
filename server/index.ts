import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { greenlg, redlg } from './utils/cx';
import api from './api';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy'
dotenv.config();
const app = express();


const {PORT, MONGO, NODE_ENV="development"} = process.env;
mongoose.connect(MONGO as string);
const db = mongoose.connection;
db.on('error', (error: unknown) =>redlg`[MONGO] Database Error: ${(error as Error).message}`); //Should probably be outputting to a log... heroku does this for you.
db.once('open', () => greenlg`[MONGO] Connection successfull`)
app.use(cookieParser());
app.use(express.json());
app.use('/api', api);
app.use('/', NODE_ENV === "development" ? proxy("http://localhost:3000"):express.static('../client/build'));

interface ApiErrorType extends Error {
	status?: number
}
app.use((error: ApiErrorType, request: Request, response:Response, next: NextFunction) => {
	return response.status(error.status ?? 500).json({message: error.message});
});
app.listen(PORT, ()=>greenlg`[express] Server is listening on port ${PORT}`)