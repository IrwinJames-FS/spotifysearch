export type WidgetProps = {
	state?: Spotify.PlaybackState
	expanded?: boolean
}

export type WidgetPlayerProps = {
	state: Spotify.PlaybackState
	player: Spotify.Player,
	expanded?: boolean
}

export type WidgetDelegate = {
	toggleQueue: VoidFunction
	toggleExpanded: VoidFunction
}