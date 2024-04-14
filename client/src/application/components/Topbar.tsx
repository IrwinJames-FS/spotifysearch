import { AppBar, Button, IconButton, Input, InputAdornment, TextField, Toolbar, Typography } from "@mui/material"
import { useApplication } from "../Application"
import { Forward, Search } from "@mui/icons-material";
import { useInputValue } from "../hooks/useInputValue";
import { search } from "../utils/api";
import { useCallback } from "react";


export const Topbar = () => {
	const { user, setQ } = useApplication();
	const [value, onChange] = useInputValue("");
	const onClick = useCallback(() => {
		let v = value.trim();
		if(!v) return;
		setQ(v);
	}, [setQ, value]);
	return (<>
	<AppBar enableColorOnDark>
		<Toolbar sx={{justifyContent: 'space-between'}}>
			<Typography variant="h4">Search Spotify</Typography>
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
		</Toolbar>
	</AppBar>
	<Toolbar/>
	</>)
}