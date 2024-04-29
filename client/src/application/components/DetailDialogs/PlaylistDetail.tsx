import { FC, useCallback, useMemo } from "react";
import { PlaylistItem } from "./types";
import { DialogContent, IconButton, Stack, TableContainer, Tooltip } from "@mui/material";
import { Img } from "../ImageSlider";
import { Clx, Fx, T, Title } from "./common.ui";
import { useAsync } from "../../hooks";
import { forwardUri, playIt } from "../../utils/api";
import { SearchResultGroup, TrackResult } from "../common.types";
import { TrackTable } from "./TrackTable";
import { PlayArrow } from "@mui/icons-material";
import { DetailHeader } from "./DetailHeader";
import { PlayButton } from "../PlayButton";
type PlaylistTrackItem = {
	track: TrackResult
}
export const PlaylistDetail: FC<PlaylistItem> = ({name, description, images, tracks, device_id, owner, uri, ...rest}) => {
	const [,, hydratedTracks] = useAsync<TrackResult[] | undefined>(useCallback(async ()=>{
		if(!tracks.href) return undefined;
		const trks = await forwardUri(tracks.href) as SearchResultGroup<PlaylistTrackItem>
		return trks.items.map(item=>item.track)
	}, [tracks]));
	return (<>
	<DetailHeader {...{images, name}}>
		<Fx justifyStart>
			<PlayButton contextUri={uri}/>
		</Fx>
		<T>{name} - {owner.display_name}</T>
		{description && <Clx title="Description:">
			<T>{description}</T>
		</Clx>}
	</DetailHeader>
	<DialogContent>
		<TrackTable tracks={hydratedTracks} context={uri} length={tracks.total}/>
	</DialogContent>
	</>);
}