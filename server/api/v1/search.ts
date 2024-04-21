import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import qs from 'qs';
import { UserDocument } from '../../models/User';
import { nextSpotifyResult, searchSpotify } from '../../Spotify/requests';
const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const { q } = req.query;
	try {
		const user = req.user as UserDocument;
		const data = await searchSpotify(q as string, user.accessToken);
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({message:(error as Error).message})
	}
});

router.get('/next', async (req: Request, res: Response, next: NextFunction) => {
	const { uri } = req.query;
	if(!uri) return res.status(400).json({message: 'No uri was provided'})
	try {
		const user = req.user as UserDocument;
		const data = await nextSpotifyResult(uri as string, user.accessToken);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500).json({message: (error as Error).message});
	}
})
export default router;