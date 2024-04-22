import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, Img, NameComponent } from "../common";
import { AudioBookResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";
import { DetailCell } from "./DetailCell";

export const AudiobookCell: FC<{item: AudioBookResult}> = ({item}) => {
	const img = useImage(item.images);
	return (<DetailCell id={item.id} type={item.type} title={item.name}>
		{img && <Img {...{src: img.src, alt: item.name}}/>}
		<CaptionArea justifyContent="center">
			<NameComponent name={item.name}/>
			<CaptionComponent title="Chapters" value={item.total_chapters}/>
		</CaptionArea>
	</DetailCell>)
}