import { Button, ListItemButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { useApplication } from "../Application"
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import qs from 'qs';


const useUrl = (): string => {
	const {pathname, search} = useLocation();
	const {hostname, port, protocol} = window.location;
	return `${protocol}//${hostname}${port && ':'+port}${pathname}${search}`;
}

export const UserButton = () => {
	const { user } = useApplication();
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);
	const open = useMemo(()=>!!anchor, [anchor]);
	const referrer = useUrl();
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
		<ListItemButton component="a" href={`http://localhost:3001/api/v1/auth/signout?${qs.stringify({referrer})}`}>Sign Out</ListItemButton>
	</Menu>
	</>):(<Button color="inherit" component={"a"} href={`http://localhost:3001/api/v1/auth?${qs.stringify({referrer})}`}>Sign In</Button>)

}