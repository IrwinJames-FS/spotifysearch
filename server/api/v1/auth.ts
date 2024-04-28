import { Request, Response, Router } from "express";
import passport from "passport";
import '../../strategies/spotify';
import { User, UserDocument} from "../../models/User";
import axios from "axios";
import dotenv from "dotenv";
import { Document } from "mongoose";
import session from "express-session";
import { Session } from "../../types";
dotenv.config();
const router = Router();

/**
 * This will be a method to check if the user exists it will always return 200 however will only populate a user if the auth cookie is set.
 */
type PassportSession = session.Session & Partial<session.SessionData> & {
	referrer?: string
	passport?: {
		user: UserDocument
	},
	oldSessionData?: any
}

router.get('/', (req, res, next) => {
	const {referrer} = req.query;
	const session = req.session as PassportSession;
	session.referrer = referrer as string | undefined;

	session.save(err => {
		if(err) console.log(err);
		return next();
	});
}, passport.authenticate('spotify', {
	scope: ['streaming', 'user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state']
}));

router.get('/callback', (req, res, next) => {
	const referrer = (req.session as PassportSession)?.referrer;
	if(referrer) {
		res.locals = {referrer};
	}
	return next();
}, passport.authenticate('spotify', {failureRedirect: 'http//localhost:3001/api/v1/auth'}), (req: Request, res: Response)=> {
	const referrer = res.locals.referrer ?? 'http://localhost:3001';
	res.redirect(302, referrer);
});

router.get('/signout', (req, res) => {
	if (req.session) req.session.destroy(err=>console.log("Destroy Error:", err));
	const {referrer} = req.query;
	res.redirect(302, (referrer as string) ?? 'http://localhost:3001');
});


router.get('/self', async (req, res) => {
	const user = (req.session as PassportSession)?.passport?.user;
	return res.status(200).json(user ? {user:{displayName: user.displayName, accessToken: user.accessToken, expires: user.expires}}:{user:null});
});

const { CLIENT_ID, CLIENT_SECRET } = process.env;
router.get('/refresh', passport.session(), async (req, res) => {
	const user = req.user as (Document<unknown, {}, UserDocument> & UserDocument & Required<{
		_id: string;
	}>)
	const session = req.session as Session
	if(!session?.passport?.user) return res.status(401).json({user: "You must be authenticated prior to refreshing a token"})
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
		user.accessToken = data.access_token
		user.expires = new Date().getTime()+(data.expires_in*1e3);
		const updatedUser = await User.findByIdAndUpdate(user._id, user) as UserDocument;
		session.passport.user = updatedUser
		return res.status(200).json(user ? {user:{displayName: updatedUser.displayName, accessToken: updatedUser.accessToken, expires: updatedUser.expires}}:{user:null});
	} catch (error) {
		const e = error as Record<string, any>
		console.log(e)
		return res.status(e.status ?? 401).json({message: e.message});
	}
});
export default router;