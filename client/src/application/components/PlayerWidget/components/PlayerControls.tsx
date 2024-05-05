import { FC, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { T } from "./common";
import { TconButton } from "../../TconButton";
import { FirstPage, Forward30, List, Minimize, Pause, PlayArrow, Replay30, SkipNext, SkipPrevious } from "@mui/icons-material";
import { IconButton, Slider, Stack, Typography } from "@mui/material";
import { useSpoty } from "../../../Spoty/SpotyContext";
import { dx } from "../../../utils/dx";

type PlayerControlProps = {
	expanded: boolean
	toggleExpand: VoidFunction
	toggleVisible: VoidFunction
	toggleQueue: VoidFunction
} 
export const PlayerControls: FC<PlayerControlProps> = ({expanded, toggleVisible, toggleExpand, toggleQueue}) => {
	const {state, togglePlay, seek, skipNext, skipPrev} = useSpoty();
	const btnSize = useMemo(()=>expanded ? 'medium':'small', [expanded]);
	const name = useMemo(()=>state?.item?.name, [state])
	const is_playing = useMemo(()=>state?.is_playing ?? false, [state]);
	const [progress, setProgress] = useState((state?.progress_ms ?? 0));
	const duration = useMemo(()=>state?.item?.duration_ms ?? 0, [state]);
	const isSeeking = useRef<boolean>(false);

	//Handle Seeking change
	const onProgressChange = useCallback((_: Event, value: number | number[] )=>{
		isSeeking.current = true;
		setProgress(value as number)
	}, [setProgress]);

	const onProgressCommit = useCallback((_: Event | SyntheticEvent, value: number | number[]) => {
		seek(value as number);
		isSeeking.current = false;
	}, [seek]);

	const backTrack = useCallback(() => {
		seek(progress-3e4);
	}, [seek, progress]);

	const fastTrack = useCallback(() => {
		seek(progress+3e4);
	}, [seek, progress])

	useEffect(()=>{
		if(isSeeking.current)return;
		const progress_ms = (state?.progress_ms ?? 0)
		setProgress(progress_ms);
	}, [state]);

	useEffect(()=>{
		const timer = setInterval(()=>{
			if(!is_playing || isSeeking.current) return;

			setProgress(p=>p+1e3);
		}, 1e3);
		return ()=>clearInterval(timer);
	}, [is_playing, setProgress]);

	return (<Stack justifyContent={expanded ? "flex-start":"center"} direction="column" sx={{height: expanded ? 128:64, width: 240}}>
	<Stack direction="row" sx={{justifyContent:'flex-end'}}>
		{!expanded && <T sx={{justifySelf:'flex-start', flexGrow: 1, alignSelf: 'center', pl: 1}}>{name}</T>}
		<TconButton title="Show/Hide Queue" size={btnSize} placement="top" onClick={toggleQueue}><List/></TconButton>
		<TconButton title="Minimize" size={btnSize} placement="top" onClick={toggleExpand}><Minimize/></TconButton>
		<TconButton title="Hide" size={btnSize} placement="top" onClick={toggleVisible}><FirstPage/></TconButton>
	</Stack>
	<Stack direction="row" justifyContent="space-evenly">
		<IconButton title="Rewind" size={btnSize} onClick={backTrack}><Replay30/></IconButton>
		<IconButton title="Previous" size={btnSize} onClick={skipPrev}><SkipPrevious/></IconButton>
		<IconButton title="Play" size={btnSize} onClick={togglePlay}>{is_playing ? <Pause/>:<PlayArrow/>}</IconButton>
		<IconButton title="Next" size={btnSize} onClick={skipNext}><SkipNext/></IconButton>
		<IconButton title="Fast Forward" size={btnSize} onClick={fastTrack}><Forward30/></IconButton>
	</Stack>
	{expanded && <Stack direction="row" justifyContent="space-evenly" gap={2} sx={{px:1}}>
		<Typography>{dx(progress)}</Typography>
		<Slider size="small" value={progress} onChange={onProgressChange} onChangeCommitted={onProgressCommit} min={0} max={duration}/>
		<Typography>{dx(duration)}</Typography>
	</Stack>}
	</Stack>);
}