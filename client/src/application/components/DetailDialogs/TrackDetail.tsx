import { MusicNote } from "@mui/icons-material";
import { Button, DialogContent, Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { FaSpotify } from "react-icons/fa";
import { useSpoty } from "../../Spoty/SpotyContext";
import { useAsync } from "../../hooks";
import { getItem } from "../../utils/api";
import { dx } from "../../utils/dx";
import { EnqueueButton } from "../EnqueueButton";
import { PlayButton } from "../PlayButton";
import { HydradedAlbumResult } from "../common.types";
import { DetailHeader } from "./DetailHeader";
import { TrackTable } from "./TrackTable";
import { Fx, T } from "./common.ui";
import { TrackItem } from './types';


export const TrackDetail: FC<TrackItem> = ({name, duration_ms, album, artists, track_number, external_urls, uri, ...rest}) => {
	const [isLoadingAlbumnInfo,, albumInfo] = useAsync<HydradedAlbumResult>(useCallback(async () => {
		const a =  await getItem('album', album.id);
		return a;
	}, [album.id]))
	const { isLocal } = useSpoty();
	return (<>
	<DetailHeader name={name} images={album.images}>
		{isLocal && <Fx row>
			<EnqueueButton uris={[uri]}/>
			<PlayButton contextUri={album.uri} offset={({uri})}/>
		</Fx>}
		<T>{name} {dx(duration_ms)}</T>
		<T>{album.name}</T>
		<T>{artists.map(a=>a.name).join(', ')}</T>
		<T><MusicNote/>{track_number}/{album.total_tracks}</T>
	</DetailHeader>
	<DialogContent>
		<Stack sx={{pt:3}} direction="row">
			{external_urls.spotify && <Stack>
				<Button variant="contained" component={"a"} href={external_urls.spotify} target="_blank" color="primary" startIcon={<FaSpotify/>}>Open in Spotify</Button>
			</Stack>}
		</Stack>
		{<TrackTable tracks={albumInfo?.tracks.items} context={album.uri} length={album.total_tracks}/>}
	</DialogContent>
	</>)
}