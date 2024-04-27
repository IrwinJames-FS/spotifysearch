import { CardActionArea, Skeleton, Typography, styled } from "@mui/material";
import { WidgetProps } from "./types";
import { WidgetImage } from "./WidgetImage";
import { FC } from "react";
import { Flex } from "../../Flex";

export const WidgetInfo: FC<WidgetProps> = ({state}) => {
	const name = state?.track_window?.current_track?.name;
	const album_name = state?.track_window?.current_track?.album.name;
	const artists = state?.track_window?.current_track?.artists.map(a=>a.name).join(', ');
	return (<CBtn>
		<WidgetImage state={state}/>
		<Flex stretch grow>
			{state ? (<>
				{!!name && <Typography variant="h6">{name}</Typography>}
				{!!album_name && <Typography>{album_name}</Typography>}
				{!!artists && <Typography>{artists}</Typography>}
			</>):(<>
				<Skeleton width={128}/>
				<Skeleton width={64}/>
				<Skeleton width={96}/>
			</>)}
		</Flex>
	</CBtn>)
}

const CBtn = styled(CardActionArea)(({theme})=>({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
	alignItems: 'stretch'
}));

