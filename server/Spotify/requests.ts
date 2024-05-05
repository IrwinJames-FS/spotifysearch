import axios, { AxiosRequestConfig } from "axios"
import qs from "qs";
import { ApiError } from "../errors";
export const SPOT_URI = `https://api.spotify.com/v1`;
const zip = (strings: TemplateStringsArray, args: any[]): string => {
	return strings.map((s,i)=>`${s}${args.length > i ? args[i]:''}`).join('')
}
export const bl = (strings: TemplateStringsArray, ...args:any[]): string => {
	let lst = args.pop();
	if (!lst) lst = '';
	if (typeof lst === 'object') lst = '?'+qs.stringify(lst) //assume the last might be a url parameter
	return `${zip(strings, [...args, lst])}`
}

export const bnl = (strings: TemplateStringsArray, ...args:any[]): string => {
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
export const ax = (token: string) => {
	const axi = axios.create({
		baseURL: SPOT_URI,
		...authToken(token)
	})
	axi.interceptors.response.use(r=>r.data); //just use the data
	return axi;
}