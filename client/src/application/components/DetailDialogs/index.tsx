import { FC } from "react";
import { AlbumItem, ArtistItem, AudiobookItem, DetailsState, EpisodeItem, PlaylistItem, ShowItem, TrackItem } from "./types";
import { TrackDetail } from "./TrackDetail";
import { ItemDetail } from "./ItemDetail";
import { PlaylistDetail } from "./PlaylistDetail";
import { EpisodeDetails } from "./EpisodeDetails";
import { AlbumDetail } from "./AlbumDetail";
import { AudiobookDetail } from "./AudiobookDetail";
import { ShowDetail } from "./ShowDetail";
import { ArtistDetail } from "./ArtistDetail";


export const Detail: FC<{result?: DetailsState}> = ({result}) => {
	if(!result) return null;
	switch (result.type) {
		case 'artist': return <ArtistDetail {...result as ArtistItem}/>
		case 'audiobook': return <AudiobookDetail {...result as AudiobookItem}/>
		case 'album': return <AlbumDetail {...result as AlbumItem}/>
		case 'episode': return <EpisodeDetails {...result as EpisodeItem}/>
		case 'playlist': return <PlaylistDetail {...result as PlaylistItem}/>
		case 'show': return <ShowDetail {...result as ShowItem}/>
		case 'track': return <TrackDetail {...result as TrackItem}/>
		default: return <ItemDetail {...result}/>
	}
}