import { DialogTitle, DialogTitleProps, Skeleton, Stack, StyledComponentProps, TableCell, Theme, Typography, TypographyProps } from "@mui/material";
import { FC, useMemo } from "react";
import { ParentElement, TrackResult } from "../common.types";
import { Img } from "../ImageSlider";
import { useImages } from "../../hooks/useImages";
import { Flex, FlexProps } from "../Flex";
import { styled } from "@mui/system";
import { TR } from "../TR";

export const T: FC<TypographyProps> = ({sx, ...props}) => (<Typography sx={{bgcolor:'overlays.300', p:1, ...sx}} {...props}/>);
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
	color: theme.palette.text.primary
}));

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