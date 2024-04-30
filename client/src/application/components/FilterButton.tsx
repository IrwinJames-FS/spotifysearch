import { ArrowRight } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { FC, MouseEventHandler, useMemo, useState } from "react"

const links = [
	['Everything', '/'],
	['Albums', '/album'],
	['Artists', '/artist'],
	['Audiobooks', '/audiobook'],
	['Episodes', '/episode'],
	['Playlist', '/playlist'],
	['Shows', '/show'],
	['Tracks', '/track']
]
/**
 * Kind of a navigation Panel. maybe later will add a multiple select method.
 */
export const FilterButton: FC<{title: string}> = ({title}) => {
	const [anchorEl, setAnchor] = useState<HTMLButtonElement | null>(null);
	const open = useMemo(()=>!!anchorEl, [anchorEl]);
	const onClick: MouseEventHandler<HTMLButtonElement> = e => setAnchor(e.currentTarget);
	const onClose = () => setAnchor(null);
	return (<>
	<Button color="inherit" {...{onClick, endIcon: <ArrowRight sx={{
		transition: theme=>theme.transitions.create('transform', {
			duration: 2e2,
			easing: theme.transitions.easing.sharp
		}),
		transform: `rotate(${open ? '90':'0'}deg)`
	}}/>}}>{title}</Button>
	<Menu {...{open, anchorEl, onClose}}>
		{links.filter(n=>n[0] !== title).map(([lbl, href], i)=><MenuItem key={i} component="a" href={href}>{lbl}</MenuItem>)}
	</Menu>
	</>)
}