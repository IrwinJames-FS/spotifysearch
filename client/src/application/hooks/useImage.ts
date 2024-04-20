import { useTheme } from "@mui/material";
import { ImageResult } from "../components/common.types";
import { useMemo } from "react";

export const useImage = (img?: ImageResult | ImageResult[]) => {
	const theme = useTheme();
	const i = useMemo(()=>{
		const im = Array.isArray(img) ? img.length > 0 ? img[0]:undefined:img;
		if(!im) return undefined;
		const sf = theme.constants.gridCellWidth/(im.width ?? theme.constants.gridCellWidth)
		const h = Math.floor((im.height ?? theme.constants.gridCellWidth)*sf);
		return {src: im.url, height: h}
	}, [img, theme]);
	return i;
}