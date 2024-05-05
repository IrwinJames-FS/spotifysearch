import { Router } from "express";
import Auth from './auth';
import Spot from './spot';
import Pass from './pass';
import passport from 'passport';
const router = Router();

router.use('/auth', Auth);

//This is kind of like a pass through router to give more front end access to the api
router.use('/spot', passport.session(), Spot);
router.use('/pass', passport.session(), Pass);

export default router;