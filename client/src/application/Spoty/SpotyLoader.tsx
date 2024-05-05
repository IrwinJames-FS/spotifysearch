import { FC, ReactNode, memo, useEffect} from "react";
import { useBool } from "./hooks/useBool";
import { scripter } from "./utils/scripter";


declare global {
	interface Window { spoty?: {ready: boolean, player?: Spotify.Player }}
}

type SpotyLoaderProps = {
	children?: ReactNode
};
/**
 * Spoty loader is responsible for loading the sdk and tracking if it is ready.
 */
export const SpotyLoader:FC<SpotyLoaderProps> = ({children}) => {
	const [ready,, set] = useBool(!!window.spoty?.ready); //!!forcing undefined to false
	useEffect(()=>{
		if (window.spoty !== undefined){
			return; //this has already happened
		} 
		window.spoty = { ready: false };
		scripter("https://sdk.scdn.co/spotify-player.js", "spoty-player");
		window.onSpotifyWebPlaybackSDKReady = () => {
			window.spoty!.ready = true;
			set(true);
		}
	}, [set]);

	//Now all interaction is promised to be while the sdk is ready.
	return ready ? (<>{children}</>):null;
};