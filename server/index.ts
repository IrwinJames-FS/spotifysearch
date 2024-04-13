import express from 'express';
import dotenv from 'dotenv';
import { greenlg } from './utils/cx';
import api from './api';
dotenv.config();
const app = express();

const {PORT} = process.env;

app.use('/api', api);
app.listen(PORT, ()=>greenlg`[express] Server is listening on port ${PORT}`)