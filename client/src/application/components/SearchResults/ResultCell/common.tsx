import { FC } from "react";
import { Img as StyledImg } from "../common";
import { PlayImage } from "../../../hooks/usePlayerController";
import { StyledComponentProps } from "@mui/material";

export const  Img: FC<{image?: PlayImage} & StyledComponentProps<"img">> = ({image, ...props}) => {
	return image ? <StyledImg src={image.url} alt={image.alt} {...props}/>:null;
}