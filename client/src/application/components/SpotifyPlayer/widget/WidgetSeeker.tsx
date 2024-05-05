import { FC, useCallback, useEffect, useRef, useState } from "react";
import { WidgetPlayerProps } from "./types";
import { Slider, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { dx } from "../../../utils/dx";
import { Flex } from "../../Flex";

export const WidgetSeeker: FC<WidgetPlayerProps> = ({state, player}) => {
	const [value, setValue] = useState(state.position);

	let interval = useRef<NodeJS.Timer | null>(null);
	let timeout = useRef<NodeJS.Timer | null>(null);

	const onChange = useCallback((e:Event, v: number | number[])=>{
		const val = v as number
		setValue(val)
		if(timeout.current) {
			clearTimeout(timeout.current);
			timeout.current = null;
		}
		timeout.current = setTimeout(async ()=>{
			console.log("player", player);
			await player?.seek(Math.floor(val/10))
			timeout.current = null;
		}, 1e3);
		return () => {
			if(timeout.current) clearTimeout(timeout.current);
			timeout.current = null; //this will prevent rerender from clearing reference to the timeout.
		}
	}, [setValue, player]);

	useEffect(()=>{
		
		if (interval.current) return
		interval.current = setInterval(()=>{
			if(state.paused || timeout.current) return;
			if (state.paused === undefined) return setValue(0); //If paused is not defined nothing should be done.
			const diff = (new Date().getTime() - state.timestamp) + (state.position*10);

			setValue(diff);
		}, 1e3)
		return () => {
			if (interval.current) clearInterval(interval.current);
			interval.current = null;
		}
	}, [setValue, state.position, state.timestamp, state.paused]);

	const updatePlayback = useCallback(()=>{
		
	},[]);
	//handle unload events here... because it has the playback time. 
	useEffect(()=>{
		window.addEventListener('beforeunload', updatePlayback);
		return ()=>window.removeEventListener('beforeunload', updatePlayback);
	}, [updatePlayback])
	return (<Flex row gap={2}>
		<Typography>{dx(value)}</Typography>
		<Slider value={value} sx={{minWidth: 128}} onChange={onChange} max={state.duration*10}/>
		<Typography>{dx(state.duration*10)}</Typography>
	</Flex>)
}