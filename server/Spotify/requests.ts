import axios, { AxiosRequestConfig } from "axios"
import qs from "qs";
const authToken = (token: string) : AxiosRequestConfig<any> => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
});
export const searchSpotify = (q:string, token:string, types:string[]=['artist','album','playlist','track','show','episode','audiobook'] ) => {
	return axios.get(`https://api.spotify.com/v1/search?${qs.stringify({
		q,
		type: types.join(',')
	})}`, authToken(token)).then(r=>r.data);
}

export const nextSpotifyResult = (uri: string, token:string) => axios.get(uri, authToken(token)).then(r=>r.data);

export const playSpotifyUri = (context_uri: string, device_id:string, token: string) => axios.put(`https://api.spotify.com/v1/me/player/play?${qs.stringify({device_id})}`, {
	context_uri,
}, authToken(token)).then(r=>r.data);

export const transferPlayback = (device_id: string, token: string, play: boolean = false) => {
	console.log("Transferring to ", device_id);
	return axios.put(`https://api.spotify.com/v1/me/player`, {
		device_ids: [device_id],
		play: true
	}, authToken(token))
};