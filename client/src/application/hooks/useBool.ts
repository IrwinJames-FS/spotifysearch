import { Dispatch, SetStateAction, useCallback, useState } from "react";

type ToggleMethod = ()=>void
/**
 * @param initial 
 * @returns 
 */
export const useBool = (initial: boolean = false): [boolean, ToggleMethod, Dispatch<SetStateAction<boolean>>] => {
	const [b, setB] = useState<boolean>(initial);
	const toggle = useCallback(()=>setB(b=>!b), [setB]);
	return [b, toggle, setB]
}