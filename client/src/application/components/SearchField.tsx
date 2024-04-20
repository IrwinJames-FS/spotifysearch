import { Forward, Search } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useInputValue } from "../hooks/useInputValue"
import { FC, KeyboardEventHandler, useCallback } from "react";

export const SearchField: FC<{onSearch:(value: string)=>void}> = ({onSearch}) => {
	const [value, onChange] = useInputValue("");
	const submit = useCallback(()=> {
		return onSearch(value);
	}, [onSearch, value])
	const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((e)=>{
		if(e.key === 'Enter') return submit();
	}, [submit]);

	return (<TextField {...{
		value, onChange,
		onKeyDown,
		InputProps: {
			startAdornment: <InputAdornment position="start">
			<Search/>
			</InputAdornment>,
			endAdornment: <InputAdornment position="end">
				<IconButton onClick={submit}><Forward/></IconButton>
			</InputAdornment>
		}
	}}/>)
}