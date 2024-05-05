import { Dispatch, SetStateAction, useCallback, useState } from "react"

export const useBool = (initial: boolean = false):[boolean, ()=>void, Dispatch<SetStateAction<boolean>>] => {
	const [s, setS] = useState<boolean>(initial);
	const toggle = useCallback(()=>setS(s=>!s), [setS]);
	return [s, toggle, setS];
}