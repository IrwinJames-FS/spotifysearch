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
router.use('/search', cookieAuth, Search);
router.use('/player', cookieAuth, Player);

//This is kind of like a pass through router to give more front end access to the api
router.use('/spot', cookieAuth, Spot)
export default router;