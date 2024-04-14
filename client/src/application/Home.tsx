import { Forward, Search } from "@mui/icons-material";
import { Toolbar, TextField, InputAdornment, IconButton, Typography, Button } from "@mui/material";
import { useApplication } from "./Application"
import { ResultsGrid, Topbar } from "./components";
import { useInputValue } from "./hooks/useInputValue";
import { useCallback } from "react";

export const Home = () => {
	const {user, setQ} = useApplication();
	const [value, onChange] = useInputValue('');
	const onClick = useCallback(() => {
		let v = value.trim();
		if(!v) return;
		setQ(v);
	}, [setQ, value]);
	return (<>
	<Topbar>
	{user && (<Toolbar sx={{color:"inherit", gap: 1, alignItems: 'center'}} disableGutters>
		<TextField color="primary" {...{
			value,
			onChange,
			InputProps: {
				startAdornment: <InputAdornment color="inherit" position="start">
					<Search color="inherit"/>
				</InputAdornment>,
				endAdornment: <InputAdornment color="inherit" position="end">
					<IconButton {...{onClick}}><Forward/></IconButton>
				</InputAdornment>
			}
		}}/>
		<Typography color="inherit">{user.displayName}</Typography>
	</Toolbar>)}
		{!user && (<>
		<Button color="inherit" component="a" href="http://localhost:3001/api/v1/auth">Sign In</Button>
		</>)}
	</Topbar>
	<ResultsGrid/>
	</>)
}