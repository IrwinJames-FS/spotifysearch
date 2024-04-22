import { FC } from "react";
import { ArtistItem } from "./types";
import { DetailsList, Image, T, Title } from "./common.ui";
import { commafy } from "../../utils/strings";

export const ArtistDetail: FC<ArtistItem> = ({images, name, followers, genres, popularity, ...rest}) => {
	console.log(rest);
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T><b>Followers</b> {commafy(`${followers.total}`)}</T>
			<T><b>Popularity</b> {popularity}</T>
			<T><b>Genres</b> {genres.join(', ')}</T>
		</DetailsList>
	</Title>
	</>)
}