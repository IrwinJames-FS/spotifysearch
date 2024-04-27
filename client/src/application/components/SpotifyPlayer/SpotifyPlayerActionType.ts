//The typescript enums seem extraneous so I am just going to create a type and define each of its values 

import { SpotifyQueue } from "./types";

//using non colliding bits
export type SpotifyStateActionType = 0x01 | 0x02 | 0x04 | 0x08 | 0x10 | 0x20;

export const SetSDKReady: SpotifyStateActionType     = 0x01;
export const SetPlayerStatus: SpotifyStateActionType = 0x02;
export const SetPlayer: SpotifyStateActionType       = 0x04;
export const SetPlayerState: SpotifyStateActionType  = 0x08;
export const SetDeviceId: SpotifyStateActionType     = 0x10;
export const SetQueue: SpotifyStateActionType        = 0x20;

export type ActionState = {type: SpotifyStateActionType };


export type SDKReadyAction = {type: 0x01};
export type PlayerStatusAction = {type: 0x02, status: boolean, device_id: string};
export type PlayerAction = {type: 0x04, player?: Spotify.Player};
export type PlayerStateAction = {type: 0x08, playerState?: Spotify.PlaybackState};
export type DeviceIdAction = {type: 0x10, device_id?: string};
export type QueueAction = {type: 0x20, queue: SpotifyQueue}


export type ReducerAction = SDKReadyAction | PlayerStatusAction | PlayerAction | PlayerStateAction | DeviceIdAction | QueueAction;