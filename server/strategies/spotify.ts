import passport, { DoneCallback } from 'passport'
import {Profile, Strategy, VerifyCallback} from 'passport-spotify';
import dotenv from 'dotenv';
import { User } from '../models/User';
dotenv.config();
const {CLIENT_ID="", CLIENT_SECRET=""} = process.env;
passport.use(new Strategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET ,
	callbackURL: 'http://localhost:3001/api/v1/auth/callback'
}, async (accessToken: string, refreshToken: string, expires_in: number, profile: Profile, done: VerifyCallback) => {
	try{
		const user = await User.findByIdAndUpdate(profile.id, {$set: {displayName: profile.displayName, accessToken, refreshToken, expires: new Date().getTime()+(expires_in*1e3)}}, {upsert: true});
		return done(null, user!);
	} catch (error) {
		return done(error as Error)
	}
}));

