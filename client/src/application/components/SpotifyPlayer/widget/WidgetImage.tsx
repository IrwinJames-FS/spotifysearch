import { FC, useMemo } from "react";
import { Image } from "../../Image";
import { Skeleton, Theme } from "@mui/material";
import { WidgetProps } from "./types";

export const WidgetImage: FC<WidgetProps> = ({state, expanded}) => {
	const images = state?.track_window?.current_track?.album?.images
	const s = useMemo(()=>expanded ? 128:64, [expanded]);
	return images ? (<Image {...{
		images, 
		size:'md', 
		sx:{width: s, height: s},
		transition: (theme: Theme)=>theme.transitions.create(['width', 'height'], {
			easing: theme.transitions.easing.sharp,
			duration: expanded ? theme.transitions.duration.leavingScreen:theme.transitions.duration.enteringScreen
		})
	}}/>):(<Skeleton variant="rounded" width={s} height={s}/>);
}