import axios from 'axios';
import qs from 'qs';
import { ResultItem, SearchResult, SearchResultGroup } from '../components/common.types';
const BASE_URL = 'http://localhost:3001/api/v1';
const zip = (strings: TemplateStringsArray, args: any[]): string => {
	return strings.map((s,i)=>`${s}${args.length > i ? args[i]:''}`).join('')
}
const bl = (strings: TemplateStringsArray, ...args:any[]): string => {
	return `${BASE_URL}${zip(strings, args)}`
}
export const getSelf = () => axios.get(`${BASE_URL}/auth/self`, {withCredentials: true}).then(r=>r.data);

export const search = (q: string, type: string[] | undefined=undefined, limit:number=20) : Promise<SearchResult> => axios.get(`${BASE_URL}/spot/search?${qs.stringify({q, type:type?.join(','), limit})}`, {withCredentials: true}).then(r=>r.data);
export const forwardUri = (uri:string) => axios.get(bl`/pass?${qs.stringify({uri})}`, {withCredentials:true}).then(r=>r.data);
export const next = <T extends ResultItem>(uri:string): Promise<SearchResultGroup<T>> => forwardUri(uri).then(d=>{
	const k = Object.keys(d)[0]
	return d[k];
});

export const signout = ()=> axios.delete(`${BASE_URL}/auth`, {withCredentials: true})

export const play = (device_id: string, context_uri?: string, uri?: string) => axios.put(`${BASE_URL}/player`, {
	context_uri, uri, device_id
}, {withCredentials: true}).then(r=>r.data);

type PlayOptions = {
	context_uri?: string,
	uris?: string[]
	offset?: {
		uri?: string
		position?: number
	}
}
export const playIt = (device_id: string, options: PlayOptions) => axios.put(bl`/spot/me/player/play?${qs.stringify({device_id})}`, options, {withCredentials:true}).then(r=>r.data);

export const transfer = (device_id: string) => axios.put(`${BASE_URL}/spot/me/player`, {
	device_ids:[device_id],
	play:true
}, {withCredentials: true});

export const refresh = () => axios.get(`${BASE_URL}/auth/refresh`, {withCredentials: true}).then(r=>r.data);

export const getItem = (type: string, id: string) => axios.get(bl`/spot/${type}s/${id}`, {withCredentials:true}).then(r=>r.data);

export const addToQueue = (uri: string, device_id: string) => axios.post(bl`/spot/me/player/queue?${qs.stringify({uri, device_id})}`, {} , {withCredentials:true}).then(r=>r.data);

export const getQueue = () => axios.get(bl`/spot/me/player/queue`, {withCredentials: true}).then(r=>r.data);

export const getAccessToken = () => axios.get(bl`/auth/knox`, {withCredentials: true}).then(r=>r.data);