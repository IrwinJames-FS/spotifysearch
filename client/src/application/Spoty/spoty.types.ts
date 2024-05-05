import { ReactNode } from "react"
import { CurrentlyPlayingType, Episode, ExternalUrls, Queue, ResultType, Track } from "./spoty.record.types"
import { Requester } from "./utils/spax";

export type SpotyContext = {
	stateLoading: boolean
	stateError?: Error
	playerError?: Error
	state?: SpotyPlayerState
	product?: 'free'|'premium'
	queue?:Queue
} & SpotyMethods

export type SpotyMethods = {
	refreshState: VoidFunction
	togglePlay: ()=>Promise<void>
	seek:(position_ms: number)=>Promise<void>
	skipNext: ()=>Promise<void>
	skipPrev: ()=>Promise<void>
	play: (args?: PlayArgs)=>Promise<void>
	pause: ()=>Promise<void>
}

type PlayOffset = {
	uri:string
} | {
	position?:number
}
export type PlayArgs = {
	context_uri?: string,
	uris?: string[],
	offset?:PlayOffset
	position_ms?: number
}
/**
 * The top level props of the Spoty component
 */
export type SpotyProps = {
	config: SpotyConfig
	children?: ReactNode
}

export type DeviceData = {device_id:string}
export type SpotyEndpoints = Record<string, Requester> 


export type SpotyConfig = {
	product?: 'free' | 'premium'
	getToken: ()=>Promise<string>
	playback?: string
	base?: string
	pollInterval?: number
	debounceMs?: number
	endpoints?: SpotyEndpoints
}

export type SpotyOptions = {
	
}

export type SpotyPlayerState = {
	device: SpotyDevice
	repeat_state: SpotyRepeatState
	shuffle_state: boolean
	context?: SpotyPlayerStateContext
	timestamp: number
	progress_ms: number
	is_playing: boolean
	item: Track | Episode
	currently_playing_type: CurrentlyPlayingType
	actions: SpotyPlayerStateActions & {disallows: SpotyPlayerStateActions}
}

export type SpotyDevice = {
	id?: string
	is_active: boolean
	is_private_session: boolean
	is_restricted: boolean
	name: string
	type: string
	volume_percen?: number
	supports_volume: boolean
}

export type SpotyPlayerStateContext = {
	type: ResultType
	href: string
	external_urls: ExternalUrls
	uri: string
	
}

export type SpotyRepeatState = 'off' | 'track' | 'context'

export type SpotyPlayerStateActions = Partial<{
	interrupting_playback: boolean
	pausing: boolean
	resuming: boolean
	seeking: boolean
	skipping_next: boolean
	skipping_prev: boolean
	toggling_repeat_context: boolean
	toggling_shuffle: boolean
	toggling_repeat_track: boolean
	transferring_playback: boolean
}>

