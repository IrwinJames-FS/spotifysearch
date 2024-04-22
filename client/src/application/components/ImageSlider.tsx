import { Stack, styled } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";

type ImageSliderProps = {
	images?: Spotify.Image[]
}
export const ImageSlider: FC<ImageSliderProps> = ({images=[]}) => {
	
	return images.length ? (<Stack>
		<Stack direction="row">
			{images.map((img, i) => <Img src={img.url} key={i} sx={{width: 64, height: 64}}/>)}
		</Stack>
	</Stack>):null
}
export const Img = styled("img")({})

