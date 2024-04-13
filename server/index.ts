import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { greenlg } from './utils/cx';
import api from './api';
import passport = require('passport');
import './strategies/spotify';

dotenv.config();
const app = express();

const {PORT} = process.env;

app.get('/auth', passport.authenticate('spotify'));
app.get('/auth', passport.authenticate('spotify', {failureRedirect: '/auth'}), (req, res) => {
	res.redirect('http://localhost:3000');
});
app.use('/api', api);
app.listen(PORT, ()=>greenlg`[express] Server is listening on port ${PORT}`)