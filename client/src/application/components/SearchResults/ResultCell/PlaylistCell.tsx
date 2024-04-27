import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { PlaylistResult } from "../../common.types";
import { GenericResultCell } from "./types";
import { DetailCell } from "./DetailCell";


export const PlaylistCell: GenericResultCell<PlaylistResult> = ({item}) => {
	return (<DetailCell {...{item}}>
		<CaptionArea justifyContent="center">
			<NameComponent name={item.name}/>
			<CaptionComponent title="Tracks" value={item.tracks.total}/>
		</CaptionArea>
	</DetailCell>)
}