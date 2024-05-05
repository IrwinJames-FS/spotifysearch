import { FC } from "react";
import { ShowItem } from "./types";
import { Clx, T } from "./common.ui";
import { DialogContent } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";
import { DetailHeader } from "./DetailHeader";

export const ShowDetail: FC<ShowItem> = ({images, name, description, episodes}) => {
	
	return (<>
	<DetailHeader {...{images, name}}>
		<T>{name}</T>
		<Clx title="Description:">
			<T>{description}</T>
		</Clx>
	</DetailHeader>
	<DialogContent>
		<EpisodeTable episodes={episodes.items}/>
	</DialogContent>
	</>)
}