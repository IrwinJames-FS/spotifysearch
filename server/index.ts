import express from 'express';
import dotenv from 'dotenv';
import { greenlg } from './utils/cx';
dotenv.config();
const app = express();

const {PORT} = process.env;

app.listen(PORT, ()=>greenlg`[express] Server is listening on port ${PORT}`)