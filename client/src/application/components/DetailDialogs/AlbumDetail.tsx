import { FC} from "react";
import { DetailsList, Image, T, Title } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { AlbumItem } from "./types";

export const AlbumDetail: FC<AlbumItem> = ({name, images, total_tracks, id, tracks, device_id,  ...rest}) => {
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T>{total_tracks} Tracks</T>
		</DetailsList>
	</Title>
	<TrackTable tracks={tracks.items} device_id={device_id}/>
	</>)
}