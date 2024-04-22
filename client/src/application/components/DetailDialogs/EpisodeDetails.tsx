import { FC } from "react";
import { EpisodeItem } from "./types";
import { DetailsList, Image, T, Title } from "./common.ui";
import { dx } from "../../utils/dx";

export const EpisodeDetails: FC<EpisodeItem> = ({name, description, duration_ms, images}) => {
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T>{description}</T>
			<T>{dx(duration_ms*10)}</T>
		</DetailsList>
	</Title>
	</>)
}