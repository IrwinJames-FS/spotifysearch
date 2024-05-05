export type ResultType = 'album' | 'artist' | 'audiobook' | 'playlist' | 'show' | 'track' | 'episode'
export type SpotDatePrecision = 'year' | 'month' | 'day'
export type AlbumType = 'album' | 'single' | 'compilation'
export type Result = {
	type: ResultType
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	uri: string
}

export type Released = {
	release_date: string
	release_date_precision: SpotDatePrecision
}

export type Album = {
	album_type: AlbumType
	total_tracks: number
	available_markets: string[]
	images: SpotifyImages
	restrictions?: Restriction
	type: 'album'
	artists: SimpleArtist[]
} & Released & Result


export type SimpleArtist = {
	type: 'artist'
} & Result;

export type Artist = {
	genres: string[]
	followers: Followers
	images: SpotifyImages
	popularity: number
	type: 'artist'
} & Result;

export type Track = {
	album: Album
	artists: Artist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: ExternalIds
	is_playable: boolean
	restrictions: Restriction
	popularity: number
	preview_url?: string
	track_number: number
	is_local: boolean
	type: 'track'
} & Result

export type Show = {
	available_markets: string[]
	copyrights: Copyrights
	description: string
	html_description: string
	explicit: boolean
	images: SpotifyImages
	is_externally_hosted: boolean
	languages: string[]
	media_type: string
	publisher: string
	type: 'show'
	total_episodes: number
} & Result

export type Episode = {
	audio_preview_url: string | null
	description: string
	html_description: string
	duration_ms: number
	explicit: boolean
	images: SpotifyImages
	is_externally_hosted: boolean
	is_playable: boolean
	languages: string[]
	resume_point: ResumePoint
	type: 'episode'
	restrictions?: Restriction
	show: Show
} & Released & Result

export type ExternalUrls = {
	spotify: string
}

export type ExternalIds = {
	isrc: string
	ean: string
	upc: string
}
export type Restriction = {
	reason: RestrictionReasons
}[]

export type RestrictionReasons = 'market' | 'product' | 'explicit';

export type Followers = {
	href?: string
	total: number
}

export type SpotifyImages = Spotify.Image[]

export type ResumePoint = {
	fully_played: boolean
	resume_position_ms: number
}

export type Copyrights = {
	text: string
	type: string
}[]

export type CurrentlyPlayingType = 'episode' | 'track' | 'ad' | 'unknown'

export type Queue = {
	currently_playing: Track
	queue: Track[]
}