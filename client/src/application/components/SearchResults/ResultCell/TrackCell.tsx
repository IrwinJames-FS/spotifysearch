import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { TrackResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";

export const TrackCell: FC<{item: TrackResult}> = ({item}) => {
	const img = useImage(item.album.images);
	return (<Card>
		<CardActionArea title={item.name}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Track" value={`${item.track_number}/${item.album.total_tracks}`}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}