import { createTheme, useMediaQuery } from "@mui/material"
import { useMemo } from "react";

const white = '#FFF';
const black = '#000';
const red = '#F00';
const green = '#0F0';
const blue = '#00F';
export const useAppTheme = () => {
	const isDark = useMediaQuery('(prefers-color-scheme: dark)');
	return useMemo(()=>createTheme(isDark ? {
		palette: {
			mode: 'dark',
			primary: {
				main: '#86FDA0',
				contrastText: black
			},
			background: {
				default: '#333',
				paper: '#444'
			}
		}
	}:{
		palette: {
			mode: 'light',
			primary: {
				main: '#20C360',
				contrastText: white
			}
		}
	}), [isDark]);
}