import { Theme, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";


type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const pemdas:BreakPoint[] = ['xl', 'lg', 'md', 'sm', 'xs']; //the order of operations
export const useBreakpoint = (keys: Set<BreakPoint> = new Set(pemdas)): BreakPoint => {
	const sizes:Record<BreakPoint, boolean> = {
		xl:useMediaQuery<Theme>(theme=>theme.breakpoints.up('xl')),
		lg:useMediaQuery<Theme>(theme=>theme.breakpoints.up('lg')),
		md:useMediaQuery<Theme>(theme=>theme.breakpoints.up('md')),
		sm:useMediaQuery<Theme>(theme=>theme.breakpoints.up('sm')),
		xs:true, //everything is xs 
	}
	for (const i of pemdas){ //this enforces the order
		if(!keys.has(i)) continue
		if(sizes[i]) return i;
	}
	return 'xs'; //if all else fails
}

type BreakPointFetcher<T> = ()=>T
type BreakPointValue<T> = T | BreakPointFetcher<T>

type BreakPointRecord<T> = Record<BreakPoint, BreakPointValue<T>>
type BreakPointActions<T> = Pick<BreakPointRecord<T>, "xs"> & Partial<BreakPointRecord<T>> //xs is the fallthrough


export const useBreakPointValue = <T>(actions: BreakPointActions<T>):T => {
	const bk = useBreakpoint(new Set(Object.keys(actions) as BreakPoint[]));
	const action = actions[bk]!;

	return typeof actions === 'function' ? (action as BreakPointFetcher<T>)():action as T;
}

