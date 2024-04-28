import { FC, useCallback } from "react";
import { EpisodeItem } from "./types";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { dx } from "../../utils/dx";
import { PlayButton } from "../PlayButton";
import { useAsync } from "../../hooks";
import { ShowResult } from "../common.types";
import { getItem } from "../../utils/api";
import { DialogContent } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";

export const EpisodeDetails: FC<EpisodeItem> = ({name, description, duration_ms, images, uri, show, ...rest}) => {
	const [loading, error, hydratedShow] = useAsync<ShowResult>(useCallback(async ()=>{
		if(!show?.id) return;
		try {
			const s = await getItem('show', show.id);
			console.log(s);
			return s
		} catch (error) {
			console.log(error);
		}
	}, [show?.id]))
	console.log(show, rest)
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T>{description}</T>
			<T>{dx(duration_ms*10)}</T>
			<Fx row>
				<PlayButton contextUri={show!.uri} offset={{uri}}/>
			</Fx>
		</DetailsList>
	</Title>
	<DialogContent>
		<EpisodeTable episodes={hydratedShow?.episodes.items} length={show?.total_episodes} context={show?.uri}/>
	</DialogContent>
	</>)
}