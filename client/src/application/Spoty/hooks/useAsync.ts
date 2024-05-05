import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"

export type AsyncState<T> = {
	loading: boolean,
	error?: Error
	data?: T
}

export const useAsync = <T>(callback: ()=>Promise<T>): [boolean, Error | undefined, T | undefined, ()=>void, Dispatch<SetStateAction<AsyncState<T>>>] => {
	const [{loading, error, data}, setState] = useState<AsyncState<T>>({loading: true});
	const cb = useCallback(async ()=>{
		setState(s=>({...s, loading: true}));
		try {
			const data = await callback();
			setState({loading: false, data});
		} catch (error) {
			return setState({loading: false, error: error as Error});
		}
	}, [callback]);

	useEffect(()=>{
		cb();
	}, [cb]);

	return [loading, error, data, cb, setState];
}