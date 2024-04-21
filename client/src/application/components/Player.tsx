import { ChangeEventHandler, Dispatch, FC, MouseEvent, SetStateAction, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useApplication } from "../Application";
import { ParentElement } from "./common.types";
import { Alert, AlertProps, Box, CircularProgress, IconButton, Menu, MenuItem, Skeleton, Slider, SliderOwnProps, Snackbar, SnackbarProps, Stack, Typography, styled } from "@mui/material";
import { PlayImage, PlayerState, usePlayerController } from "../hooks/usePlayerController";
import { Pause, PlayArrow, SkipNext, SkipPrevious, Speaker, VolumeUp } from "@mui/icons-material";
import { dx } from "../utils/dx";

const PlayerContext = createContext<{device_id?: string, setToast: Dispatch<SetStateAction<Omit<SnackbarProps & AlertProps, "onClose">>>}>({setToast: ()=>{}});

export const usePlayer = () => useContext(PlayerContext);

export const Player = ({children}:ParentElement) => {
	const { user } = useApplication();
	const [device_id, playerState, error, player] = usePlayerController(user?.accessToken);
	const [toast, setToast] = useState<Omit<SnackbarProps & AlertProps, "onClose">>({open: false});
	const closeToast = useCallback(()=>setToast({open: false}), [setToast]);

	return (<PlayerContext.Provider value={{device_id, setToast}}>
		{children}
		<Toast {...toast} onClose={closeToast}/>
		{user && <Px {...{...playerState, device_id, player}}/>}
	</PlayerContext.Provider>)
}

const Toast: FC<SnackbarProps & AlertProps> = ({open, title, onClose, autoHideDuration, severity}) => {
	return (<Snackbar {...{open, onClose, autoHideDuration}}>
		<Alert {...{severity}}>{title}</Alert>
	</Snackbar>)
}

const Px: FC<PlayerControllerProps> = props =>{
	return (<Bx>
		<Stack direction="row" gap={1}>
			<PlayerImage {...props}/>
			<PlayerInfo {...props}/>
			<PlayerController {...{...props}}/>
		</Stack>
	</Bx>)
}

const Bx = ({children}:ParentElement) => (<Box sx={{
	bgcolor: 'overlays.900',
	backdropFilter: 'blur(8px)',
	position: 'fixed',
	bottom: 4,
	left: 4,
	minWidth: 256,
	p: 1,
}}>
	{children}
</Box>);
type PlayerPartial = Partial<PlayerState>

const PlayerImage: FC<PlayerPartial> = ({img}) => {
	return img ? (<Img src={img.url} alt={img.alt} sx={{width: img.width, height: img.height}}/>):(<Skeleton variant="rounded" sx={{width: 64, height: 64}}/>)
}


const PlayerInfo: FC<PlayerPartial> = ({track_name, album_name, artist_name}) => {
	return (<Stack gap={0.5} justifyContent="center">
		{track_name ? <Typography variant="subtitle2">{track_name}</Typography>:<Skeleton variant="rounded" sx={{width: 128, height:24}}/>}
		{album_name ? <Typography variant="caption">{album_name}</Typography>:<Skeleton variant="rounded" sx={{width: 64, height: 16}}/>}
		{artist_name ? <Typography variant="caption">{artist_name}</Typography>:<Skeleton variant="rounded" sx={{width: 96, height: 16}}/>}
	</Stack>)
}

type PlayerControllerProps = {device_id?: string | undefined, player?: Spotify.Player} & PlayerPartial
const PlayerController: FC<PlayerControllerProps> = ({device_id, paused, player, ...props}) => {
	const onToggle = useCallback(()=>player?.togglePlay(), [player]);
	const onPrev = useCallback(()=>player?.previousTrack(), [player]);
	const onNext = useCallback(()=>player?.nextTrack(), [player]);
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);
	const open = useMemo(()=>!!anchor, [anchor]);
	const updateAnchor = useCallback(({currentTarget}:MouseEvent<HTMLElement>)=>setAnchor(currentTarget), [setAnchor])
	if(!device_id) return null;
	return (<Stack>
		<Stack direction="row" justifyContent="space-between" sx={{minWidth: 128}}>
			<IconButton onClick={onPrev}><SkipPrevious/></IconButton>
			<IconButton onClick={onToggle}>{paused ? <PlayArrow/>:<Pause/>}</IconButton>
			<IconButton onClick={onNext}><SkipNext/></IconButton>
		</Stack>
		<PlayerSeeker {...{player, paused, ...props}} />
	</Stack>)
}

const PlayerSeeker: FC<PlayerControllerProps> = ({paused, duration=0, position=0, timestamp=0, player}) => {
	const [value, setValue] = useState(position);
	let interval = useRef<NodeJS.Timer | null>(null);
	let timeout = useRef<NodeJS.Timer | null>(null);

	const onChange = useCallback((e:Event, v: number | number[])=>{
		const val = v as number
		setValue(val)
		if(timeout.current) clearTimeout(timeout.current);
		timeout.current = setTimeout(async ()=>{
			await player?.seek(Math.floor(val/10))
			timeout.current = null
		}, 1e3);
	}, [setValue, player])
	useEffect(()=>{
		if (interval.current) return
		interval.current = setInterval(()=>{
			if(paused || timeout.current) return;
			const diff = (new Date().getTime() - timestamp) + (position*10);
			setValue(diff);
		}, 1e3)
		return () => {
			if (interval.current) clearInterval(interval.current);
			interval.current = null;
		}
	}, [setValue, position, timestamp, paused])
	return (<Stack direction="row" gap={2}>
		<Typography>{dx(value)}</Typography>
		<Slider value={value} sx={{minWidth: 128}} onChange={onChange} max={duration*10}/>
		<Typography>{dx(duration*10)}</Typography>
	</Stack>)
}
const Img = styled("img")({});

