import { FC } from "react";
import { ArtistItem } from "./types";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { commafy } from "../../utils/strings";
import { PlayButton } from "../PlayButton";
import { useSpoty } from "../../Spoty/SpotyContext";

export const ArtistDetail: FC<ArtistItem> = ({images, name, followers, genres, popularity, uri}) => {
	//The api says it accept artists as context_uris however there is little to no documentation on how that works. Therefore I am not sure if this will do anything
	const { isLocal } = useSpoty();
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			{isLocal && <Fx row slim>
				<PlayButton contextUri={uri}/>
			</Fx>}
			<T>{name}</T>
			<T><b>Followers</b> {commafy(`${followers.total}`)}</T>
			<T><b>Popularity</b> {popularity}</T>
			<T><b>Genres</b> {genres.join(', ')}</T>
		</DetailsList>
	</Title>
	</>)
}