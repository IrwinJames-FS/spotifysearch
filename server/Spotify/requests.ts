import axios, { AxiosRequestConfig } from "axios"
import qs from "qs";
import { ApiError } from "../errors";
const SPOT_URI = `https://api.spotify.com/v1`;
const zip = (strings: TemplateStringsArray, args: any[]): string => {
	return strings.map((s,i)=>`${s}${args.length > i ? args[i]:''}`).join('')
}
const bl = (strings: TemplateStringsArray, ...args:any[]): string => {
	let lst = args.pop();
	if (!lst) lst = '';
	if (typeof lst === 'object') lst = '?'+qs.stringify(lst) //assume the last might be a url parameter
	return `${SPOT_URI}${zip(strings, [...args, lst])}`
}

const authToken = (token: string) : AxiosRequestConfig<any> => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
});
export const ax = {
	get: (url: string, token: string, params?: Record<string, any>) => axios.get(bl`${url}${params}`, authToken(token)).then(r=>r.data),
	post: (url: string, token: string, params?: Record<string,any>, body?: Record<string, any>) => axios.post(bl`${url}${params}`, body, authToken(token)).then(r=>r.data),
	put: (url: string, token: string, params?:Record<string, any>, body?: Record<string, any>) => axios.put(bl`${url}${params}`, body, authToken(token)).then(r=>r.data)
}
export const searchSpotify = (q:string, token:string, types:string[]=['artist','album','playlist','track','show','episode','audiobook'] ) => ax.get('/search', token, {q, type: types.join(',')});

export const nextSpotifyResult = (uri: string, token:string) => axios.get(uri, authToken(token)).then(r=>r.data);

export const playSpotifyUri = (context_uri: string | undefined, uri: string | undefined, device_id:string, token: string) => ax.put('/me/player/play', token, {device_id}, {context_uri, ...(!!uri && {offset: {uri}})});

type PlayProps = {
	context_uri?: string,
	uris?: string[],
	offset?: {
		uri?: string
		position?: number
	}
}
export const playSpotify = (device_id: string, token: string, options: PlayProps ) => ax.put('/me/player/play', token, {device_id}, options);
export const transferPlayback = (device_id: string, token: string, play: boolean = false) => ax.put('/me/player', token, undefined, {device_ids:[device_id], play:true});

const itemTypes: Set<string> = new Set(['albums', 'artists', 'audiobooks', 'categories', 'chapters', 'episodes', 'genres', 'shows', 'tracks', 'playlists']);
export const getItem = (type: string, id: string, token:string) => {
	if(!itemTypes.has(type)) throw new ApiError(`An unsupported item type was provided ${type}`, 422);
	return ax.get(`/${type}/${id}`, token);
}

