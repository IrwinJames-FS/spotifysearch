import { FC} from "react";
import { DetailsList, Image, T, Title } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { HydradedAlbumResult } from "../common.types";

export const AlbumDetail: FC<HydradedAlbumResult> = ({name, images, total_tracks, id, tracks,  ...rest}) => {
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T>{total_tracks} Tracks</T>
		</DetailsList>
	</Title>
	<TrackTable tracks={tracks.items}/>
	</>)
}