import { ReactNode } from "react"

export type ParentElement = {
	children?: ReactNode
}

export type ResultType = 'album' | 'artist' | 'audiobook' | 'playlist' | 'show' | 'track' | 'episode'
export type SearchResult = {
	albums: SearchResultGroup<AlbumResult>
	artists: SearchResultGroup<ArtistResult>
	audiobooks: SearchResultGroup<AudioBookResult>
	episodes: SearchResultGroup<EpisodeResult>
	playlists: SearchResultGroup<PlaylistResult>
	shows: SearchResultGroup<ShowResult>
	tracks: SearchResultGroup<TrackResult>
}

export type SearchResultGroup<T> = {
	href: string,
	items: T[]
	limit: number
	next?: string
	offset: 0
	previous?: string
	total: number
}

export type ResultItem = {
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	type: ResultType
	uri: string
	images?: ImageResult[]
}

export type AutoItem = AlbumResult | ArtistResult | AudioBookResult | EpisodeResult | PlaylistResult | ShowResult | TrackResult;

export type AlbumResult = ResultItem & {
	type: 'album'
	album_type: string
	available_markets: string[]
	release_date: string
	total_tracks: number
	artists: ArtistResult[]
}

export type HydradedAlbumResult = AlbumResult & {
	tracks: SearchResultGroup<TrackResultLite>
}



export type ArtistResult =ResultItem & {
	followers: FollowerResult
	genres: string[]
	popularity: number
	type: 'artist'
}

export type AudioBookResult = ResultItem & {
	authors: AuthorResult[]
	available_markets: string[]
	copyrights: string[]
	description: string
	edition: string
	explicit: boolean
	html_description: string
	is_externally_hosted: boolean
	languages: string[]
	media_type: string
	narrators: AuthorResult[]
	publisher: string
	total_chapters: number
	type: 'audiobook'
}

export type EpisodeResult = ResultItem & {
	audio_preview_url: string
	description: string
	duration_ms: number
	explicit: boolean
	html_description: string
	is_externally_hosted: boolean
	is_playable: boolean
	language: string
	languages: string[]
	release_date: string,
	show?: ShowResult
}

export type PlaylistResult = ResultItem & {
	collaborative: boolean
	description: string
	owner: OwnerResult
	primary_color?: string
	public?: string
	snapshot_id: string
	tracks: FollowerResult
	type: 'playlist'
}

export type ShowResult = ResultItem & {
	available_markets: string[]
	copyrights: string[]
	description: string
	explicit: boolean
	html_description: string
	is_externally_hosted: boolean
	languages: string[]
	media_type: string
	publisher: string
	total_episodes: number
	episodes: SearchResultGroup<EpisodeResult>
	type: 'show'
}
export type TrackResultLite = ResultItem & {
	available_markets: string[]
	artists: ArtistResult[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	is_local: boolean
	preview_url: string
	track_number:number
	type: 'track'
}
export type TrackResult = TrackResultLite & {
	album: AlbumResult
	external_ids: ExternalIds
	popularity: number
}

export type ExternalIds = {
	isrc: string
}

export type OwnerResult = {
	display_name: string
	external_urls: ExternalUrls
	href: string
	id: string
	type: string
	uri: string
}
export type ExternalUrls = Record<string, string>

export type FollowerResult = {
	href?: string
	total: number
}

export type ImageResult = {
	height: number
	width: number
	url: string
}

export type AuthorResult = {
	name: string
}

