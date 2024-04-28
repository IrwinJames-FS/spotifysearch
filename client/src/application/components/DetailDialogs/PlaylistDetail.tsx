import { FC, useCallback, useMemo } from "react";
import { PlaylistItem } from "./types";
import { IconButton, Stack, TableContainer, Tooltip } from "@mui/material";
import { Img } from "../ImageSlider";
import { Fx, T, Title } from "./common.ui";
import { useAsync } from "../../hooks";
import { forwardUri, playIt } from "../../utils/api";
import { SearchResultGroup, TrackResult } from "../common.types";
import { TrackTable } from "./TrackTable";
import { PlayArrow } from "@mui/icons-material";
type PlaylistTrackItem = {
	track: TrackResult
}
export const PlaylistDetail: FC<PlaylistItem> = ({name, description, images, tracks, device_id, uri, ...rest}) => {
	const image = useMemo(()=>images?.length ? images[0]:undefined, [images])
	const [,, hydratedTracks] = useAsync<TrackResult[] | undefined>(useCallback(async ()=>{
		if(!tracks.href) return undefined;
		const trks = await forwardUri(tracks.href) as SearchResultGroup<PlaylistTrackItem>
		return trks.items.map(item=>item.track)
	}, [tracks]));
	const playNow = useCallback(()=>{
		playIt(device_id, {
			context_uri: uri
		})
	}, [device_id, uri])
	return (<>
	<Title>
		<Stack direction="row" justifyContent="space-between" gap={1}>
			{image && <Img src={image.url} sx={{width: 256, height: 256}}/>}
			<Stack sx={{flexGrow:1}} gap={1}>
				<T>{name}</T>
				{description && <T>{description}</T>}
				<Fx slim>
					<Tooltip title="Play now!">
						<IconButton onClick={playNow}>
							<PlayArrow/>
						</IconButton>
					</Tooltip>
				</Fx>
			</Stack>
		</Stack>
	</Title>
	<TrackTable tracks={hydratedTracks} context={uri} length={tracks.total}/>
	</>);
}