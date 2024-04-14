import { createTheme, useMediaQuery } from "@mui/material"
import { useMemo } from "react";

const white = '#FFF';
const black = '#000';

export const useAppTheme = () => {
	const isDark = useMediaQuery('(prefers-color-scheme: dark)');
	return useMemo(()=>createTheme({
		palette: isDark ? {
			mode: 'dark',
			primary: {
				main: '#86FDA0',
				contrastText: black
			},
			background: {
				default: '#333',
				paper: '#444'
			}
		}:{
			mode: 'light',
			primary: {
				main: '#20C360',
				contrastText: white
			},
			background: {
				default: '#AAFFAA'
			}
		},
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						backgroundColor: isDark ? 'rgba(0,0,0,0.5)':'rgba(255,255,255,0.5)',
						borderRadius: '3rem',
						outline: 'none',
					}
				}
			}
		}
	}), [isDark]);
}