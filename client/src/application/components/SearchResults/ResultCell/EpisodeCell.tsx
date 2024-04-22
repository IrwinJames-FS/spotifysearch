import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { EpisodeResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";
import { dx } from "../../../utils/dx";

export const EpisodeCell: FC<{item: EpisodeResult, onClick: (item: EpisodeResult)=>void}> = ({item, onClick}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name} onClick={()=>onClick(item)}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Duration" value={dx(item.duration_ms)}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}