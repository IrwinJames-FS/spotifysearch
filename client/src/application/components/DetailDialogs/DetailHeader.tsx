import { FC, ReactNode } from "react";
import { DetailsList, Title } from "./common.ui";
import { Image } from "../Image";

type DetailHeaderProps = {
	name: string
	images?: Spotify.Image[],
	children?: ReactNode
}

export const DetailHeader: FC<DetailHeaderProps> = ({name, images, children}) => {
	const s = {xs: 64, md: 256};
	return (<Title>
		<Image {...{size: 'lg', images: images, alt: name, sx:{
			width: s,
			height: s
		}}}/>
		<DetailsList>
			{children}
		</DetailsList>
	</Title>)
}