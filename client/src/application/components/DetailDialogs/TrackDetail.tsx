import { FC, useCallback, useMemo } from "react";
import { TrackItem } from './types';
import { useAsync } from "../../hooks";
import { HydradedAlbumResult, TrackResult } from "../common.types";
import { addToQueue, getItem, play } from "../../utils/api";
import { Button, CircularProgress, DialogContent, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Img } from "../ImageSlider";
import { Add, PlayArrow } from "@mui/icons-material";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { dx } from "../../utils/dx";
import { FaSpotify } from "react-icons/fa";
import { TrackTable } from "./TrackTable";
import { PlayButton } from "../PlayButton";
import { DetailHeader } from "./DetailHeader";
import { TconButton } from "../TconButton";


export const TrackDetail: FC<TrackItem> = ({device_id, name, duration_ms, album, artists, track_number, external_urls, uri, ...rest}) => {
	const [isLoadingAlbumnInfo,, albumInfo] = useAsync<HydradedAlbumResult>(useCallback(async () => {
		const a =  await getItem('album', album.id);
		return a;
	}, [album.id]))

	const addTrackToQueue = useCallback(()=>{
		addToQueue(uri, device_id);
	}, [uri, device_id]);
	const playNow = useCallback(()=>{
		play(device_id, album.uri, uri);
	}, [uri, device_id, album.uri])
	return (<>
	<DetailHeader name={name} images={album.images}>
		{!!device_id && <Fx row>
			<TconButton title="Add to queue" onClick={addTrackToQueue}><Add/></TconButton>
			<PlayButton contextUri={album.uri} offset={{uri}}/>
		</Fx>}
		<T>{name} {dx(duration_ms*10)}</T>
		<T>{album.name}</T>
		<T>{artists.map(a=>a.name).join(', ')}</T>
		<T>{track_number}/{album.total_tracks}</T>
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