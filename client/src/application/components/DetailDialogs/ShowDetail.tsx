import { FC } from "react";
import { ShowItem } from "./types";
import { DetailsList, Image, T, Title } from "./common.ui";
import { Stack } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";

export const ShowDetail: FC<ShowItem> = ({images, name, description, episodes, ...rest}) => {
	console.log(rest)
	return (<>
	<Title>
		<Image {...{images, size: 'lg', props: {}}}/>
		<DetailsList>
			<T>{name}</T>
			<T sx={{flexShrink: 1, overflowY: 'scroll'}}>{description}</T>
		</DetailsList>
	</Title>
	<Stack>
		
	</Stack>
	<EpisodeTable episodes={episodes.items}/>
	</>)
}