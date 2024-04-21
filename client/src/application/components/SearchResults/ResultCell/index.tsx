import { CircularProgress } from "@mui/material"
import { AlbumResult, ArtistResult, AudioBookResult, EpisodeResult, PlaylistResult, ResultItem, ShowResult, TrackResult } from "../../common.types"
import { FC } from "react"
import { ArtistCell } from "./ArtistCell"
import { Card, CardContent } from "../common"
import { PlaylistCell } from "./PlaylistCell"
import { EpisodeCell } from "./EpisodeCell"
import { TrackCell } from "./TrackCell"
import { AlbumCell } from "./AlbumCell"
import { AudiobookCell } from "./AudiobookCell"
import { ShowCell } from "./ShowCell"
import { Flex } from "../../Flex"

/**
 * The result cell will ultimately evaluate the type and delegate the result set to its specialized cell
 * @param param0 
 * @returns 
 */
export const ResultCell: FC<{item?: ResultItem, onPlay:(item: ResultItem)=>void, onClick: (item: ResultItem)=>void}> = ({item, onClick, onPlay}) => {
	switch (item?.type) {
		case 'album': return (<AlbumCell item={item as AlbumResult} onClick={onPlay}/>);
		case 'artist': return (<ArtistCell item={item as ArtistResult} onClick={onPlay}/>);
		case 'audiobook': return (<AudiobookCell item={item as AudioBookResult}/>);
		case 'episode': return (<EpisodeCell item={item as EpisodeResult}/>);
		case 'playlist': return (<PlaylistCell item={item as PlaylistResult} onClick={onPlay}/>);
		case 'show': return (<ShowCell item={item as ShowResult}/>);
		case 'track': return (<TrackCell item={item as TrackResult} onClick={onClick}/>);
		default: return (<Card>
			<CardContent>
				<Flex fill center>
					<CircularProgress/>
				</Flex>
			</CardContent>
		</Card>);
	}
}