import { SpotyConfig, SpotyEndpoints } from "../spoty.types"
import { SPOTIFY_BASE } from "../spotify.urls"
import axios, { Axios } from "axios";
import qs from 'qs';


type Templater<T> = (strings: TemplateStringsArray, ...args:any[])=>T
export type Requester = <T, K=undefined>(data?:K)=>Promise<T>
type Handler = Templater<Requester>


export type Spax = {
	url: (strings: TemplateStringsArray, ...args:any[])=>string
	get: Handler
	put: Handler
	post: Handler
	instance: Axios
}
const ubl = (strings: TemplateStringsArray, ...args:any[])=>{
	const l = args.length-1;
	if(~l && typeof args[l] === 'object') args[l] = qs.stringify(args[l]);
	return strings.map((s,i)=>s+args[i])
}
const urlBuilder = (base?:string)=>(strings: TemplateStringsArray, ...args:any[])=>`${base ?? SPOTIFY_BASE}${ubl(strings, ...args)}`;
export const spax = ({base, getToken, endpoints}: SpotyConfig):Spax => {
	const ax = axios.create({
		baseURL: base ?? SPOTIFY_BASE,
		withCredentials: !!base
	})
	if (!base){ //add an interceptor to fetch the token when its needed
		ax.interceptors.request.use(async (config)=>{
			const h = await getToken();
			config.headers.Authorization = `Bearer ${h}`;
			return config;
		});
	}
	return {
		url: urlBuilder(base),
		get: buildHandler('get', endpoints, (url: string) => ax.get(url).then(r=>r.data)),
		put: buildHandler('put', endpoints, (url: string, data)=>ax.put(url, data)),
		post: buildHandler('post', endpoints, (url: string, data)=>ax.post(url, data)),
		instance: ax
		//a custom handler intended to stay alive. the only real use case at this time it to update the playback position
	}
}

const buildHandler = (method: string, endpoints:SpotyEndpoints={}, cb: <T,K>(url: string, data:K)=>Promise<T>): Handler => (strings, ...args):Requester => {
	//build the url
	const l = args.length-1
	if(~l && typeof args[l] === 'object'){
		args[l] = qs.stringify(args[l]);
	}
	//put it together
	const url = strings.map((v,i)=>v+(args[i] || '')).join('');
	const path = method+':'+url.split('?')[0];
	if (path in endpoints) return endpoints[path]
	return async <T,K>(data:K):Promise<T> => {
		return cb(url, data);
	}
}
