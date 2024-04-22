import { FC } from "react";
import { AlbumItem, AudiobookItem, DetailsState, EpisodeItem, PlaylistItem, ShowItem, TrackItem } from "./types";
import { TrackDetail } from "./TrackDetail";
import { ItemDetail } from "./ItemDetail";
import { PlaylistDetail } from "./PlaylistDetail";
import { EpisodeDetails } from "./EpisodeDetails";
import { AlbumDetail } from "./AlbumDetail";
import { AudiobookDetail } from "./AudiobookDetail";
import { ShowDetail } from "./ShowDetail";


export const Detail: FC<{result?: DetailsState}> = ({result}) => {
	if(!result) return null;
	console.log(result.type);
	switch (result.type) {
		case 'audiobook': return <AudiobookDetail {...result as AudiobookItem}/>
		case 'album': return <AlbumDetail {...result as AlbumItem}/>
		case 'episode': return <EpisodeDetails {...result as EpisodeItem}/>
		case 'playlist': return <PlaylistDetail {...result as PlaylistItem}/>
		case 'show': return <ShowDetail {...result as ShowItem}/>
		case 'track': return <TrackDetail {...result as TrackItem}/>
		default: return <ItemDetail {...result}/>
	}
}