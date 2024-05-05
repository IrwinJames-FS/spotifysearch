import { FC, UIEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ResultItem, SearchResultGroup } from "../common.types";
import { Box, Card, Stack, Toolbar, Typography, capitalize, useTheme } from "@mui/material";
import { Flex } from "../Flex";
import { ResultCell } from "./ResultCell";
import { useResultGroup } from "../../hooks/useResultGroup";
import { CardActionArea } from "./common";
import { Refresh } from "@mui/icons-material";
import { useDetails } from "../../DetailContainer";
import { useBreakPointValue } from "../../hooks/useBreakPoint";

export const HorizontalList: FC<{title: string, group: SearchResultGroup<ResultItem>}> = ({title, group}) => {
	const [loading, error, grp, next] = useResultGroup(group);
	const {setDetails} = useDetails();
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);
	const gWidth = useBreakPointValue({xs: 128, md: 256});
	const bf = useBreakPointValue({xs: 2, md: 4});
	const loadOffset = useBreakPointValue({xs: 600, md: 900})
	const cellWidth = useMemo(()=>gWidth+8, [gWidth]);
	const maxVis = useMemo(()=>Math.ceil(width/gWidth+bf), [width, gWidth, bf])
	const [{start, end}, setBounds] = useState<{start: number, end: number}>({start: 0, end: 0});
	const updatePointers = useCallback(()=> {
		if(!ref.current) return;
		const s = Math.floor(ref.current.scrollLeft/cellWidth);
		const start = s <= bf ? 0:s-bf
		const end = start + maxVis;
		setBounds({start, end});
	}, [cellWidth, bf, maxVis])

	const onScroll: UIEventHandler<HTMLDivElement> = useCallback(async (e)=>{
		updatePointers();
		if( loading || !grp) return;
		const tl = e.currentTarget.scrollLeft+e.currentTarget.clientWidth;
		const ttl = e.currentTarget.scrollWidth-loadOffset;
		if(tl >= ttl) {
			console.log("load more");
			await next(grp.next);
		}
	}, [loadOffset, loading, grp, next, updatePointers]);

	
	const onResize = useCallback(()=>{
		if(!ref.current) return;
		setWidth(ref.current.clientWidth);
	}, [setWidth]);


	const nonPlayableClick = useCallback(async (item: ResultItem) => {
		setDetails(item);
	}, [setDetails]);

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
		{data.map((item, i)=><ResultCell item={item} key={i}/>)}
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