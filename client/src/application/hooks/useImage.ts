import { useTheme } from "@mui/material";
import { ImageResult } from "../components/common.types";
import { useMemo } from "react";

export const useImage = (img?: ImageResult) => {
	const theme = useTheme();
	const i = useMemo(()=>{
		if(!img) return undefined
		const sf = theme.constants.gridCellWidth/(img.width ?? theme.constants.gridCellWidth)
		const h = Math.floor((img.height ?? theme.constants.gridCellWidth)*sf);
		return {src: img.url, height: h}
	}, [img, theme]);
	return i;
}