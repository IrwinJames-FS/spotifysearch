import { Request, Response, Router } from "express";
import Auth from './auth';
import Search from './search';
import passport from 'passport'
import '../../strategies/cookies';
const cookieAuth = passport.authenticate('cookie', {session: false})
const router = Router();

router.use('/auth', Auth);
router.use('/search', cookieAuth, (req: Request, res: Response) => {
	console.log("I got this")
	return res.status(200).json({wham: 'wham'});
})
export default router;