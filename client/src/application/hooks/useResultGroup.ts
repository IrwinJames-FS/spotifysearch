import { useCallback, useEffect, useRef, useState } from "react";
import { ResultItem, SearchResultGroup } from "../components/common.types";
import { next } from "../utils/api";


export const useResultGroup = <T extends ResultItem>(g: SearchResultGroup<T>): [boolean, Error | undefined, SearchResultGroup<T>, (uri?: string)=>Promise<void>] => {
	const [{loading, error, group}, setState] = useState<{group:SearchResultGroup<T>, loading: boolean, error?: Error}>({group:g, loading:false});
	//I am not getting into ephemeral requests but this means this is always a possibility to unintentional duplicates within the result list. 
	const ld = useRef(false);
	const nxt = useCallback(async (uri?:string)=>{
		if(!uri || ld.current) return;
		ld.current = true;
		setState(({group})=>({group, loading: true}));
		try{
			const {items, ...g} = await next(uri);
			setState(({group})=>({
				loading: false,
				group: {
					...g as Omit<SearchResultGroup<T>, "items">,
					items: [...group.items, ...items]
				} as SearchResultGroup<T>
			}))
		} catch (error) {
			setState(({group})=>({group, loading: false, error: error as Error}));
		}
		
	}, [setState]);
	useEffect(()=>{
		if(!loading) ld.current = false
	}, [loading])
	return [loading, error, group, nxt]
}