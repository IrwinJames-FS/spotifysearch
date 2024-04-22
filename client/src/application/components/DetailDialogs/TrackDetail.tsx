import { FC, useCallback, useMemo } from "react";
import { TrackItem } from './types';
import { useAsync } from "../../hooks";
import { HydradedAlbumResult, TrackResult } from "../common.types";
import { addToQueue, getItem } from "../../utils/api";
import { Button, CircularProgress, DialogContent, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Img } from "../ImageSlider";
import { Add } from "@mui/icons-material";
import { DetailsList, Image, T, Title } from "./common.ui";
import { dx } from "../../utils/dx";
import { FaSpotify } from "react-icons/fa";


export const TrackDetail: FC<TrackItem> = ({device_id, name, duration_ms, album, artists, track_number, external_urls, uri}) => {
	const [isLoadingAlbumnInfo,, albumInfo] = useAsync<HydradedAlbumResult>(useCallback(async () => {
		const a =  await getItem('album', album.id);
		console.log(a);
		return a;
	}, [album.id]))

	const addTrackToQueue = useCallback(()=>{
		addToQueue(uri, device_id);
	}, [uri, device_id]);
	
	return (<>
	<Title>
		<Image {...{images: album.images, size: 'lg'}}/>
		<DetailsList>
			<T>{name} {dx(duration_ms*10)}</T>
			<T>{album.name}</T>
			<T>{artists.map(a=>a.name).join(', ')}</T>
			<T>{track_number}/{album.total_tracks}</T>
			<Stack direction="row" sx={{bgcolor:'overlays.300'}}>
				<Tooltip title="Add to queue">
					<IconButton onClick={addTrackToQueue}><Add/></IconButton>
				</Tooltip>
			</Stack>
		</DetailsList>
	</Title>
	<DialogContent>
		<Stack sx={{pt:3}} direction="row">
			{external_urls.spotify && <Stack>
				<Button variant="contained" component={"a"} href={external_urls.spotify} target="_blank" color="primary" startIcon={<FaSpotify/>}>Open in Spotify</Button>
			</Stack>}
		</Stack>
		{isLoadingAlbumnInfo ? <CircularProgress/>:
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow sx={{bgcolor:'overlays.900'}}>
							<TableCell sx={{whiteSpace:'nowrap'}}>Track</TableCell>
							<TableCell>Track Name</TableCell>
							<TableCell>Duration</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{albumInfo?.tracks.items.map((track, i)=><TableRow key={i} sx={{bgcolor: i+1 === track_number ? 'overlays.300':i%2 === 0 ? 'overlays.600':'overlays.900'}}>
							<TableCell>{track.track_number}</TableCell>
							<TableCell>{track.name}</TableCell>
							<TableCell>{track.duration_ms}</TableCell>
						</TableRow>)}
					</TableBody>
				</Table>
			</TableContainer>}
	</DialogContent>
	</>)
}