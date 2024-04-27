import { CaptionArea, CaptionComponent, NameComponent } from "../common";
import { ArtistResult } from "../../common.types";
import { commafy } from "../../../utils/strings";
import { GenericResultCell } from "./types";
import { DetailCell } from "./DetailCell";

export const ArtistCell: GenericResultCell<ArtistResult> = ({item}) => (<DetailCell {...{item}}>
	<CaptionArea justifyContent="center">
		<NameComponent name={item.name}/>
		<CaptionComponent title="Popularity" value={commafy(`${item.popularity}`)}/>
	</CaptionArea>
</DetailCell>);