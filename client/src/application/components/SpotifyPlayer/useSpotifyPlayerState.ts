/*
 * In an attempt to avoid the spagetti of mass states or using a bunch of callback methods this seems like a good opportunity to try to roll up a nice reducer
 */

import { useCallback, useReducer } from "react"
import { SpotifyPlayerContextState, SpotifyQueue } from "./types"
import { SetSDKReady, SetPlayerStatus, SetPlayer, ReducerAction, PlayerStatusAction, PlayerAction, SetPlayerState, PlayerStateAction, SetDeviceId, DeviceIdAction, ActionState, SetQueue, QueueAction } from "./SpotifyPlayerActionType";

//So its a bit of overkill but this could be built out later... post mvp to allow for combination of multiple state actions by simple bitwise operations.

const reducer = (state: SpotifyPlayerContextState, {type, ...action}: ReducerAction): SpotifyPlayerContextState => {
	switch (type) {
		//this is the beginning of the lifecycle logically a player or info should not be populated.
		case SetSDKReady: return {sdkReady: true, status: false};
		//A player can change between online and offline status so it should preserve the rest of the state
		case SetPlayerStatus: return {...state, ...(action as PlayerStatusAction)};
		//Setting the player. Remember to check that the player is ready via status
		case SetPlayer: return {...state, player: (action as PlayerAction).player};
		//Update the player state
		case SetPlayerState: return {...state, playerState: (action as PlayerStateAction).playerState};
		//Update the device id
		case SetDeviceId: return {...state, device_id: (action as DeviceIdAction).device_id};
		//Update the queue
		case SetQueue: return {...state, queue: (action as QueueAction).queue}
		default: return state;
	}
	
}
export const useSpotifyPlayerState = ():[SpotifyPlayerContextState, ()=>void, (status: boolean, device_id: string)=>void, (player?: Spotify.Player)=>void, (playerState?: Spotify.PlaybackState)=>void, (queue: SpotifyQueue)=>void, (device_id?: string)=>void] => {
	const [state, reduce] = useReducer(reducer, {sdkReady: false, status: false}); //only two required maybe this should be one because optional has context in itself
	const setSDKReady = useCallback(()=>reduce({type: 0x01}), [reduce]);
	const setStatus = useCallback((status: boolean, device_id:string)=>reduce({type: 0x02, status, device_id}), [reduce]);
	const setPlayer = useCallback((player?: Spotify.Player)=>reduce({type: 0x04, player}), [reduce]);
	const setPlayerState = useCallback((playerState?: Spotify.PlaybackState) => reduce({type: 0x08, playerState}), [reduce]);
	const setDeviceId = useCallback((device_id?: string) => reduce({type: 0x10, device_id}), [reduce]);
	const setQueue = useCallback((queue: SpotifyQueue)=>reduce({type: 0x20, queue}), [reduce]);
	return [state, setSDKReady, setStatus, setPlayer, setPlayerState, setQueue, setDeviceId];
}