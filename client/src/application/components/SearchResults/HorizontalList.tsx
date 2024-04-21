import { FC, UIEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ResultItem, SearchResultGroup } from "../common.types";
import { Box, Card, Stack, Toolbar, Typography, capitalize, useTheme } from "@mui/material";
import { Flex } from "../Flex";
import { ResultCell } from "./ResultCell";
import { useResultGroup } from "../../hooks/useResultGroup";
import { CardActionArea } from "./common";
import { Refresh } from "@mui/icons-material";
import { play } from "../../utils/api";
import { usePlayer } from "../Player";

export const HorizontalList: FC<{title: string, group: SearchResultGroup<ResultItem>}> = ({title, group}) => {
	const [loading, error, grp, next] = useResultGroup(group);
	const theme = useTheme();
	const ref = useRef<HTMLDivElement | null>(null);
	const { device_id, setToast } = usePlayer();
	const [width, setWidth] = useState(0);
	const cellWidth = useMemo(()=>theme.constants.gridCellWidth+8, [theme.constants.gridCellWidth]);
	const bf = useMemo(()=>theme.constants.horizontalVirtualizeBuffer, [theme.constants.horizontalLoadOffset]);
	const maxVis = useMemo(()=>Math.ceil(width/theme.constants.gridCellWidth+theme.constants.horizontalVirtualizeBuffer), [width, theme.constants])
	const [{start, end}, setBounds] = useState<{start: number, end: number}>({start: 0, end: 0});
	const updatePointers = useCallback(()=> {
		if(!ref.current) return;
		const s = Math.floor(ref.current.scrollLeft/cellWidth);
		const start = s <= bf ? 0:s-bf
		const end = start + maxVis;
		setBounds({start, end});
	}, [cellWidth, bf, maxVis])
	const onScroll: UIEventHandler<HTMLDivElement> = useCallback((e)=>{
		updatePointers();
		if(loading || !grp) return;
		const tl = e.currentTarget.scrollLeft+e.currentTarget.clientWidth;
		const ttl = e.currentTarget.scrollWidth-theme.constants.horizontalLoadOffset
		if(tl >= ttl) {
			next(grp.next)
		}
	}, [theme.constants.horizontalLoadOffset, loading, grp, next, updatePointers]);

	
	const onResize = useCallback(()=>{
		if(!ref.current) return;
		setWidth(ref.current.clientWidth);
	}, [setWidth]);

	const onItemClick = useCallback((item: ResultItem) => {
		if(!device_id) {
			console.log("No device id");
			setToast({open: true, autoHideDuration: 3e3, title: "The player is not currently available", severity: "error"})
			return;
		}
		console.log(item.uri);
		play(item.uri, device_id!)
	}, [device_id]);
	const nonPlayableClick = useCallback((item: ResultItem) => {
		console.log(item);
	}, []);
	useEffect(()=>{
		if(!ref.current) return;
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [onResize]);

	useEffect(()=>{
		updatePointers();
	}, [width, updatePointers]);
	const data = useMemo(()=>{
		return [... new Array(start).fill(undefined), ...grp.items.slice(start, end), ...new Array(grp.items.length > end ? grp.items.length-end:0).fill(undefined)]
	}, [grp, start, end])
	return (<Box>
	<Card sx={{mb:1}}>
		<Toolbar>
			<Typography variant="h4">{capitalize(title)} - ({group.total})</Typography>
		</Toolbar>
	</Card>
	<Stack direction="row" gap={1} overflow="scroll" onScroll={onScroll} ref={ref}>
		{data.map((item, i)=><ResultCell item={item} key={i} onPlay={onItemClick} onClick={nonPlayableClick}/>)}
		{error && <Card>
			<CardActionArea>
				<Flex fill center>
					<Refresh/>
				</Flex>
			</CardActionArea>
		</Card>}
	</Stack>
	</Box>);
}