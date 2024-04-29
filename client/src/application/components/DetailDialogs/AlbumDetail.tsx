import { FC, useCallback } from "react";
import { Clx, CopyRight, Fx, Markets, T } from "./common.ui";
import { TrackTable } from "./TrackTable";
import { AlbumItem } from "./types";
import { addToQueue } from "../../utils/api";
import { PlayButton } from "../PlayButton";
import { DetailHeader } from "./DetailHeader";
import { EnqueueButton } from "../EnqueueButton";
import { TconButton } from "../TconButton";
import { FaMinus } from "react-icons/fa";
import { DialogContent, Tooltip, Typography } from "@mui/material";
import { MarketIcon } from "../MarketIcon";
import { redate } from "../../utils/strings";
import { Audiotrack, Favorite } from "@mui/icons-material";

export const AlbumDetail: FC<AlbumItem> = ({name, images, total_tracks, id, tracks, device_id, uri, release_date, artists, available_markets, copyrights, popularity,  ...rest}) => {
	return (<>
	<DetailHeader {...{name, images}}>
		<Fx row>
			<PlayButton contextUri={uri}/>
			<EnqueueButton uris={tracks.items.map(t=>t.uri)}/>
			<TconButton title="Remove from Queue"><FaMinus/></TconButton>
		</Fx>
		<T>{name} - {artists.map(a=>a.name).join(', ')} {redate(release_date)}</T>
		<T><Audiotrack/> {total_tracks} Tracks <Favorite/> {popularity}</T>
		<Clx title="Markets:">
			<Markets markets={available_markets}/>
		</Clx>
		<Clx title="Copyrights">
			<CopyRight copyrights={copyrights}/>
		</Clx>
	</DetailHeader>
	<DialogContent>
		<TrackTable tracks={tracks.items} context={uri} length={total_tracks}/>
	</DialogContent>
	</>)
}
