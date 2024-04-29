import { FC } from "react";
import { ShowItem } from "./types";
import { Clx, DetailsList, Image, T, Title } from "./common.ui";
import { DialogContent, Stack } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";
import { DetailHeader } from "./DetailHeader";

export const ShowDetail: FC<ShowItem> = ({images, name, description, episodes, ...rest}) => {
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