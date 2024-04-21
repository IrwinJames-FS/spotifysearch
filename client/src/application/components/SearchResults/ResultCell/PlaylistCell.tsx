import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { PlaylistResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";


export const PlaylistCell: FC<{item: PlaylistResult, onClick: (item: PlaylistResult)=>void}> = ({item, onClick}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name} onClick={()=>onClick(item)}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Tracks" value={item.tracks.total}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}