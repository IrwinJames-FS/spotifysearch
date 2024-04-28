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

export const authToken = (token: string) : AxiosRequestConfig<any> => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
});
export const ax = {
	get: (url: string, token: string, params?: Record<string, any>) => axios.get(bl`${url}${params}`, authToken(token)).then(r=>r.data),
	post: (url: string, token: string, params?: Record<string,any>, body?: Record<string, any>) => axios.post(bl`${url}${params}`, body, authToken(token)).then(r=>r.data),
	put: (url: string, token: string, params?:Record<string, any>, body?: Record<string, any>) => axios.put(bl`${url}${params}`, body, authToken(token)).then(r=>r.data)
}