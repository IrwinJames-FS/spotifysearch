import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceData, SpotyConfig } from "../spoty.types";
import { PlayerAccountError, PlayerAuthError, PlayerInitError, PlayerPlaybackError } from "../errors";
import { Spax } from "../utils/spax";
import { dx } from "../../utils/dx";

type LocalPlayerState = {
	loading: boolean
	error?: Error
	player?: Spotify.Player
	device_id?: string
}

/**
 * This will be a lazy loading player
 * @returns 
 */
export const usePlayer = (ax: Spax, {getToken, product, debounceMs}: SpotyConfig, onStateChange: ()=>void):[boolean, Error | undefined, Spotify.Player | undefined, string | undefined, (cb:VoidFunction)=>void, (error: Error)=>void] => {
	const [{loading, error, player, device_id}, setPlayer] = useState<LocalPlayerState>({loading: false});
	const Cb = useRef<(id:string)=>void | undefined>();
	const getPlayer = useCallback((cb?:(id:string)=>void)=>{
		//preflight
		if(!product) return setPlayer({loading: false, error: new PlayerAccountError("You must be signed in to use this feature")});
		if(product === 'free') return setPlayer({loading: false, error: new PlayerAccountError("You must have a premium account or an open spotify tab playing from the same account")});
		Cb.current = cb;
		setPlayer({loading: true});
		const player = new Spotify.Player({
			name: 'Spotify Search',
			getOAuthToken: async (cb)=>{
				const token = await getToken();
				return cb(token);
			},
			enableMediaSession: true
		});
		window.spoty!.player = player
		setPlayer(s=>({...s, player}));
	},[setPlayer, product, getToken])

	const setError = useCallback((error:Error) => setPlayer({loading: false, error}), [setPlayer]);
	useEffect(()=>{
		if(product !== 'premium') return;
		getPlayer(async (id) => {
			await ax.put`/me/player`<void, {device_ids:string[]}>({device_ids:[id]});
		});
	}, [getPlayer, product, ax.put])
	
	//update the event
	useEffect(()=>{
		if(!player) return;
		const onReady = ({device_id}:DeviceData) => {
			setPlayer(s=>({...s, loading:false, device_id}));
			
			if(Cb.current) {
				const cb = Cb.current
				setTimeout(async ()=>{
					await cb(device_id)
					const pos = sessionStorage.getItem('playback-position');
					if(pos) {
						console.log("Loading pos", dx(parseInt(pos)), pos)
						player.seek(parseInt(pos));
						sessionStorage.removeItem('playback-position');
					}
				}, debounceMs ?? 5e2);
			}
			Cb.current = undefined;
		}
		const onNotReady = ({device_id}:DeviceData) => setPlayer(s=>({...s, loading:true, device_id}));
		const handleError: ErrorHandler = (Err)=>({message})=>setPlayer({loading: false, error: new Err(message)});
		const accountError = handleError(PlayerAccountError);
		//const autoplayError = handleError(PlayerAutoplayError);
		const authenticationError = handleError(PlayerAuthError);
		const initError = handleError(PlayerInitError);
		const playbackError = handleError(PlayerPlaybackError);
		const stateChange = ()=>{
			setTimeout(onStateChange, debounceMs ?? 5e2);
		}
		player.addListener('ready', onReady);
		player.addListener('not_ready', onNotReady);
		player.addListener('account_error', accountError);
		player.addListener('authentication_error', authenticationError);
		//player.addListener('autoplay_failed', autoplayError);
		player.addListener('initialization_error', initError);
		player.addListener('playback_error', playbackError);
		player.addListener('player_state_changed', stateChange);
		player.connect();
		//set event listeners
		return ()=>{
			//destroy event listeners
			player.removeListener('ready', onReady);
			player.removeListener('not_ready', onNotReady);
			player.removeListener('account_error', accountError);
			player.removeListener('authentication_error', authenticationError);
			player.removeListener('initialization_error', initError);
			player.removeListener('playback_error', playbackError);
			player.removeListener('player_state_changed', stateChange);
			player.disconnect()	
		}
	}, [onStateChange, player, setPlayer, debounceMs]);
	return [loading, error, player, device_id, getPlayer, setError];
}
type ErrMsg = {message: string};
type ErrConstructor<T> = new (message: string) => T;

type ErrorHandler = <T extends Error>(Err: ErrConstructor<T>)=>({message}:ErrMsg)=>void

