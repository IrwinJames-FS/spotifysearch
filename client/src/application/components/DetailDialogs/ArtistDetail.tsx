import { FC, useCallback } from "react";
import { ArtistItem } from "./types";
import { DetailsList, Fx, Image, T, Title } from "./common.ui";
import { commafy } from "../../utils/strings";
import { TconButton } from "../TconButton";
import { playIt } from "../../utils/api";
import { PlayArrow } from "@mui/icons-material";

export const ArtistDetail: FC<ArtistItem> = ({images, name, followers, genres, popularity, device_id, uri, ...rest}) => {
	//The api says it accept artists as context_uris however there is little to no documentation on how that works. Therefore I am not sure if this will do anything
	const playNow = useCallback(()=>{
		playIt(device_id, {context_uri: uri})
	}, [device_id, uri])
	return (<>
	<Title>
		<Image {...{images, size: 'lg'}}/>
		<DetailsList>
			<T>{name}</T>
			<T><b>Followers</b> {commafy(`${followers.total}`)}</T>
			<T><b>Popularity</b> {popularity}</T>
			<T><b>Genres</b> {genres.join(', ')}</T>
			<Fx row slim>
				<TconButton title="Play now" onClick={playNow}><PlayArrow/></TconButton>
			</Fx>
		</DetailsList>
	</Title>
	</>)
}