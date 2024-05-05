import { FC, useCallback, useMemo } from "react";
import { Episode, Track } from "../../../Spoty/spoty.record.types";
import { CardActionArea, CardActionAreaProps, CardActionAreaTypeMap, Stack, Theme, Typography, styled } from "@mui/material";

import { Fx, Img, T } from "./common";
import { useSpoty } from "../../../Spoty/SpotyContext";
import { getItem } from "../../../utils/api";
import { useDetails } from "../../../DetailContainer";

export const PlayerDetailCard: FC<{expanded: boolean}> = ({expanded}) => {
	const imageSize = useMemo(()=>expanded ? 128:64, [expanded])
	const {state} = useSpoty();
	const item = useMemo(()=>state?.item, [state]);
	const {setDetails} = useDetails();
	const onClick = useCallback(async () => {
		if(!state?.context?.uri) return;
		const context_id = state.context.uri;
		const typeResult = /spotify:([^:]*):([^:]*)/.exec(context_id);
		if(!typeResult) return;
		const type = typeResult[1];
		const id = typeResult[2];
		try {
			const item = await getItem(type, id);
			setDetails(item)
		} catch (error) {
		}
	}, [setDetails, state?.context?.uri])
	if(!item) return null;
	return (<PDCard title={`${item.name}
${item.type === 'track' ? item.album.name:item.show.name}
${item.type === 'track' ? item.artists.map(a=>a.name).join(', '):item.show.publisher}`} sx={{
		width: expanded ? 312:64,
		height: expanded ? 128:64
	}}
	onClick={onClick}>
		<Img 
			images={item.type === 'track' ? item.album.images:item.images} 
			size="lg"
			sx={{
				width: imageSize,
				height: imageSize,
			}}/>
		<Fx sx={{height: expanded ? 128:0}}>
			<T variant="h6">{item.name}</T>
			<T variant="subtitle1">{item.type === 'track' ? item.album.name:item.show.name}</T>
			<T variant="subtitle1">{item.type === 'track' ? item.artists.map(a=>a.name).join(', '):item.show.publisher}</T>
		</Fx>
		
	</PDCard>);
}

const PDCard = styled(CardActionArea, {shouldForwardProp: props=>props !== 'expanded'})(({theme})=>({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'stretch',
	textOverflow: 'clip',
	gap: 1,
	transition: theme.transitions.create(['width', 'height'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	})
}))