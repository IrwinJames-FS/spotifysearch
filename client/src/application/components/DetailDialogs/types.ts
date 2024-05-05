import { ArtistResult, AudioBookResult, EpisodeResult, HydradedAlbumResult, PlaylistResult, ResultItem, ShowResult, TrackResult } from "../common.types";

export type Devid = {device_id:string}
export type DetailsState = ResultItem
export type TrackItem = TrackResult
export type PlaylistItem = PlaylistResult
export type EpisodeItem = EpisodeResult
export type AlbumItem = HydradedAlbumResult
export type AudiobookItem = AudioBookResult
export type ShowItem = ShowResult
export type ArtistItem = ArtistResult