import { FC, useCallback, useMemo } from "react";
import { PlaylistItem } from "./types";
import { Stack, TableContainer } from "@mui/material";
import { Img } from "../ImageSlider";
import { T, Title } from "./common.ui";
import { useAsync } from "../../hooks";
import { forwardUri } from "../../utils/api";
import { SearchResultGroup, TrackResult } from "../common.types";
import { TrackTable } from "./TrackTable";
type PlaylistTrackItem = {
	track: TrackResult
}
export const PlaylistDetail: FC<PlaylistItem> = ({name, description, images, tracks}) => {
	const image = useMemo(()=>images?.length ? images[0]:undefined, [images])
	const [,, hydratedTracks] = useAsync<TrackResult[] | undefined>(useCallback(async ()=>{
		if(!tracks.href) return undefined;
		const trks = await forwardUri(tracks.href) as SearchResultGroup<PlaylistTrackItem>
		return trks.items.map(item=>item.track)
	}, [tracks]));
	return (<>
	<Title>
		<Stack direction="row" justifyContent="space-between" gap={1}>
			{image && <Img src={image.url} sx={{width: 256, height: 256}}/>}
			<Stack sx={{flexGrow:1}} gap={1}>
				<T>{name}</T>
				{description && <T>{description}</T>}
			</Stack>
		</Stack>
	</Title>
	{hydratedTracks && <TrackTable tracks={hydratedTracks}/>}
	</>);
}