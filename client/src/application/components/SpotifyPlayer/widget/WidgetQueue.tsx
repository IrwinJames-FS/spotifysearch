import { Card, CardTypeMap, List, ListItem, ListItemButton, ListItemText, SxProps, Theme, styled } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useSpotifyPlayer } from "../SpotifyPlayerContext";
import { playIt } from "../../../utils/api";
import { dx } from "../../../utils/dx";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { getParentName } from "./methods";

type WidgetQueueProps = {
	open: boolean
	expanded: boolean
}
export const WidgetQueue: FC<WidgetQueueProps> = ({open, expanded}) => {
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
	return (<QCard {...{open, expanded}}>
		<List>
			<QItem selected>
				<ListItemText sx={mainTextStyle} primary={current.name} secondary={getParentName(current)}/>
				<ListItemText sx={secondaryTextStyle} secondary={dx(current.duration_ms*10)}/>
			</QItem>
			{q.map((t,i)=><QBtn key={i} onClick={()=>{playTrack(t.uri)}}>
				<ListItemText sx={mainTextStyle} primary={t.name} secondary={getParentName(t)}/>
				<ListItemText sx={secondaryTextStyle} secondary={dx(t.duration_ms*10)}/>
			</QBtn>)}
		</List>
	</QCard>);
}


type QCardProps = OverridableComponent<CardTypeMap<{open: boolean, expanded: boolean}>>

const mainTextStyle: SxProps<Theme> = {
	flexGrow: 1
}

const secondaryTextStyle: SxProps<Theme> = {
	flexGrow: 0,
	flexShrink: 0,
	width: 64,
	textAlign: 'center'
}
const QItem = styled(ListItem)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

const QBtn = styled(ListItemButton)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

const QCard = styled<QCardProps>(Card, {shouldForwardProp: prop=>!['open', 'expanded'].includes(prop as string)})(({theme, open, expanded})=>({
	position: 'fixed',
	left: open ? 4:-312,
	bottom: expanded ? 150:108,
	width: 312,
	maxHeight: 'calc(100% - 14rem)',
	overflowY:'scroll',
	backgroundColor: theme.palette.overlays[900],
	backdropFilter: 'blur(8px)',
	transition: theme.transitions.create('left', {easing: theme.transitions.easing.sharp, duration: open ? theme.transitions.duration.leavingScreen:theme.transitions.duration.enteringScreen})
}));