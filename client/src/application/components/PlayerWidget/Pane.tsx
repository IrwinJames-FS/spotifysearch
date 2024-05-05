import { Card, styled } from "@mui/material";

export const Pane = styled(Card, {shouldForwardProp: prop=>!(['left', 'bottom', 'visible'] as PropertyKey[]).includes(prop)})<{left?:number, bottom?:number, visible:boolean}>(({theme, left=16, bottom=16, visible})=>({
	backdropFilter: 'blur(8px)',
	position: 'fixed',
	left,
	bottom,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'stretch',
	transition: theme.transitions.create(['left', 'bottom'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
		delay: visible ? theme.transitions.duration.enteringScreen:0
	})
}))