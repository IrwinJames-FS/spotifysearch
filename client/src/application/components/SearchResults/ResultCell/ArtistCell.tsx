import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { ArtistResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";

export const ArtistCell: FC<{item: ArtistResult}> = ({item}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Popularity" value={item.popularity}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}