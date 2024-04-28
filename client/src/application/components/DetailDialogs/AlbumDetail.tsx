import { FC, useCallback } from "react";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { AlbumItem } from "./types";
import { Add, PlayArrow } from "@mui/icons-material";
import { addToQueue, playIt } from "../../utils/api";
import { TconButton } from "../TconButton";
import { PlayButton } from "../PlayButton";
import { DetailHeader } from "./DetailHeader";

export const AlbumDetail: FC<AlbumItem> = ({name, images, total_tracks, id, tracks, device_id, uri,  ...rest}) => {
	const enqueue = useCallback(()=>{
		addToQueue(uri, device_id);
	}, [uri, device_id])
	return (<>
	<DetailHeader {...{name, images}}>
		<T>{name}</T>
		<T>{total_tracks} Tracks</T>
		<Fx row>
			<PlayButton contextUri={uri}/>
		</Fx>
	</DetailHeader>
	<TrackTable tracks={tracks.items} context={uri} length={total_tracks}/>
	</>)
}