import { FC, memo, useCallback, useEffect, useState } from "react";
import { SpotifyPlayerContext } from "./SpotifyPlayerContext";
import { ParentElement } from "../common.types";
import { useSpotifyPlayerState } from "./useSpotifyPlayerState";
import { scripter } from "../../utils/scripters";
import { Outlet } from "react-router-dom";
import { getQueue, transfer } from "../../utils/api";
import { Alert, AlertProps, ListItemText, Snackbar, SnackbarProps } from "@mui/material";
import { Error as MuiError } from "@mui/icons-material";


declare global {
	interface Window { spotifyPlayer?: Spotify.Player }
}
type Err = {
	message:string
}
/**
 * This method is simply responsible for housing a player and its state and ensuring it never rerenders the script loading but persists the same player across the entire life-cycle
 * 
 * This method is memoized with a boolean set to a constant true meaning this frame should never rerender. This is the closes method I can find to replicate static html with react.
 * That being said children components should still react to state changes from this wrapper.
 * @param param0 
 * @returns 
 */
export const SpotifyPlayer: FC<ParentElement> = memo(({children}) => {
	scripter("https://sdk.scdn.co/spotify-player.js", "spotify-player");
	const [{sdkReady, status, device_id, player, playerState, queue}, setSDKReady,  setStatus, setPlayer, setPlayerState, setQueue, setDeviceId] = useSpotifyPlayerState();
	const [error, setError] = useState<Error | undefined>();
	const [token, setToken] = useState<string | undefined>();
	const [toastProps, setToast] = useState<Omit<ToastProps, "onClose"> | undefined>();
	
	const closeToast = useCallback(()=>setToast(undefined), [setToast])

	const onReady = useCallback(async ({device_id}:{device_id:string})=>{
		let item = sessionStorage.getItem('spotify-device-id');
		if(item && item !== device_id) {
			try {
				await transfer(device_id);
			} catch (error) {
				console.log(error);
				setError(new TransferPlaybackError("Failed to transfer playback"))
			}
			
		}
		sessionStorage.setItem('spotify-device-id', device_id)
		setStatus(true, device_id)
	},[setStatus]);
	const onNotReady = useCallback(({device_id}: {device_id:string})=>{
		setStatus(true, device_id);
	}, [setStatus])
	const onStateChange = useCallback( async (state:Spotify.PlaybackState)=>{
		try {
			setPlayerState(state)
			const queue = await getQueue();
			setQueue(queue);
		} catch (error) {
			setToast({open: true, autoHideDuration: 1e4, icon: <MuiError/>, primary:"Player Error", secondary: (error as Error).message})
		}
	}, [setPlayerState, setQueue])
	//Error handlers
	const onInitError = useCallback(({message}:Err)=>{
		console.log("Init Error");
		setError(new PlayerInitError(message))
	}, [setError]);
	const onAuthError = useCallback(({message}:Err)=>{
		console.log("Auth Error");
		setError(new PlayerAuthError(message))
	}, [setError]);
	const onAccountError = useCallback(({message}:Err)=>{
		console.log("Account Error");
		setError(new PlayerAccountError(message))
	}, [setError]);
	const onPlaybackError = useCallback(({message}:Err)=>{
		console.log("Playback Error")
		setError(new PlayerPlaybackError(message));
		setToast({open: true, autoHideDuration: 3e3, icon: <MuiError/>, primary: "Playback Error", secondary: message})
	}, [setError]);
	//Watch for spotifies ready status
	useEffect(()=>{
		window.onSpotifyWebPlaybackSDKReady = () => {
			setSDKReady();
		}
	}, [setSDKReady]);

	useEffect(()=>{
		if(!token) return;
		if(!sdkReady) return;
		
		const player = window.spotifyPlayer ?? createPlayer(cb=>cb(token ?? ''));
		player.addListener('ready', onReady);
		player.addListener('not_ready', onNotReady)
		player.addListener('initialization_error', onInitError);
		player.addListener('authentication_error', onAuthError);
		player.addListener('account_error', onAccountError);
		player.addListener('playback_error', onPlaybackError);
		player.addListener('player_state_changed', onStateChange);
		player.connect();
		setPlayer(player);
		if(window.spotifyPlayer) {
			player._options.getOAuthToken = cb=>cb(token ?? ''); //update auth method
		}
		window.spotifyPlayer = player;
		return () => {
			player.removeListener('ready', onReady);
			player.removeListener('not_ready', onNotReady);
			player.removeListener('initialization_error', onInitError);
			player.removeListener('authentication_error', onAuthError);
			player.removeListener('playback_error', onPlaybackError);
			player.removeListener('player_state_changed', onStateChange);
		}
	}, [token, sdkReady, setPlayer, onReady, onNotReady, onInitError, onAuthError, onAccountError, onPlaybackError, onStateChange]);

	return (<SpotifyPlayerContext.Provider value={{sdkReady, status, device_id, player, playerState, queue, setToken}}>
		<Outlet/>
		<Toast {...toastProps}/>
	</SpotifyPlayerContext.Provider>);
}, ()=>true);
SpotifyPlayer.displayName = 'SpotifyPlayer';

type ToastProps = SnackbarProps & AlertProps & {primary?: string, secondary?:string }
const Toast: FC<ToastProps> = ({primary, secondary, severity, icon, ...props}) => {
	return (<Snackbar {...props}>
		<Alert {...{severity, icon}}>
			<ListItemText {...{primary, secondary}}/>
		</Alert>
	</Snackbar>);
}
//Because I do not want this method tied directly to the render loop its better to define it outside the component
type AuthTokener = (token: string)=>void
const createPlayer = (getOAuthToken: (cb: AuthTokener)=>void ) => new Spotify.Player({
	name: 'snymaxspotifysearch',
	getOAuthToken,
	volume: 0.5
});

export class PlayerInitError extends Error {
	constructor(message: string = "Player Init Error"){
		super(message)
		this.name = "PlayerInitError";
	}
}

export class PlayerAuthError extends Error {
	constructor(message: string = "Player Authentication Error"){
		super(message)
		this.name = "PlayerAuthError";
	}
}

export class PlayerAccountError extends Error {
	constructor(message: string = "Player Account Error") {
		super(message);
		this.name = "PlayerAccountError";
	}
}

export class PlayerPlaybackError extends Error {
	constructor(message: string = "Playback Error") {
		super(message);
		this.name = "PlayerPlaybackError"
	}
}

export class TransferPlaybackError extends Error {
	constructor(message: string = "TransferPlaybackError") {
		super(message);
		this.name = "TransferPlaybackError";
	}
}