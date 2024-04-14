import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import qs from 'qs';
import { UserDocument } from '../../models/User';
const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const { q } = req.query;
	try {
		const user = req.user as UserDocument;
		console.log('user', user.accessToken);
		const data = await axios.get(`https://api.spotify.com/v1/search?${qs.stringify({
			q,
			type: 'artist,album,playlist,track,show,episode,audiobook'
		})}`, {
			headers: {
				Authorization: `Bearer ${user.accessToken}`
			}
		}).then(r=>r.data);
		console.log(data);
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({message:(error as Error).message})
	}
})
export default router;