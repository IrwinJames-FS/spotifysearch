import passport, { DoneCallback } from 'passport'
import {Profile, Strategy, VerifyCallback} from 'passport-spotify';
import dotenv from 'dotenv';
dotenv.config();
const {CLIENT_ID="", CLIENT_SECRET=""} = process.env;
passport.use(new Strategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET ,
	callbackURL: 'http://localhost:3001/api/v1/auth/callback'
}, (acessToken: string, refreshToken: string, expires_in: number, profile: Profile, done: VerifyCallback) => {
	return done(new Error("Just Checking"));
}));