import { CardActionArea, Skeleton, Theme, Typography, styled, useMediaQuery } from "@mui/material";
import { WidgetProps } from "./types";
import { WidgetImage } from "./WidgetImage";
import { FC, useCallback, useState } from "react";
import { Flex } from "../../Flex";
import { useDetails } from "../../../DetailContainer";
import { getItem } from "../../../utils/api";
import { Marquee } from "../../Marquee";
import { PlayingIcon } from "../../PlayingIcon";

export const WidgetInfo: FC<WidgetProps> = ({state, expanded}) => {
	const name = state?.track_window?.current_track?.name;
	const album_name = state?.track_window?.current_track?.album.name;
	const artists = state?.track_window?.current_track?.artists.map(a=>a.name).join(', ');
	const [velocity, setVelocity] = useState(0);
	const onHover = useCallback(()=>setVelocity(3), [setVelocity]);
	const onBlur = useCallback(()=>setVelocity(0), [setVelocity]);

	const {setDetails} = useDetails();
	const onClick = useCallback(async ()=>{
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
	}, [state, setDetails])
	return (<CBtn {...{onClick, onMouseEnter:onHover, onMouseLeave: onBlur, onTouchStart: onHover, onTouchEnd: onBlur}}>
		<WidgetImage state={state} expanded={expanded}/>
		{expanded && <Flex sx={{minWidth: 128, maxWidth: 256}} stretch grow>
			{state ? (<>
				{!!name && <Marquee velocity={velocity}>
					<Lbl><PlayingIcon paused={state.paused}/>{name}</Lbl>
				</Marquee>}
				{!!album_name && <Marquee velocity={velocity}>
					<Lbl>{album_name}</Lbl>
				</Marquee>}
				{!!artists && <Marquee velocity={velocity}>
					<Lbl>{artists}</Lbl>
				</Marquee>}
			</>):(<>
				<Skeleton width={128}/>
				<Skeleton width={64}/>
				<Skeleton width={96}/>
			</>)}
		</Flex>}
		
	</CBtn>)
}

const Lbl = styled(Typography)({
	overflow: 'clip',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap'
})
const CBtn = styled(CardActionArea)(({theme})=>({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
	alignItems: 'stretch'
}));

