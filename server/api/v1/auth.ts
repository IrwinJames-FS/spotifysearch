import { Request, Response, Router } from "express";
import passport from "passport";
import '../../strategies/spotify';
import '../../strategies/cookies';
import { User, UserDocument } from "../../models/User";
const router = Router();

router.get('/', passport.authenticate('spotify'));
router.get('/callback', passport.authenticate('spotify', {failureRedirect: 'http//localhost:3001/api/v1/auth', session: false}), (req: Request, res: Response)=> {
	const user = req.user! as UserDocument
	res.cookie('auth', user._id, {expires: new Date(user.expires), httpOnly: true, domain: 'localhost', path: '/'})
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
		return res.status(200).json(user ? {user:{displayName: user.displayName}}:{user:null});
	} catch (error) {
		return res.status(500).json({message: (error as Error).message});
	}
});
export default router;