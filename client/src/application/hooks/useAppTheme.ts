import { createTheme, useMediaQuery, Color, Theme } from "@mui/material"
import { useMemo } from "react";

declare module '@mui/material' {
	interface Palette {
		overlays: Color
	}

	interface PaletteOptions {
		overlays: Color
	}

	interface Theme {
		constants: {
			gridCellWidth: number
			gridCellHeight: number
			gridCaptionHeight: number
			horizontalLoadOffset: number
			horizontalVirtualizeBuffer: number
			debounceMs: number
		}
	}

	interface ThemeOptions {
		constants: {
			gridCellWidth: number
			gridCellHeight: number
			gridCaptionHeight: number
			horizontalLoadOffset: number
			horizontalVirtualizeBuffer: number 
			debounceMs: number
		}
	}
}
const white = '#FFF';
const black = '#000';
let colorKeys: (keyof Color)[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];

const genColor = (clrs: string[]): Color => {
	return colorKeys.reduce((o,k,i)=>({...o, [k]:clrs[i]}), {}) as Color
}
const genOpaque = (clr: string): Color => {
	clr = clr.replace('#', '');
	clr = clr.length === 3 ? `${clr.charAt(0)}${clr.charAt(0)}${clr.charAt(1)}${clr.charAt(1)}${clr.charAt(2)}${clr.charAt(2)}`:clr
	const step = 256/14
	
	return genColor(new Array(14).fill('').map((_, i)=>crx(clr, Math.floor(step*i))));
}
let crx = (clr: string, v: number) => `#${clr}${hx(v)}`
let hx = (v: number) => v.toString(16).padStart(2, '0');

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
			},
			overlays: genOpaque('#555')
		}:{
			mode: 'light',
			primary: {
				main: '#20C360',
				contrastText: white
			},
			background: {
				default: '#AAFFAA'
			},
			overlays: genOpaque('#FFF')
		},
		constants: {
			gridCellWidth: 256,
			gridCellHeight: 256,
			gridCaptionHeight: 48,
			horizontalLoadOffset: 900,
			horizontalVirtualizeBuffer: 4,
			debounceMs: 1e3
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