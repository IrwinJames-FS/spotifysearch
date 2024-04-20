import { FC } from "react";
import { CaptionArea, CaptionComponent, Card, CardActionArea, Img, NameComponent, NameLabel } from "../common";
import { ShowResult } from "../../common.types";
import { useImage } from "../../../hooks/useImage";

export const ShowCell: FC<{item: ShowResult}> = ({item}) => {
	const img = useImage(item.images);
	return (<Card>
		<CardActionArea title={item.name}>
			{img && <Img {...{src: img.src, alt: item.name}}/>}
			<CaptionArea justifyContent="center">
				<NameComponent name={item.name}/>
				<CaptionComponent title="Episodes" value={item.total_episodes}/>
			</CaptionArea>
		</CardActionArea>
	</Card>)
}