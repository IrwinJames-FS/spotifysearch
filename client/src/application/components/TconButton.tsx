import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FC } from "react";

export const TconButton: FC<IconButtonProps & TooltipProps> = ({title, placement, ...props}) => {
	return (<Tooltip {...{title, placement}}>
		<span>
			<IconButton {...props}/>
		</span>
	</Tooltip>)
}