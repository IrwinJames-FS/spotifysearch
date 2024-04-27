
import { FC, ReactNode, useCallback } from "react";
import { useDetails } from "../../../DetailContainer";
import { usePlayer } from "../../Player";
import { getItem } from "../../../utils/api";
import { CardActionArea } from "../common";
import { PlayImage } from "../../../hooks/usePlayerController";
import { Image } from "../../Image";
import { ResultItem } from "../../common.types";
import { useSpotifyPlayer } from "../../SpotifyPlayer";

export type DetailLoaderProps = {
	item: ResultItem
	images?: Spotify.Image[]
	children?: ReactNode
}
export const DetailLoader: FC<DetailLoaderProps> = ({item:{type, id, name, images:imgs}, images, children}) => {
	const {setDetails} = useDetails();
	const {device_id} = useSpotifyPlayer();
	const onClick = useCallback(async () => {
		try{
			const item = await getItem(type, id);

			setDetails({...item, device_id});
		} catch (error) {
			console.log("Implement Toast");
		}
	}, [setDetails, device_id, id, type]);
	return (<CardActionArea {...{name, onClick}}>
		<Image {...{images: images ?? imgs, alt: name, size: 'lg'}}/>
		{children}
	</CardActionArea>)
}