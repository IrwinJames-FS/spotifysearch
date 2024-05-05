import { Router } from 'express';
import { authToken } from '../../Spotify/requests';
import { UserDocument } from '../../models/User';
import axios, { AxiosError } from 'axios';
import { ApiError } from '../../errors';

const router = Router();

router.get('/', async (req, res, next) => {
	const { uri } = req.query;
	if(!uri) return res.status(400).json({message: 'No uri was provided'})
	try {
		const user = req.user as UserDocument;
		const data = await axios.get(uri as string, authToken(user.accessToken)).then(r=>r.data);
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		const e = error as AxiosError
		return next(new ApiError(e.message, e.response?.status))
	}
})
export default router;