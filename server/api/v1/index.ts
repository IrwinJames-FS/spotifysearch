import { Request, Response, Router } from "express";
import Auth from './auth';
import Search from './search';
import Player from './player';
import Spot from './spot';
import passport from 'passport';
import '../../strategies/cookies';
const cookieAuth = passport.authenticate('cookie', {session: false})
const router = Router();

router.use('/auth', Auth);
router.use('/search', passport.session(), Search);
router.use('/player', passport.session(), Player);

//This is kind of like a pass through router to give more front end access to the api
router.use('/spot', passport.session(), Spot)
export default router;