import { FC, useCallback } from "react";
import { PlaylistItem } from "./types";
import { DialogContent } from "@mui/material";
import { Clx, Fx, T } from "./common.ui";
import { useAsync } from "../../hooks";
import { forwardUri } from "../../utils/api";
import { SearchResultGroup, TrackResult } from "../common.types";
import { TrackTable } from "./TrackTable";
import { DetailHeader } from "./DetailHeader";
import { PlayButton } from "../PlayButton";
import { useSpoty } from "../../Spoty/SpotyContext";
type PlaylistTrackItem = {
	track: TrackResult
}
export const PlaylistDetail: FC<PlaylistItem> = ({name, description, images, tracks, owner, uri, ...rest}) => {
	const [,, hydratedTracks] = useAsync<TrackResult[] | undefined>(useCallback(async ()=>{
		if(!tracks.href) return undefined;
		const trks = await forwardUri(tracks.href) as SearchResultGroup<PlaylistTrackItem>
		return trks.items.map(item=>item.track)
	}, [tracks]));
	const { isLocal } = useSpoty();
	return (<>
	<DetailHeader {...{images, name}}>
		{isLocal && <Fx justifyStart>
			<PlayButton contextUri={uri} placement="top"/>
		</Fx>}
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