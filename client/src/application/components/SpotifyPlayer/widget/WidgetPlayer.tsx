import { FC, useCallback } from "react";
import { WidgetPlayerProps, WidgetProps, WidgetDelegate } from "./types";
import { Flex } from "../../Flex";
import { IconButton, Theme, useMediaQuery } from "@mui/material";
import { List, Maximize, Minimize, Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { WidgetSeeker } from "./WidgetSeeker";
import { TconButton } from "../../TconButton";

export const WidgetPlayer: FC<WidgetPlayerProps & WidgetDelegate> = ({state, player, expanded, toggleQueue, toggleExpanded}) => {
	const onToggle = useCallback(()=>player?.togglePlay(), [player]);
	const onPrev = useCallback(()=>player?.previousTrack(), [player]);
	const onNext = useCallback(()=>player?.nextTrack(), [player]);
	const isSm = useMediaQuery<Theme>(theme=>theme.breakpoints.down('sm'));
	return (<Flex sx={{width: 256}} grow justifyEnd>
		{expanded && <Flex row slim justifyEnd>
			<TconButton title="Show/Hide Queue" placement="top" onClick={toggleQueue}><List/></TconButton>
			<TconButton title="Minimize" placement="top" onClick={toggleExpanded}><Minimize/></TconButton>
		</Flex>}
		<Flex row grow split slim>
			<TconButton title="Previous" onClick={onPrev} placement="left"><SkipPrevious/></TconButton>
			<TconButton title={state.paused ? "Play":"Pause"} onClick={onToggle} placement="top">{state.paused ? <PlayArrow/>:<Pause/>}</TconButton>
			<TconButton title="Next" onClick={onNext} placement="right"><SkipNext/></TconButton>
			{!expanded && <TconButton title="Show/Hide Queue" onClick={toggleQueue}><List/></TconButton>}
			{!expanded && !isSm && <TconButton title="Expand Player" onClick={toggleExpanded}><Maximize/></TconButton>}
		</Flex>
		<WidgetSeeker {...{state, player}}/>
	</Flex>);
}