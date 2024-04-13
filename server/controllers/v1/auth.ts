import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import { b64 } from "../../utils/cx";
dotenv.config();
import qs from 'qs';
import axios from "axios";
const { CLIENT_ID, CLIENT_SECRET } = process.env;

export const login = (req: Request, res: Response, next: NextFunction) => {
	console.log(CLIENT_ID)
	const url = `https://accounts.spotify.com/authorize?${qs.stringify({
		response_type: 'code',
		'client_id': CLIENT_ID,
		redirect_uri: 'http://localhost:3001/api/v1/auth/callback'
	})}`;
	res.redirect(url);
}

export const loginCallback = (req: Request, res: Response, next: NextFunction) => {
	const { code } = req.query;
	axios.post('https://accounts.spotify.com/api/token', {
		code,
		redirect_uri: 'http://localhost:3001/api/v1/auth/callback',
		grant_type: 'authorization_code'
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${b64`${CLIENT_ID}:${CLIENT_SECRET}`}`
		}
	})
	.then(r=>r.data)
	.then(data=>console.log(data))
	console.log("Login response", req.body, req.query)
	res.status(204).send();
}

export const loginRegister = (req: Request, res: Response, next: NextFunction) => {
	console.log("Auth");
}