import { FC, useCallback } from "react";
import { EpisodeItem } from "./types";
import { Clx, Fx, T } from "./common.ui";
import { dx } from "../../utils/dx";
import { PlayButton } from "../PlayButton";
import { useAsync } from "../../hooks";
import { ShowResult } from "../common.types";
import { getItem } from "../../utils/api";
import { DialogContent, Stack } from "@mui/material";
import { EpisodeTable } from "./EpisodeTable";
import { DetailHeader } from "./DetailHeader";
import { redate } from "../../utils/strings";
import { useSpoty } from "../../Spoty/SpotyContext";
import { SpotifyButton } from "../SpotifyButton";

export const EpisodeDetails: FC<EpisodeItem> = ({name, description, duration_ms, images, uri, show, release_date, external_urls }) => {
	const [,, hydratedShow] = useAsync<ShowResult>(useCallback(async ()=>{
		if(!show?.id) return;
		try {
			const s = await getItem('show', show.id);
			console.log(s);
			return s
		} catch (error) {
			console.log(error);
		}
	}, [show?.id]));
	const { isLocal } = useSpoty();
	return (<>
	<DetailHeader {...{images, name}}>
		{isLocal && <Fx row>
			<PlayButton contextUri={show!.uri} offset={{uri}}/>
		</Fx>}
		<T>{name} - {redate(release_date)}</T>
		<T>{dx(duration_ms)}</T>
		<Clx title="Description:">
			<T>{description}</T>
		</Clx>
	</DetailHeader>
	<DialogContent>
		<Stack sx={{py:3}} direction="row">
			<SpotifyButton external_urls={external_urls}/>
		</Stack>
		<EpisodeTable episodes={hydratedShow?.episodes.items} length={show?.total_episodes} context={show?.uri}/>
	</DialogContent>
	</>)
}