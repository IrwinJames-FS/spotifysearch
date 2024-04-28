import { FC } from "react";
import { useImages } from "../hooks/useImages";
import { Img } from "./ImageSlider";
import { StyledComponentProps } from "@mui/material";

export type ImageSizeKey = "sm" | "md" | "lg"
export const Image: FC<{images: Spotify.Image[] | undefined, size?: ImageSizeKey | number, alt?: string, sx?:Record<string, any>} & StyledComponentProps<"img">> = ({images, alt, size, sx, ...props}) => {
	const image = useImages(images, alt, size)
	return image ? (<Img {...props} {...image} sx={sx ?? {width: 256, height:256}} />):null;
}