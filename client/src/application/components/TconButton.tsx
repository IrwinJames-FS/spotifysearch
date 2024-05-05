import { IconButton, IconButtonProps, Tooltip, TooltipProps, styled } from "@mui/material";
import { FC } from "react";

export const TconButton: FC<IconButtonProps & TooltipProps> = ({title, placement, ...props}) => {
	return (<Tooltip {...{title, placement}}>
		<Span>
			<IconButton {...props}/>
		</Span>
	</Tooltip>)
}

const Span = styled("span")({
	display: 'inline-flex',
	flexGrow:0,
	width: '3rem'
})