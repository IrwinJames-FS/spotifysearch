import { Stack, Typography, styled } from "@mui/material";
import { Image } from "../../Image";

export const Fx = styled(Stack)(({theme})=>({
	padding: '0.5rem',
	justifyContent: 'flex-start',
	flexShrink: 1,
	minWidth: 0,
	transition: theme.transitions.create('height', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	})
}));

export const Img = styled(Image)(({theme})=>({
	transition: theme.transitions.create(['width', 'height'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	})
}))
export const T = styled(Typography)(({theme})=>({
	whiteSpace: 'nowrap',
	overflow: 'clip',
	flexShrink: 1
}));