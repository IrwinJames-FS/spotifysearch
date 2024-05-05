import { FC, useCallback, useMemo } from "react";
import { TconButton } from "./TconButton";
import { playIt } from "../utils/api";
import { PlayArrow } from "@mui/icons-material";
import { PlayingIcon } from "./PlayingIcon";
import { useSpoty } from "../Spoty/SpotyContext";

export type PlayButtonProps = {
	placement?:  "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"
	contextUri?: string
	uris?: string[]
	offset?: {
		position?: number
		uri?: string
	}
}

/**
 * This appears to be extremely repetative so making the play process a bit more declarative
 * @returns 
 */
export const PlayButton: FC<PlayButtonProps> = ({placement, contextUri:context_uri, uris, offset}) => {
	const { play, pause, state, product } = useSpoty();
	const isPlaying = useMemo(()=>{
		if(!state?.is_playing) return false;
		if((!uris && !offset) && context_uri && context_uri === state!.context?.uri) return true;
		return offset?.uri === state!.item?.uri;
	}, [context_uri, offset, uris, state]);
	
	const playNow = useCallback(()=>{
		//if(isPlaying) return player?.togglePlay();
		play({context_uri, uris, offset});
	}, [context_uri, uris, offset, play]);
	const pauseNow = useCallback(()=>{
		pause()
	}, [pause]);
	if(product !== 'premium') return null
	return isPlaying ? 
	<TconButton title={!state?.is_playing ? "Play":"Pause"} placement={placement} onClick={pauseNow}><PlayingIcon paused={!state?.is_playing}/></TconButton>:
	<TconButton title={"Play"} onClick={playNow} placement={placement}><PlayArrow/></TconButton>
}