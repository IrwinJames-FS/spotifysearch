import { createTheme, useMediaQuery } from "@mui/material"
import { useMemo } from "react";

export const useAppTheme = () => {
	const isDark = useMediaQuery('(prefers-color-scheme: dark)');
	return useMemo(()=>createTheme(isDark ? {
		palette: {
			mode: 'dark'
		}
	}:{
		palette: {
			mode: 'light'
		}
	}), [isDark]);
}