import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { AudioBookResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";

export const AudiobookCell: FC<{item: AudioBookResult}> = ({item}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Chapters" value={item.total_chapters}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}