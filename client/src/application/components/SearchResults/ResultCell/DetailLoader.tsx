
import { FC, ReactNode, useCallback } from "react";
import { useDetails } from "../../../DetailContainer";
import { getItem } from "../../../utils/api";
import { CardActionArea } from "../common";
import { Image } from "../../Image";
import { ResultItem } from "../../common.types";

export type DetailLoaderProps = {
	item: ResultItem
	images?: Spotify.Image[]
	children?: ReactNode
}
export const DetailLoader: FC<DetailLoaderProps> = ({item:{type, id, name, images:imgs}, images, children}) => {
	const {setDetails} = useDetails();
	const onClick = useCallback(async () => {
		try{
			const item = await getItem(type, id);

			setDetails({...item});
		} catch (error) {
			console.log("Implement Toast");
		}
	}, [setDetails, id, type]);
	return (<CardActionArea {...{name, onClick}}>
		<Image {...{images: images ?? imgs, alt: name, size: 'lg', sx:{
			width: '100%',
			aspectRatio: '1/1'
		}}}/>
		{children}
	</CardActionArea>)
}