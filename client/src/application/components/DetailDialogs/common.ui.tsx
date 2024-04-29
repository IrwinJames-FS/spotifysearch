import { CardActionArea, Collapse, DialogTitle, DialogTitleProps, Skeleton, Stack, StyledComponentProps, TableCell, Typography, TypographyProps } from "@mui/material";
import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useRef } from "react";
import { Img } from "../ImageSlider";
import { useImages } from "../../hooks/useImages";
import { Flex } from "../Flex";
import { styled } from "@mui/system";
import { TR } from "../TR";
import { useBool } from "../../hooks/useBool";
import { ChevronRight } from "@mui/icons-material";
import { CopyrightResult } from "../common.types";
import { MarketIcon } from "../MarketIcon";


export const T = styled(Typography)(({theme})=>({
	backgroundColor: theme.palette.overlays[300],
	color: theme.palette.text.primary,
	padding: '0.25rem',
}))
export const Title: FC<DialogTitleProps> = ({sx, children, ...props}) => (<DialogTitle sx={{bgcolor: 'primary.main', color: 'primary.contrastText', ...sx}} {...props}>
	<Stack direction="row" maxHeight={256} gap={1} justifyContent="space-between">
		{children}
	</Stack>
</DialogTitle>)

export const DetailsList = styled(Stack)({
	flexGrow: 1,
	overflowY: 'scroll',
	gap:'1rem',
	maxHeight: '100%'
})


export const Fx = styled(Flex)(({theme})=>({
	backgroundColor: theme.palette.overlays[300],
	color: theme.palette.text.primary,
	padding: '0.25rem'
}));


export const Clx: FC<{title: ReactNode, children?: ReactNode}> = ({title, children}) => {
	const [open, toggle] = useBool();
	const ref = useRef<HTMLButtonElement | null>(null);
	useEffect(()=>{
		if (open) setTimeout(()=>ref.current?.parentElement?.scrollIntoView({block: "end", inline: "end"}), 2e2)
	}, [open]);
	return (<Fx sx={{maxHeight: 256, padding: 0}}>
		<CardActionArea ref={ref} onClick={toggle} sx={{padding: 1}}>
			<Flex row split>
				<Typography fontWeight="bold">{title}</Typography>
				<ChevronRight sx={{
					transition: theme=>theme.transitions.create('transform', {
						easing: theme.transitions.easing.sharp,
						duration: open ? theme.transitions.duration.leavingScreen:theme.transitions.duration.enteringScreen
					}),
					transform: `rotate(${open ? 0:90}deg)`
				}}/>
			</Flex>
		</CardActionArea>
		<Collapse in={open} sx={{overflowY:'scroll'}} mountOnEnter unmountOnExit>
			{children}
		</Collapse>
	</Fx>)
}

export const Image: FC<{images: Spotify.Image[] | undefined, size?: "sm" | "md" | "lg" | number, alt?: string, sx?:Record<string, any>} & StyledComponentProps<"img">> = ({images, alt, size, sx, ...props}) => {
	const image = useImages(images, alt, size)
	return image ? (<Img {...props} {...image} sx={sx ?? {width: 256, height:256}} />):null;
}

export const LoadingList: FC<{length: number}> = ({length}) => {
	return (<>
	{new Array(length).fill(null).map((_, i)=><TR key={i} index={i}>
		<TableCell colSpan={4}><Skeleton width="100%" height={48} variant="rounded"/></TableCell>
	</TR>)}
	</>);
}

export const CopyRight: FC<{copyrights: CopyrightResult[]}> = ({copyrights}) => {
	return (<>{copyrights.map((c, i)=><Typography key={i} paragraph>{c.text}</Typography>)}</>)
}

export const Markets: FC<{markets: string[]}> = ({markets}) => {
	return (<>{markets.map((m, i)=><MarketIcon code={m} key={i}/>)}</>);
}