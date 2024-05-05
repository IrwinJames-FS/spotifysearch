import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import '../../strategies/spotify';
import { User, UserDocument} from "../../models/User";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import session from "express-session";
import { Session, UserObject } from "../../types";
import { ApiError } from "../../errors";
import { ax, bl, bnl } from "../../Spotify/requests";

dotenv.config();

//this is a horrible method of making delayed actions because in the wild this would not differenciate requests but in this environment it is logical the next request would be from the same user.
var requestQueue: [string, string][] = [];

export const dequeue = async (req:Request, res:Response, next:NextFunction) => {
	console.log("Got ", requestQueue.length, "To Clear");
	for (let i = 0; i<requestQueue.length; i++){
		try{ 
			console.log("Requesting ", requestQueue[i][0])
			await axios.put(requestQueue[i][0], {}, {headers: {Authorization: requestQueue[i][1]}})
			console.log("Req");
		} catch (error) {
			console.log("Got an error in dqueu", (error as AxiosError).response?.data);
			continue
		}
	}
	requestQueue = []
	return next();
}
export const refresher = async (req: Request, res: Response, next: NextFunction) => {
	let user = req.user as UserObject | undefined
	if(!("passport" in req.session)) return next();
	const pass = (req.session as Session).passport
	if(!user && pass && "user" in pass) {
		user = pass.user
	}
	if(!user) return next();
	console.log("Got user");
	const session = req.session as Session
	if(!session?.passport?.user) return next();
	console.log("Got session");
	const expires = user.expires;
	if (expires > Date.now()) return next();
	try {
		const {data} = await axios.post('https://accounts.spotify.com/api/token', {
			grant_type: 'refresh_token',
			refresh_token: user!.refreshToken
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
			}
		});
		user!.accessToken = data.access_token
		user!.expires = new Date().getTime()+(data.expires_in*1e3);
		const updatedUser = await User.findByIdAndUpdate(user!._id, user) as UserDocument;
		session!.passport!.user = updatedUser as UserObject

		return next();
	} catch (error) {
		const e = error as Record<string, any>
		return next()
	}
}

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
		console.log("Auth session saved")
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
}, passport.authenticate('spotify', {failureRedirect: 'http://localhost:3001'}), (req: Request, res: Response)=> {
	const referrer = res.locals.referrer ?? 'http://localhost:3001';
	res.redirect(302, referrer);
});

router.get('/signout', (req, res) => {
	
	if (!req.session) return res.status(401).json({message: "Not Authorized"});
	const {referrer} = req.query;
	return req.logout(err=>{
		if(err) {
			console.log("Signout error");
			return res.status(500).json({message:"We are looking into it"});
		}
		return res.redirect(302, (referrer as string) ?? 'http://localhost:3001');
	});
});


router.get('/self', dequeue, refresher, async (req, res) => {
	const user = (req.session as PassportSession)?.passport?.user;
	//fetch Spotify UserProfile and append it to the exising message
	if(!user) return res.status(200).json({user:null});
	try {
		console.log(user, new Date(user.expires).toUTCString())
		const spotUser = await ax(user!.accessToken).get('/me');
		return res.status(200).json({user:{displayName: user!.displayName, accessToken: user!.accessToken, expires: user!.expires, ...spotUser}}); //this should be hashed
	} catch (error) {
		//console.log(error);
		const e = error as AxiosError
		if(e.response?.status === 401) {
			console.log("Time to try to refresh")
		}
	}
});

router.get('/knox', async (req, res) => {
	const user = (req.session as PassportSession)?.passport?.user;
	if (!user) return res.status(200).send('');
	return res.status(200).send(user.accessToken);
})

const { CLIENT_ID, CLIENT_SECRET } = process.env;
router.get('/refresh', passport.session(), refresher, async (req, res) => {
	const user = (req.user || (req.session as Session).passport?.user) as UserObject | undefined
	if(!user) return res.status(200).json({user:null});
	const spotUser = await ax(user!.accessToken).get('/me');
	return res.status(200).json({user:{displayName: user.displayName, accessToken: user.accessToken, expires: user.expires, ...spotUser}});
});

router.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
	console.log(error)
	const referrer = res.locals.referrer ?? 'http://localhost:3001';
	res.redirect(302, referrer);
})

router.put('/update', async (req, res, next)=>{
	const bear = req.header("Authorization");
	const query = Object.keys(req.query).length ? req.query:undefined;
	if(!bear) return res.status(500).json({message:"Something went wrong please try again"});

	requestQueue.push([bnl`/me/player/seek${query}`, bear])
	
	res.status(204).send();
})
export default router;