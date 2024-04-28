import { EpisodeResult, TrackResult } from "../../common.types";

export const getParentName = (item: TrackResult | EpisodeResult) => {
	switch(item.type) {
		case 'track': return (item as TrackResult).album.name;
		case 'episode': return (item as EpisodeResult).show?.name;
	}
}