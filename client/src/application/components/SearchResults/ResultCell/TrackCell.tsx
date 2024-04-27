import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { GenericResultCell } from "./types";
import { DetailCell } from "./DetailCell";
import { TrackResult } from "../../common.types";

export const TrackCell: GenericResultCell<TrackResult> = ({item}) => (<DetailCell {...{item, images: item.album.images}}>
	<CaptionArea justifyContent="center">
		<NameComponent name={item.name}/>
		<CaptionComponent title="Track" value={`${item.track_number}/${item.album.total_tracks}`}/>
	</CaptionArea>
</DetailCell>);