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

export const search = (q: string) : Promise<SearchResult> => axios.get(`${BASE_URL}/search?${qs.stringify({q})}`, {withCredentials: true}).then(r=>r.data);
export const forwardUri = (uri:string) => axios.get(bl`/search/next?${qs.stringify({uri})}`, {withCredentials:true}).then(r=>r.data);
export const next = <T extends ResultItem>(uri:string): Promise<SearchResultGroup<T>> => forwardUri(uri).then(d=>{
	const k = Object.keys(d)[0]
	return d[k];
});

export const signout = ()=> axios.delete(`${BASE_URL}/auth`, {withCredentials: true})

export const play = (uri: string, device_id: string) => axios.put(`${BASE_URL}/player`, {
	uri, device_id
}, {withCredentials: true}).then(r=>r.data);

export const transfer = (device_id: string) => axios.put(`${BASE_URL}/player/transfer`, {
	device_id
}, {withCredentials: true});

export const refresh = () => axios.get(`${BASE_URL}/auth/refresh`, {withCredentials: true}).then(r=>r.data);

export const getItem = (type: string, id: string) => axios.get(bl`/spot/${type}s/${id}`, {withCredentials:true}).then(r=>r.data);

export const addToQueue = (uri: string, device_id: string) => axios.post(bl`/spot/me/player/queue?${qs.stringify({uri, device_id})}`, {} , {withCredentials:true}).then(r=>r.data);

