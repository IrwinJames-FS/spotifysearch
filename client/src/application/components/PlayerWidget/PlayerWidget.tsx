import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { useSpoty } from "../../Spoty/SpotyContext"
import { Pane } from "./Pane"
import { PlayerDetailCard } from "./components";
import { useBool } from "../../hooks/useBool";
import { PlayerControls } from "./components/PlayerControls";
import { Alert, Box, List, ListItemButton, Snackbar, Stack, Theme, styled } from "@mui/material";
import { TconButton } from "../TconButton";
import { FirstPage, Minimize, MusicNote, NorthEast, Remove } from "@mui/icons-material";
import { QueueItem } from "./components/QueueItem";
import { PlayerAccountError } from "../../Spoty/errors";

export const PlayerWidget = () => {
	const [expanded, toggleExpand] = useBool(true);
	const [visible, toggleVisible] = useBool(true);
	const [queueVisible, toggleQueue] = useBool(false);
	const [toastMessage, setToast] = useState<string | undefined>();
	const {state, queue, play, stateError, playerError, product} = useSpoty();
	const closeToast = useCallback(()=>setToast(undefined), [setToast]);
	useEffect(()=>{
		const error = stateError || playerError
		console.log("Errors" ,stateError, playerError);
		if(!error) return;
		setToast(error instanceof PlayerAccountError ? "Please start spotify or sign into a premium account to use this feature":"Oops something went wrong")
	}, [stateError, playerError])
	return (<>
	<Pane {...{
		left: !visible || !queueVisible || !queue ? -300:16, 
		bottom: expanded ? 156:90, 
		visible: false,
		sx:{
			width: 256,
			maxHeight: `calc(100dvh - 14rem)`,
			overflowY:'scroll'
		}}}>
		<List>
		{queue && <QueueItem item={queue.currently_playing} isPlaying/>}
		{queue && queue.queue.map((q,i)=><QueueItem key={i} item={q} onClick={()=>play({context_uri:state?.context?.uri, offset:{uri: q.uri}})}/>)}
		</List>
	</Pane>
	<Pane {...{left: !visible || !state ? -128:undefined, bottom: !visible || !state ? -128:undefined, visible: visible && !!state}}>
		<PlayerDetailCard expanded={expanded}/>
		{product === 'premium' && <PlayerControls {...{expanded, toggleExpand, toggleVisible, toggleQueue}}/>}
		{product !== 'premium' && <Stack>
			<TconButton title="Hide Player" placement="right" sx={{maxHeight: 32, maxWidth: 32}} size="small" onClick={toggleVisible}><FirstPage/></TconButton>
			<TconButton title="Minimize/Maximize" placement="right"  sx={{maxHeight: 32, maxWidth: 32}} size="small" onClick={toggleExpand}><Remove/></TconButton>
		</Stack>}
	</Pane>
	<ShowButton visible={state ? !visible:false} onClick={toggleVisible}/>
	<Snackbar open={!!toastMessage} autoHideDuration={5e3} onClose={closeToast}>
		<Alert severity="error" title={toastMessage}>{toastMessage}</Alert>
	</Snackbar>
	</>)
}

const ShowButton: FC<{visible?: boolean, onClick?: MouseEventHandler}> = ({visible, onClick}) => {
	return <ShowButtonContainer visible={visible ?? false}><TconButton title="Show Player" placement="top-end" onClick={onClick} sx={{position:'absolute', top:0, right:0, bgcolor:'overlays.900', backdropFilter:'blur(8px)'}}><MusicNote/></TconButton></ShowButtonContainer>
}

const ShowButtonContainer = styled(Box, {shouldForwardProp: prop=>prop !== 'visible'})<{visible:boolean}>(({theme, visible})=>({
	width: 128,
	height: 128,
	position: 'fixed',
	bottom: -64,
	left: -64,
	textAlign:'right',
	transform: `rotate(${visible ? 0:180}deg)`,
	transition: theme.transitions.create('transform', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
		delay: visible ? theme.transitions.duration.enteringScreen:0
	})
}))