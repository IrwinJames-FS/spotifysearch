import { Button, ListItemButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { useApplication } from "../Application"
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { ArrowRight } from "@mui/icons-material";

export const UserButton = () => {
	const { user } = useApplication();
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);
	const open = useMemo(()=>!!anchor, [anchor]);
	const toggle = useCallback((e:MouseEvent<HTMLElement>) => setAnchor(el=>!!el ? null:e.currentTarget), [setAnchor])
	return user ? (<>
	<Button color="inherit" onClick={toggle} endIcon={<ArrowRight sx={{
		transition: theme=>theme.transitions.create('transform', {
			duration: 2e2,
			easing: theme.transitions.easing.sharp
		}),
		transform: `rotate(${open ? '90':'0'}deg)`
	}}/>}>{user.displayName}</Button>
	<Menu anchorEl={anchor} open={open} onClose={toggle}>
		<ListItemButton component="a" href="/api/v1/auth/signout">Sign Out</ListItemButton>
	</Menu>
	</>):(<Button color="inherit" component={"a"} href="/api/v1/auth">Sign In</Button>)

}