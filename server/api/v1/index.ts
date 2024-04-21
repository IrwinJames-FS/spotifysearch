import { Request, Response, Router } from "express";
import Auth from './auth';
import Search from './search';
import Player from './player';
import passport from 'passport';
import '../../strategies/cookies';
const cookieAuth = passport.authenticate('cookie', {session: false})
const router = Router();

router.use('/auth', Auth);
router.use('/search', cookieAuth, Search);
router.use('/player', cookieAuth, Player);
export default router;