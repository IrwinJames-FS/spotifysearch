import { FC } from "react";
import { AudiobookItem } from "./types";
import { Clx, CopyRight, Fx, Markets, T } from "./common.ui";
import { DialogContent, Stack } from "@mui/material";
import { ChapterTable } from "./ChapterTable";
import { redate } from "../../utils/strings";
import { DetailHeader } from "./DetailHeader";
import { PlayButton } from "../PlayButton";
import { useSpoty } from "../../Spoty/SpotyContext";
import { SpotifyButton } from "../SpotifyButton";

export const AudiobookDetail: FC<AudiobookItem> = ({images, name, authors, description, narrators, total_chapters, available_markets, chapters, uri, copyrights, external_urls }) => {
	const { isLocal } = useSpoty();
	return (<>
	<DetailHeader {...{images,name}}>
		{isLocal && <Fx row>
			<PlayButton contextUri={uri}/>
		</Fx>}
		<T>{name} {redate(chapters.items[0].release_date)}</T>
		<T><b>Author{authors.length > 1 ? 's':''}</b> {authors.map(a=>a.name).join(', ')}</T>
		<T><b>Narrator{narrators.length > 1 ? 's':''}</b> {narrators.map(n=>n.name).join(', ')}</T>
		<T><b>Chapters</b> {total_chapters}</T>
		<Clx title="Markets:">
			<Markets markets={available_markets}/>
		</Clx>
		<Clx title="Copyrights:">
			<CopyRight copyrights={copyrights}/>
		</Clx>
		<Clx title="Description:">
			<T>{description}</T>
		</Clx>
	</DetailHeader>
	<DialogContent>
		<Stack sx={{py:3}} direction="row">
			<SpotifyButton external_urls={external_urls}/>
		</Stack>
		<ChapterTable chapters={chapters.items} context={uri} length={total_chapters}/>
	</DialogContent>
	</>)
}