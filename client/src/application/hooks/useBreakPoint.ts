import { Theme, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";



export const useBreakpoint = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
	const xlu = useMediaQuery<Theme>(theme=>theme.breakpoints.up('xl'));
	const lgu = useMediaQuery<Theme>(theme=>theme.breakpoints.up('lg'));
	const mdu = useMediaQuery<Theme>(theme=>theme.breakpoints.up('md'));
	const smu = useMediaQuery<Theme>(theme=>theme.breakpoints.up('sm'));
	if(xlu) return 'xl';
	if(lgu) return 'lg';
	if(mdu) return 'md';
	if(smu) return 'sm';
	return 'xs';
}

type BreakPointActions<T> = {
	xs?: ()=>T
	sm?: ()=>T
	md?: ()=>T
	lg?: ()=>T
	xl?: ()=>T
}
export const useBreakPointValue = <T>(actions: BreakPointActions<T>, defaultValue: T) => {
	const [v, setV] = useState<T>(defaultValue);
	const bk = useBreakpoint();
	useEffect(()=>{
		if (bk in actions) {
			const v = actions[bk]!()
			setV(v);
		}
	}, [bk, setV, actions]);
	return v
}