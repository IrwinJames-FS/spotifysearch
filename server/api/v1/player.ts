import { Router } from "express";
import { UserDocument } from "../../models/User";
import { playSpotify, playSpotifyUri, transferPlayback } from "../../Spotify/requests";
import { AxiosError } from "axios";

const router = Router();
router.put('/', async (req, res) => {
	console.log(req.body);
	const {context_uri, uri, device_id} = req.body;
	
	try {
		const user = req.user as UserDocument;
		const data = await playSpotifyUri(context_uri, uri, device_id, user.accessToken)
		console.log(data)
		res.status(200).json(data);
	} catch (error) {
		console.log(error, (error as Error).message);
		return res.status(500).json({message: (error as Error).message});
	}
});
router.put('/play', async (req, res) => {
	console.log(req.body);
	const {device_id} = req.query;
	if(!device_id) return res.status(423).json({message: "No device id provided"})
	try {
		const user = req.user as UserDocument;
		const data = await playSpotify(device_id as string, user.accessToken, req.body);
		console.log(data)
		res.status(200).json(data);
	} catch (error) {
		console.log(error, (error as Error).message);
		return res.status(500).json({message: (error as Error).message});
	}
});
router.put('/transfer', async (req, res) => {
	const {device_id} = req.body;
	try {
		const user = req.user as UserDocument;
		await transferPlayback(device_id, user.accessToken);
		return res.status(204).send();
	} catch (error) {
		console.log((error as AxiosError).response?.data);
		return res.status(500).json((error as Error).message);
	}
})
export default router;
