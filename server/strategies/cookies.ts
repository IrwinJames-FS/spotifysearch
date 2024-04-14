import passport, { DoneCallback } from "passport";
import { Strategy } from "passport-cookie";
import { User } from "../models/User";

passport.use(new Strategy({
	cookieName: 'auth'
}, async (token:string, done: DoneCallback) => {
	console.log(token);
	try {
		const user = await User.findById(token);
		return done(null, user);
	} catch (error) {
		return done(error);
	}
}));