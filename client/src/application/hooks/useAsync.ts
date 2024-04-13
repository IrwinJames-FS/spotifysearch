import { useCallback, useEffect, useState } from "react"

type AsyncState<T> = {
	loading: boolean,
	error?: Error
	data?: T
}

export const useAsync = <T>(callback: ()=>Promise<T>): [boolean, Error | undefined, T | undefined] => {
	const [{loading, error, data}, setState] = useState<AsyncState<T>>({loading: true});
	const cb = useCallback(async ()=>{
		setState({loading: true});
		try {
			const data = await callback();
			console.log(data);
			setState({loading: false, data});
		} catch (error) {
			return setState({loading: false, error: error as Error});
		}
	}, [callback]);
	useEffect(()=>{
		cb();
	}, [cb]);
	return [loading, error, data];
}