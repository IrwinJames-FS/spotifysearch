import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { EpisodeResult } from "../../common.types";
import { dx } from "../../../utils/dx";
import { GenericResultCell } from "./types";
import { DetailCell } from "./DetailCell";

export const EpisodeCell: GenericResultCell<EpisodeResult> = ({item}) => {
	return (<DetailCell {...{item}}>
		<CaptionArea justifyContent="center">
			<NameComponent name={item.name}/>
			<CaptionComponent title="Duration" value={dx((item as EpisodeResult).duration_ms)}/>
		</CaptionArea>
	</DetailCell>);
}