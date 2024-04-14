import { ChangeEvent, useCallback, useState } from "react"

export const useInputValue = (initialValue: string):[string, (e:ChangeEvent<HTMLInputElement>)=>void] => {
	const [s, setS] = useState(initialValue);
	const cb = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
		setS(e.target.value);
	}, [setS]);
	return [s, cb]
}