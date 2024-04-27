import { FC, useCallback } from "react";
import { WidgetPlayerProps, WidgetProps, WidgetQueueDelegate } from "./types";
import { Flex } from "../../Flex";
import { IconButton } from "@mui/material";
import { List, Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { WidgetSeeker } from "./WidgetSeeker";
import { TconButton } from "../../TconButton";

export const WidgetPlayer: FC<WidgetPlayerProps & WidgetQueueDelegate> = ({state, player, toggleQueue}) => {
	const onToggle = useCallback(()=>player?.togglePlay(), [player]);
	const onPrev = useCallback(()=>player?.previousTrack(), [player]);
	const onNext = useCallback(()=>player?.nextTrack(), [player]);
	return (<Flex sx={{width: 256}} grow justifyEnd>
		<Flex row slim justifyEnd>
			<IconButton onClick={toggleQueue}><List/></IconButton>
		</Flex>
		<Flex row grow split slim>
			<TconButton title="Previous" onClick={onPrev}><SkipPrevious/></TconButton>
			<TconButton title={state.paused ? "Play":"Pause"} onClick={onToggle}>{state.paused ? <PlayArrow/>:<Pause/>}</TconButton>
			<TconButton title="Next" onClick={onNext}><SkipNext/></TconButton>
		</Flex>
		<WidgetSeeker {...{state, player}}/>
	</Flex>);
}