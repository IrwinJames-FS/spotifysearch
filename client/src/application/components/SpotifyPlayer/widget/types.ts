export type WidgetProps = {
	state?: Spotify.PlaybackState
}

export type WidgetPlayerProps = {
	state: Spotify.PlaybackState
	player: Spotify.Player
}

export type WidgetQueueDelegate = {
	toggleQueue: VoidFunction
}