import qs from 'qs';
export const SPOTIFY_BASE: string = 'https://api.spotify.com/v1';
export const GET_PLAYBACK_STATE: string = '/me/player';

export const SP = (base: string)=>(strings:TemplateStringsArray, ...args:any[]) => {
	const l = args.length-1
	if(typeof args[l] === 'object') { //assume query object
		args[l] = qs.stringify(args[l]);
	}
	return `${base}${strings.flatMap((s,i)=>[s,args[i]])}`;
}