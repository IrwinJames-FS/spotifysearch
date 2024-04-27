import { Card, CardProps, CardTypeMap, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { TrackResult } from "../../common.types";
import { SpotifyQueue } from "../types";
import { useSpotifyPlayer } from "../SpotifyPlayerContext";
import { play, playIt } from "../../../utils/api";
import { dx } from "../../../utils/dx";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type WidgetQueueProps = {
	open: boolean
}
export const WidgetQueue: FC<WidgetQueueProps> = ({open}) => {
	const { playerState, queue } = useSpotifyPlayer();
	const current = useMemo(()=>queue?.currently_playing, [queue?.currently_playing])
	const q = useMemo(()=>queue?.queue, [queue?.queue]);
	const { device_id } = useSpotifyPlayer();
	const playTrack = useCallback(async (uri: string) => {
		try {
			await playIt(device_id!, {
				context_uri: playerState?.context.uri ?? undefined,
				offset: { uri }
			})
		} catch (error) {
			console.log((error as Error).message);
		}
	}, [device_id, playerState?.context.uri]);
	if(!q || !current) return null;
	return (<QCard open={open}>
		<List>
			<ListItem selected>
				<ListItemText primary={current.name} secondary={current.album.name}/>
				<ListItemText secondary={dx(current.duration_ms*10)}/>
			</ListItem>
			{q.map((t,i)=><ListItemButton key={i} onClick={()=>{playTrack(t.uri)}}>
				<ListItemText primary={t.name} secondary={t.album.name}/>
				<ListItemText secondary={dx(t.duration_ms*10)}/>
			</ListItemButton>)}
		</List>
	</QCard>);
}
type QCardProps = OverridableComponent<CardTypeMap<{open: boolean}>>
const QCard = styled<QCardProps>(Card, {shouldForwardProp: prop=>prop!=='open'})(({theme, open})=>({
	position: 'fixed',
	left: open ? 4:-312,
	bottom: 150,
	width: 312,
	maxHeight: 'calc(100% - 14rem)',
	overflowY:'scroll',
	backgroundColor: theme.palette.overlays[900],
	backdropFilter: 'blur(8px)',
	transition: theme.transitions.create('left', {easing: theme.transitions.easing.sharp, duration: open ? theme.transitions.duration.leavingScreen:theme.transitions.duration.enteringScreen})
}));