import { FC, useCallback } from "react";
import { Fx, T } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { AlbumItem } from "./types";
import { addToQueue } from "../../utils/api";
import { PlayButton } from "../PlayButton";
import { DetailHeader } from "./DetailHeader";
import { EnqueueButton } from "../EnqueueButton";

export const AlbumDetail: FC<AlbumItem> = ({name, images, total_tracks, id, tracks, device_id, uri, artists,  ...rest}) => {
	const enqueue = useCallback(()=>{
		addToQueue(uri, device_id);
	}, [uri, device_id]);
	console.log('Album', rest);
	return (<>
	<DetailHeader {...{name, images}}>
		<Fx row>
			<PlayButton contextUri={uri}/>
			<EnqueueButton uris={tracks.items.map(t=>t.uri)}/>
		</Fx>
		<T>{name} - {artists.map(a=>a.name).join(', ')}</T>
		<T>{total_tracks} Tracks</T>
	</DetailHeader>
	<TrackTable tracks={tracks.items} context={uri} length={total_tracks}/>
	</>)
}