import { Request, Response, Router } from "express";
import passport from "passport";
import '../../strategies/spotify';
import '../../strategies/cookies';
import { IUser, User, UserDocument, UserModel } from "../../models/User";
import axios from "axios";
import dotenv from "dotenv";
import { Document } from "mongoose";
dotenv.config();
const cookieAuth = passport.authenticate('cookie', {session: false})
const router = Router();

router.get('/', passport.authenticate('spotify', {
	scope: ['streaming', 'user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state']
}));

router.get('/callback', passport.authenticate('spotify', {failureRedirect: 'http//localhost:3001/api/v1/auth', session: false}), (req: Request, res: Response)=> {
	const user = req.user! as UserDocument
	const cookie = {expires: new Date(user.expires), domain: 'localhost', path: '/', httpOnly:false}
	console.log(req)
	res.cookie('auth', user._id, cookie);
	res.redirect(302, 'http://localhost:3001');
});

router.get('/signout', cookieAuth, (req, res) => {
	res.clearCookie("auth");
	res.redirect(302, 'http://localhost:3001');
});

/**
 * This will be a method to check if the user exists it will always return 200 however will only populate a user if the auth cookie is set.
 */
router.get('/self', async (req, res) => {
	const { auth } = req.cookies;
	if(!auth) return res.status(200).json({user: null});
	try {
		const user = await User.findById(auth);
		return res.status(200).json(user ? {user:{displayName: user.displayName, accessToken: user.accessToken, expires: user.expires}}:{user:null});
	} catch (error) {
		return res.status(500).json({message: (error as Error).message});
	}
});

const { CLIENT_ID, CLIENT_SECRET } = process.env;
router.get('/refresh', cookieAuth, async (req, res) => {
	const user = req.user as (Document<unknown, {}, UserDocument> & UserDocument & Required<{
		_id: string;
	}>)
	
	console.log("Refreshing users access token");
	try {
		const {data} = await axios.post('https://accounts.spotify.com/api/token', {
			grant_type: 'refresh_token',
			refresh_token: user.refreshToken
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
			}
		});
		console.log(data);
		user.accessToken = data.access_token
		user.expires = new Date().getTime()+(data.expires_in*1e3);
		const updatedUser = await user.save();
		res.cookie('auth', user._id, {expires: new Date(updatedUser.expires), domain: 'localhost', path: '/', httpOnly:true})
		return res.status(200).json(user ? {user:{displayName: updatedUser.displayName, accessToken: updatedUser.accessToken, expires: updatedUser.expires}}:{user:null});
	} catch (error) {
		const e = error as Record<string, any>
		return res.status(e.status ?? 401).json({message: e.message});
	}
});
export default router;