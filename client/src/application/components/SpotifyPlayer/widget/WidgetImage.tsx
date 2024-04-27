import { FC, useMemo } from "react";
import { Image } from "../../Image";
import { Skeleton } from "@mui/material";
import { WidgetProps } from "./types";

export const WidgetImage: FC<WidgetProps> = ({state}) => {
	const images = state?.track_window?.current_track.album.images
	const s = useMemo(()=>128, []);
	return images ? (<Image {...{images, size:'md', sx:{width: s, height: s}}}/>):(<Skeleton variant="rounded" width={s} height={s}/>);
}