import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { AudioBookResult } from "../../common.types";
import { DetailCell } from "./DetailCell";
import { GenericResultCell } from "./types";

export const AudiobookCell: GenericResultCell<AudioBookResult> = ({item}) => {
	return (<DetailCell {...{item}}>
		<CaptionArea justifyContent="center">
			<NameComponent name={item.name}/>
			<CaptionComponent title="Chapters" value={item.total_chapters}/>
		</CaptionArea>
	</DetailCell>)
}