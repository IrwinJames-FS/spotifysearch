import { useCallback, useEffect, useRef, useState } from "react";
import { transfer } from "../utils/api";
import { scripter } from "../utils/scripters";

export type PlayImage = Spotify.Image & {alt?:string}
export type PlayerState = {
	track_name: string
	album_name: string
	artist_name: string
	img?: PlayImage
	paused: boolean
	duration: number
	position: number
	timestamp: number
	id: string | null
	type: string
}
export type PlayerErrorType = PlayerAccountError | PlayerAuthError | PlayerInitError | undefined
export type ErrConstructor<T> = new (message?: string) => T

const convertState = ({paused, duration, position, timestamp, ...state}: Spotify.PlaybackState) : PlayerState => {
	console.log(state);
	const images = state.track_window.current_track.album.images ?? []
	const img = images.length ? (images.find(i=>i.size==='SMALL') ?? images[0]):undefined;
	const track_name = state.track_window.current_track.name;
	const album_name = state.track_window.current_track.album.name;
	const artist_name = state.track_window.current_track.artists.map(a=>a.name).join(', ');
	const id = state.track_window.current_track.id;
	const type = state.track_window.current_track.type;
	if (img) {(img as PlayImage).alt = `${track_name} | ${album_name}`;}
	return {
		paused, duration, position, timestamp, track_name, album_name, img, artist_name, id, type
	}
}
type Err = {
	message:string
}
export const usePlayerController = (token?: string):[string | undefined, PlayerState | undefined, PlayerErrorType, Spotify.Player | undefined] => {
	const [player, setPlayer] = useState<Spotify.Player | undefined>();
	const isLoading = useRef(false);
	const [device_id, setDeviceId] = useState<string | undefined>()
	const [state, setState] = useState<PlayerState | undefined>();
	const [error, setError] = useState<PlayerErrorType>();

	//Just a generic manner of differenciating errors

	//Error handlers
	const onInitError = useCallback(({message}:Err)=>setError(new PlayerInitError(message)), [setError]);
	const onAuthError = useCallback(({message}:Err)=>setError(new PlayerAuthError(message)), [setError]);
	const onAccountError = useCallback(({message}:Err)=>setError(new PlayerAccountError(message)), [setError]);
	const onPlaybackError = useCallback(({message}:Err)=>setError(new PlayerPlaybackError(message)), [setError]);

	//This should update as the user status changes
	const getOAuthToken = useCallback((cb: (token:string)=>void)=>cb(token!), [token]);

	//Store the device_id and cache it for later comparison
	const onReady = useCallback(({device_id}: {device_id:string})=>{
		let item = sessionStorage.getItem('spotify-device-id');
		if(item && item !== device_id) {
			console.log("item id", item, device_id);
			transfer(device_id);
		}
		sessionStorage.setItem('spotify-device-id', device_id)
		setDeviceId(device_id);
		isLoading.current = false;
	}, [setDeviceId]);

	//Handle when players state changes
	const onStateChange = useCallback((state: Spotify.PlaybackState) => {
		if(!state || !state.track_window.current_track) return;
		const c = convertState(state);
		setState(c);
	}, [setState]);

	//The callback the window will call
	const onSpotifyReady = useCallback(() => {
		
		setPlayer(p=>{
			if(p) p.disconnect();
			return new window.Spotify.Player({
				name: 'snymaxspotifysearch',
				getOAuthToken,
				volume: 0.5
			})
		});
	}, [setPlayer, getOAuthToken]);
	
	useEffect(()=>{
		if(isLoading.current) return; //dont want to run this if loading... loading is a ref because UI is not reliant on this variable nor do we want to redraw when this value changes
		if(device_id) return; //If we already have a device id we want to halt. This can happen when a refresh token updates the OAuth callback
		if(!token) return; //No reason to add the script if there is no reason to add the script if no token
		isLoading.current = true //Now we are loading if another use effect is triggered it should be halted 
		scripter("https://sdk.scdn.co/spotify-player.js", "spotify-player");
		window.onSpotifyWebPlaybackSDKReady = onSpotifyReady;
	}, [onSpotifyReady, token, device_id]);

	useEffect(()=>{
		if(!player) return;
		player.addListener('ready', onReady);
		player.addListener('initialization_error', onInitError);
		player.addListener('authentication_error', onAuthError);
		player.addListener('account_error', onAccountError);
		player.addListener('playback_error', onPlaybackError);
		player.addListener('player_state_changed', onStateChange);
		player.connect();

		//adding a deconstructor breaks the player I will need to look into this further
	}, [player, onReady, onInitError, onAuthError, onAccountError, onPlaybackError, onStateChange]);

	return [device_id, state, error, player];
}

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