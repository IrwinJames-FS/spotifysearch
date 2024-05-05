import { FC } from "react";
import { ShowItem } from "./types";
import { Clx, T } from "./common.ui";
import { DialogContent, Stack } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";
import { DetailHeader } from "./DetailHeader";
import { SpotifyButton } from "../SpotifyButton";

export const ShowDetail: FC<ShowItem> = ({images, name, description, episodes, external_urls}) => {
	
	return (<>
	<DetailHeader {...{images, name}}>
		<T>{name}</T>
		<Clx title="Description:">
			<T>{description}</T>
		</Clx>
	</DetailHeader>
	<DialogContent>
		<Stack sx={{py:3}} direction="row">
			<SpotifyButton external_urls={external_urls}/>
		</Stack>
		<EpisodeTable episodes={episodes.items}/>
	</DialogContent>
	</>)
}