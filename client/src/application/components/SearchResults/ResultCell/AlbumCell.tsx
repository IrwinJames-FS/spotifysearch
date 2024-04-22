import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent } from "../common";
import { AlbumResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";
import { DetailCell } from "./DetailCell";
import { useImages } from "../../../hooks/useImages";

export const AlbumCell: FC<{item: AlbumResult, onClick: (item:AlbumResult) => void}> = ({item, onClick}) => {
	const i = useImages(item.images, item.name, "lg")
	const img = useImage(item.images);
	return (<DetailCell {...{title: item.name, id: item.id, type: 'album'}}>
			{img && <Img src={img.src}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Tracks" value={item.total_tracks}/>
			</CaptionArea>
	</DetailCell>)
}