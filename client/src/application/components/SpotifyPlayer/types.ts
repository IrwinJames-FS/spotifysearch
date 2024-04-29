import { TrackResult } from "../common.types"

export type SpotifyPlayerController = SpotifyPlayerContextState & SpotifyPlayerContextMethods
export type SpotifyPlayerContextState = {
	sdkReady: boolean,
	device_id?: string,
	status: boolean,
	player?: Spotify.Player
	playerState?: Spotify.PlaybackState
	queue?: SpotifyQueue
}

export type SpotifyPlayerContextMethods = {
	setToken: (token: string)=>void
	updateQueue: ()=>void
}

export type SpotifyQueue = {
	currently_playing: TrackResult
	queue: TrackResult[]
}