import { FC, useCallback } from "react";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { AlbumItem } from "./types";
import { Add, PlayArrow } from "@mui/icons-material";
import { addToQueue, playIt } from "../../utils/api";
import { TconButton } from "../TconButton";

export const AlbumDetail: FC<AlbumItem> = ({name, images, total_tracks, id, tracks, device_id, uri,  ...rest}) => {
	const playNow = useCallback(()=>{
		playIt(device_id, {
			context_uri: uri
		})
	}, [uri, device_id]);

	const enqueue = useCallback(()=>{
		addToQueue(uri, device_id);
	}, [uri, device_id])
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T>{total_tracks} Tracks</T>
			<Fx row>
				<TconButton title="Play Now" onClick={playNow}><PlayArrow/></TconButton>
				<TconButton title="Add to Queue" onClick={enqueue}><Add/></TconButton>
			</Fx>
		</DetailsList>
	</Title>
	<TrackTable tracks={tracks.items} context={uri} length={total_tracks} device_id={device_id}/>
	</>)
}