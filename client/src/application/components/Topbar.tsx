import { AppBar, Toolbar, Typography } from "@mui/material"
import { ParentElement } from "./common.types"

export const Topbar = ({children}:ParentElement) => {
	return (<>
	<AppBar enableColorOnDark>
		<Toolbar>
			<Typography variant="h4">Search Spotify</Typography>
			{children}
		</Toolbar>
	</AppBar>
	<Toolbar/>
	</>)
}