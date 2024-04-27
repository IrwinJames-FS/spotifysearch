import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FC } from "react";

export const TconButton: FC<IconButtonProps & TooltipProps> = ({title, ...props}) => {
	return (<Tooltip {...{title}}>
		<IconButton {...props}/>
	</Tooltip>)
}