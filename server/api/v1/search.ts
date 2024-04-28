import axios, { AxiosError } from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { UserDocument } from '../../models/User';
import { getItem, nextSpotifyResult, searchSpotify } from '../../Spotify/requests';
import { ApiError } from '../../errors';
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const { q, type, limit } = req.query;
	try {
		console.log(type);
		const user = req.user as UserDocument;
		const data = await searchSpotify(q as string, user.accessToken, type as string[] | undefined, limit ? parseInt(limit as string):undefined);
		return res.status(200).json(data);
	} catch (error) {
		const e = error as AxiosError
		return next(new ApiError(e.message, e.response?.status))
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
		console.log(error);
		const e = error as AxiosError
		return next(new ApiError(e.message, e.response?.status))
	}
});

router.get('/item/:type/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { type, id } = req.params;
	console.log(req.user);
	const user = req.user as UserDocument
	if(!type || !id) return res.status(422).json({message: 'A type and id must be provided'});
	try {
		const result = await getItem(type, id, user.accessToken);
		return res.status(200).json(result);
	} catch (error) {
		const e = error as AxiosError
		return next(new ApiError(e.message, e.response?.status))
	}
})
export default router;