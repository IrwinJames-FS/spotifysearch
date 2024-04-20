import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { AlbumResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";

export const AlbumCell: FC<{item: AlbumResult}> = ({item}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Tracks" value={item.total_tracks}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}