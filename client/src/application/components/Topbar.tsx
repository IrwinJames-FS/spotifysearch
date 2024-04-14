import { AppBar, Toolbar, Typography } from "@mui/material";
import { useApplication } from "../Application";
import { useInputValue } from "../hooks/useInputValue";
import { FC, useCallback } from "react";
import { ParentElement } from "./common.types";


export const Topbar: FC<ParentElement> = ({children}) => {
	return (<>
	<AppBar enableColorOnDark>
		<Toolbar sx={{justifyContent: 'space-between'}}>
			<Typography variant="h4">Search Spotify</Typography>
			{children}
		</Toolbar>
	</AppBar>
	<Toolbar/>
	</>)
}