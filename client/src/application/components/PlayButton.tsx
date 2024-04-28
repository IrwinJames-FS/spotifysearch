import { FC, useCallback, useMemo } from "react";
import { TconButton } from "./TconButton";
import { playIt } from "../utils/api";
import { useSpotifyPlayer } from "./SpotifyPlayer";
import { Pause, PlayArrow } from "@mui/icons-material";
import { TooltipProps } from "@mui/material";
import { PlayingIcon } from "./PlayingIcon";

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
	const {device_id, playerState, player} = useSpotifyPlayer();
	const isPlaying = useMemo(()=>{
		if(!playerState?.track_window.current_track.uri) return false;
		if((!uris && !offset) && context_uri && context_uri === playerState.context.uri) return true;
		return offset?.uri === playerState?.track_window.current_track.uri
	}, [playerState, context_uri, offset, uris]);
	
	const playNow = useCallback(()=>{
		if(isPlaying) return player?.togglePlay();
		playIt(device_id!, {context_uri, uris, offset});
	}, [context_uri, uris, offset, device_id, player, isPlaying]);
	const pauseNow = useCallback(()=>{
		//assumes its playing
		return player?.togglePlay();
	}, [player])
	return isPlaying ? 
	<TconButton title={playerState?.paused ? "Play":"Pause"} placement={placement} onClick={pauseNow}><PlayingIcon paused={playerState?.paused}/></TconButton>:
	<TconButton title="Play Now" onClick={playNow} disabled={!device_id} placement={placement}><PlayArrow/></TconButton>
}