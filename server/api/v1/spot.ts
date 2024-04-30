import { Router } from 'express';
import { ApiError } from '../../errors';
import { AxiosError } from 'axios';
import { ax } from '../../Spotify/requests';
import { UserDocument } from '../../models/User';

const router = Router();

router.get('/*', async (req, res, next) => {
	const ex = (req.params as Record<string,string>)['0']
	const query = Object.keys(req.query).length ? req.query:undefined
	if(!ex) return next(new ApiError('Invalid params provided', 422));
	if(!req.user) return res.status(500).json({message:"Something went wrong please try again"}) //sometimes a non authenticated user slips through if rapid login logout attempts are made this shouldnt be necessary in the wild but If I managed to break it someone else will too.
	try {
		const data = await ax.get('/'+ex, (req.user! as UserDocument).accessToken, query)
		return res.status(200).json(data);
	} catch (error) {
		const e = error as AxiosError
		console.log("There was an error", error);
		return next(new ApiError(e.message, e.response?.status))
	}
});

router.post('/*', async (req, res, next) => {
	const ex = (req.params as Record<string,string>)['0']
	const query = Object.keys(req.query).length ? req.query:undefined;
	const body = req.body;
	if(!req.user) return res.status(500).json({message:"Something went wrong please try again"})
	if(!ex) return next(new ApiError('Invalid params provided', 422));
	try {
		const data = await ax.post('/'+ex, (req.user! as UserDocument).accessToken, query, body)
		return res.status(200).json(data);
	} catch (error) {
		const e = error as AxiosError
		console.log(e.status, e.message, e.response)
		return next(new ApiError(e.message, e.response?.status))
	}
});

router.put('/*', async (req, res, next) => {
	const ex = (req.params as Record<string,string>)['0']
	const query = Object.keys(req.query).length ? req.query:undefined;
	const body = req.body;
	if(!req.user) return res.status(500).json({message:"Something went wrong please try again"})
	if(!ex) return next(new ApiError('Invalid params provided', 422));
	try {
		const data = await ax.put('/'+ex, (req.user! as UserDocument).accessToken, query, body)
		return res.status(200).json(data);
	} catch (error) {
		const e = error as AxiosError
		//console.log(e.status, e.message, e.response)
		console.log(ex, Object.keys(e?.request ?? {}),e?.request.path, e.response?.data);
		return next(new ApiError(e.message, e.response?.status))
	}
});
export default router;