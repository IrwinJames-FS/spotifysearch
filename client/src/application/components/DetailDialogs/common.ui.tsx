import { DialogTitle, DialogTitleProps, Stack, StyledComponentProps, Theme, Typography, TypographyProps } from "@mui/material";
import { FC, useMemo } from "react";
import { ParentElement, TrackResult } from "../common.types";
import { Img } from "../ImageSlider";
import { useImages } from "../../hooks/useImages";

export const T: FC<TypographyProps> = ({sx, ...props}) => (<Typography sx={{bgcolor:'overlays.300', p:1, ...sx}} {...props}/>);
export const Title: FC<DialogTitleProps> = ({sx, children, ...props}) => (<DialogTitle sx={{bgcolor: 'primary.main', color: 'primary.contrastText', ...sx}} {...props}>
	<Stack direction="row" gap={1} justifyContent="space-between">
		{children}
	</Stack>
</DialogTitle>)

export const DetailsList: FC<ParentElement> = ({children}) => {
	return (<Stack sx={{flexGrow:1, maxHeight: 256}} gap={1}>
		{children}
	</Stack>)
}

export const Image: FC<{images: Spotify.Image[] | undefined, size?: "sm" | "md" | "lg" | number, alt?: string, sx?:Record<string, any>} & StyledComponentProps<"img">> = ({images, alt, size, sx, ...props}) => {
	const image = useImages(images, alt, size)
	return image ? (<Img {...props} {...image} sx={sx ?? {width: 256, height:256}} />):null;
}