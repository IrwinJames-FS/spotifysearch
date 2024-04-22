import { ArtistResult, AudioBookResult, EpisodeResult, HydradedAlbumResult, PlaylistResult, ResultItem, ShowResult, TrackResult } from "../common.types";

export type Devid = {device_id:string}
export type DetailsState = ResultItem & Devid;
export type TrackItem = TrackResult & Devid;
export type PlaylistItem = PlaylistResult & Devid;
export type EpisodeItem = EpisodeResult & Devid;
export type AlbumItem = HydradedAlbumResult & Devid;
export type AudiobookItem = AudioBookResult & Devid;
export type ShowItem = ShowResult & Devid;
export type ArtistItem = ArtistResult & Devid;