import { FC } from "react";
import { ShowItem } from "./types";
import { DetailsList, Image, T, Title } from "./common.ui";
import { Stack } from "@mui/material";

export const ShowDetail: FC<ShowItem> = ({images, name, description}) => {
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
	</>)
}