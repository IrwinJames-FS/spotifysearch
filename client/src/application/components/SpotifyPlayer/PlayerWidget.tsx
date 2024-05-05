
import { Card, Theme, styled, useMediaQuery } from "@mui/material"
import { useSpotifyPlayer } from "./SpotifyPlayerContext"
import { WidgetInfo } from "./widget";
import { WidgetPlayer } from "./widget/WidgetPlayer";
import { WidgetQueue } from "./widget/WidgetQueue";
import { useBool } from "../../hooks/useBool";
import { useMemo } from "react";

export const PlayerWidget = () => {
	const {playerState:state, player, device_id, error} = useSpotifyPlayer();
	const [open, toggleQueue] = useBool();
	const [ex, toggleExpanded] = useBool(true);
	const isSm = useMediaQuery<Theme>(theme=>theme.breakpoints.down('sm'));
	const expanded = useMemo(()=>!isSm && ex, [ex, isSm]);
	if(error || !device_id) return null; //nothing to see here
	return (<>
	<WidgetQueue {...{open, expanded}}/>
	<PlayerCard>
		<WidgetInfo {...{state, expanded}}/>
		{!!state && !!player && <WidgetPlayer {...{state, player, expanded, toggleQueue, toggleExpanded}}/>}
	</PlayerCard>
</>)
}

const PlayerCard = styled(Card)(({theme})=>({
	position: 'fixed',
	bottom: 4,
	left: 4,
	display: 'flex',
	flexDirection: 'row',
	background: theme.palette.overlays[600],
	backdropFilter: 'blur(8px)',
	alignItems: 'stretch',
	padding: '0.5rem'
}))