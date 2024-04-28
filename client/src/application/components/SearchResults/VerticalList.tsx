import { FC, UIEvent, UIEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AutoItem, ResultItem, SearchResultGroup } from "../common.types";
import { Box, Card, Stack, Toolbar, Typography, capitalize, useTheme } from "@mui/material";
import { Flex } from "../Flex";
import { ResultCell } from "./ResultCell";
import { useResultGroup } from "../../hooks/useResultGroup";
import { CardActionArea } from "./common";
import { Refresh } from "@mui/icons-material";
import { getItem, play } from "../../utils/api";
import { usePlayer } from "../Player";
import { useDetails } from "../../DetailContainer";
import { useBreakPointValue } from "../../hooks/useBreakPoint";

export const VerticalList: FC<{title: string, group: SearchResultGroup<AutoItem>}> = ({title, group}) => {
	const [loading, error, grp, next] = useResultGroup(group);
	const {setDetails} = useDetails();
	const ref = useRef<HTMLDivElement | null>(null);
	const { device_id, setToast } = usePlayer();
	const [width, setWidth] = useState(0);
	const gWidth = useBreakPointValue({xs: 128, md: 256});
	const bf = useBreakPointValue({xs: 2, md: 4});
	const loadOffset = useBreakPointValue({xs: 900})
	const cellWidth = useMemo(()=>gWidth+8, [gWidth]);
	const [{start, end}, setBounds] = useState<{start: number, end: number}>({start: 0, end: 0});

	const updatePointers = useCallback(()=> {
		if(!ref.current) return;
		//updating the pointers is a little tricker then Horizontally need to get the number of cells in a row
		const rowSize = Math.floor(ref.current.clientWidth/cellWidth);
		//Get the number of cells between top of scroll to current position
		const s = Math.floor(ref.current.scrollTop/cellWidth)*rowSize;
		const maxV = Math.ceil(ref.current.clientHeight+cellWidth/cellWidth);
		
		const start = s <= bf ? 0:s-bf
		const end = start + (maxV*rowSize);
		setBounds({start, end});
	}, [cellWidth, bf])

	//No point in using current target since I have cached a reference of t he element
	const onScroll = useCallback(()=>{
		updatePointers();
		if(loading || !grp || !ref.current) return;
		const tl = ref.current.scrollTop+ref.current.clientHeight;
		const ttl = ref.current.scrollHeight-loadOffset;
		if(tl >= ttl) {
			console.log("load more");
			next(grp.next)
		}
	}, [loadOffset, loading, grp, next, updatePointers]);

	
	const onResize = useCallback(()=>{
		if(!ref.current) return;
		setWidth(ref.current.clientWidth);
	}, [setWidth]);


	const nonPlayableClick = useCallback(async (item: ResultItem) => {
		if(!device_id) {
			setToast({open: true, autoHideDuration: 3e3, title: "The player is not currently available", severity: "error"})
			return;
		}
		setDetails({...item, device_id});
	}, [device_id, setToast, setDetails]);

	useEffect(()=>{
		if(!ref.current) return;
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [onResize]);

	useEffect(()=>{
		//by using on scroll here it should allow for automatic loading if the limit is set to a number less then what is scrollable on a specific screen. 
		onScroll();
	}, [width, onScroll]);

	const data = useMemo(()=>{
		return [... new Array(start).fill(undefined), ...grp.items.slice(start, end), ...new Array(grp.items.length > end ? grp.items.length-end:0).fill(undefined)]
	}, [grp, start, end])
	return (<Box>
	<Card sx={{mb:1}}>
		<Toolbar>
			<Typography variant="h4">{capitalize(title)} - ({group.total})</Typography>
		</Toolbar>
	</Card>
	<Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1} overflow="scroll" onScroll={onScroll} ref={ref} sx={{ bgcolor: '#F00', height:'calc(100dvh - 8rem)', overflowY:'scroll'}}>
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