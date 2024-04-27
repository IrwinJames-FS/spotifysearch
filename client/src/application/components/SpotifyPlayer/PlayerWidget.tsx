
import { Card, styled } from "@mui/material"
import { useSpotifyPlayer } from "./SpotifyPlayerContext"
import { WidgetInfo } from "./widget";
import { WidgetPlayer } from "./widget/WidgetPlayer";
import { WidgetQueue } from "./widget/WidgetQueue";
import { useBool } from "../../hooks/useBool";

export const PlayerWidget = () => {
	const {playerState, player, queue} = useSpotifyPlayer();
	const [qOpen, toggleQueue] = useBool();
	return (<>
	<WidgetQueue open={qOpen}/>
	<PlayerCard>
		<WidgetInfo state={playerState}/>
		{!!playerState && !!player && <WidgetPlayer {...{state:playerState, player, toggleQueue}}/>}
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