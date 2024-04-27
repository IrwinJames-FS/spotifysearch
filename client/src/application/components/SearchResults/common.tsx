
import { Box as MuiBox, Card as MuiCard, CardContent as MuiCardContent, CardActionArea as MuiCardActionArea, Theme, styled, Typography, Divider, Stack } from "@mui/material";
import { Flex } from "../Flex";
import { FC, ReactNode } from "react";
import { Image } from "../Image";

export const Box = styled(MuiBox)({display: 'inline-flex', p:1});

export const Img = styled(Image)({
	width: '100%'
})

export const Card = styled(MuiCard)(({theme})=>({ 
	flexShrink: 0,
	display: 'flex', 
	justifyContent: 'flex-start',
	width: theme.constants.gridCellWidth,
	height: theme.constants.gridCellHeight
}));

export const CardContent = styled(MuiCardContent)({
	flexGrow: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
});

export const CardActionArea = styled(MuiCardActionArea)({
	position: 'relative'
})

export const CaptionArea = styled(Flex)(({theme})=>({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	flexDirection: 'row',
	alignItems: 'center',
	height: theme.constants.gridCaptionHeight,
	backdropFilter: 'blur(8px)',
	background: theme.palette.overlays[900]
}));

export const NameLabel = styled(Typography)(({theme})=>({
	textOverflow:'ellipsis',
	display: '-webkit-box',
	overflow: 'hidden',
	flexGrow: 1,
	verticalAlign: 'middle'
}));

export const NameComponent: FC<{name:string}> = ({name}) => {
	return <Flex fill center>
		<NameLabel>{name}</NameLabel>
	</Flex>
}

export const CaptionComponent: FC<{title:string, value: string | number}> = ({title, value}) => {
	return <Flex row justifyEnd alignItems="stretch">
		<Divider orientation="vertical"/>
		<Flex sx={{px: 1}} center>
			<Typography sx={{fontSize: 12}}>{title}</Typography>
			<Typography sx={{flexGrow:1}}>{value}</Typography>
		</Flex>
	</Flex>
}