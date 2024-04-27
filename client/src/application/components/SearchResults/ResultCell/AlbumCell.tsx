import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { AlbumResult } from "../../common.types";
import { DetailCell } from "./DetailCell";
import { GenericResultCell } from "./types";

export const AlbumCell: GenericResultCell<AlbumResult>  = ({item}) => {
	return (<DetailCell {...{item}}>
	<CaptionArea justifyContent="center">
		<NameComponent name={item.name}/>
		<CaptionComponent title="Tracks" value={item.total_tracks}/>
	</CaptionArea>
</DetailCell>);
}