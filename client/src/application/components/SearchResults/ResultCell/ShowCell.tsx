import { ShowResult } from "../../common.types";
import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { DetailCell } from "./DetailCell";
import { GenericResultCell } from "./types";

export const ShowCell: GenericResultCell<ShowResult> = ({item}) => {
	return (<DetailCell {...{item}}>
		<CaptionArea justifyContent="center">
			<NameComponent name={item.name}/>
			<CaptionComponent title="Episodes" value={item.total_episodes}/>
		</CaptionArea>
	</DetailCell>)
}