import { FC } from "react";
import { AudiobookItem } from "./types";
import { DetailsList, Image, T, Title } from "./common.ui";
import { Stack } from "@mui/material";

export const AudiobookDetail: FC<AudiobookItem> = ({images, name, authors, description, narrators, total_chapters, ...rest}) => {
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T><b>Author{authors.length > 1 ? 's':''}</b> {authors.map(a=>a.name).join(', ')}</T>
			<T><b>Narrator{narrators.length > 1 ? 's':''}</b> {narrators.map(n=>n.name).join(', ')}</T>
			<T><b>Chapters</b> {total_chapters}</T>
		</DetailsList>
	</Title>
	<Stack gap={1}>
		<T>{description}</T>
	</Stack>
	</>)
}