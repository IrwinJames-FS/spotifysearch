import { FC, ReactNode, useMemo } from "react";
import { useApplication } from "../Application";
import { AlbumResult, ArtistResult, AudioBookResult, EpisodeResult, PlaylistResult, ResultItem, SearchResult, SearchResultGroup, ShowResult, TrackResult } from "./common.types";
import { Box, Card, CardActionArea, CircularProgress, Divider, Grid, Stack, Tooltip, Typography, styled, useTheme } from "@mui/material";
import { dx } from "../utils/dx";
import { useImage } from "../hooks/useImage";
import { Flex } from "./Flex";

/**
 * Results will display lists based on which group had the most results
 * @returns 
 */
export const ResultsGrid = () => {
	const {resultLoading, resultError, result} = useApplication();
	const sorted = useMemo(()=>{
		if(!result) return;
		return Object.keys(result).sort((a, b) => {
			return result[b as keyof SearchResult].total - result[a as keyof SearchResult].total;
		})
	}, [result])
	return (<>
	{resultLoading && <Flex fill center>
		<CircularProgress/>
	</Flex>}
	{resultError && <h1>Error</h1>}
	{sorted && <Grid container>
		{sorted.map(key=><GroupGrid key={key} title={key} group={result![key as keyof SearchResult]}/>)}

	</Grid>}
	</>);
}

type GroupGridProps = {
	title: string
	group: SearchResultGroup<ResultItem>
}

const GroupGrid: FC<GroupGridProps> = ({title, group}) => {
	return (<>
	<GroupTitle {...{title, group}}/>
	<GroupItems group={group}/>
	</>)
}

const GroupTitle: FC<GroupGridProps> = ({title, group}) => {
	return (<Grid item sx={{p:1}} xs={12}>
		<Card sx={{p:1}}>
			<Typography variant="h5">{title} ({group.total})</Typography>
		</Card>
	</Grid>)
}

type GroupItemsProps = {
	items: ResultItem[]
}

const GroupItems: FC<{group: SearchResultGroup<ResultItem>}> = ({group}) => {
	return (<Grid item sx={{
		p: 1,
		overflowX:'hidden',
	}} xs={12}>
		<Stack direction="row" justifyContent="flex-start" sx={{
			overflowX: 'scroll',
		}}>
			{group.items.map(item=>{
			 return <GroupItem key={`${item.id}`} item={item}/>
			})}
		</Stack>
	</Grid>)
}
const GroupItem: FC<{item: ResultItem}> = ({item}) => {
	const theme = useTheme();
	const image = useImage((item.images && item.images!.length) ? item.images[0]:undefined)
	if(item.type === 'track') {
		console.log(item);
	}
	switch(item.type) {
		case 'artist': return (<ArtistItem {...{item: item as ArtistResult, image}}/>);
		case 'show': return (<ShowItem {...{item: item as ShowResult, image}}/>);
		case 'audiobook': return (<AudioBookItem {...{item: item as AudioBookResult, image}}/>);
		case 'track': return (<TrackItem {...{item: item as TrackResult}}/>);
		case 'album': return (<AlbumItem {...{item: item as AlbumResult, image}}/>);
		case 'episode': return (<EpisodeItem {...{item: item as EpisodeResult, image}}/>);
		case 'playlist': return (<PlaylistItem {...{item: item as PlaylistResult, image}}/>);
		default: return (<CardSlot img={image} title={item.name}>
			<Typography>{item.name}</Typography>
		</CardSlot>);
	}
	
}

const ArtistItem: FC<{item: ArtistResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Popularity</Typography>
			<Typography>{item.popularity}</Typography>
		</Stack>
	</CardSlot>)
}
const ShowItem: FC<{item: ShowResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Episodes</Typography>
			<Typography>{item.total_episodes}</Typography>
		</Stack>
	</CardSlot>)
}
const AudioBookItem: FC<{item: AudioBookResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Chapters</Typography>
			<Typography>{item.total_chapters}</Typography>
		</Stack>
	</CardSlot>)
}
const TrackItem: FC<{item: TrackResult}> = ({item}) => {
	const image = useImage((item.album.images && item.album.images.length) ? item.album.images[0]:undefined);
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Track/Tracks</Typography>
			<Typography>{item.track_number}/{item.album.total_tracks}</Typography>
		</Stack>
	</CardSlot>)
}
const EpisodeItem: FC<{item: EpisodeResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 80}}>
			<Typography sx={{fontSize:8}}>Duration</Typography>
			<Typography>{dx(item.duration_ms)}</Typography>
		</Stack>
	</CardSlot>)
}
const PlaylistItem: FC<{item: PlaylistResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Tracks</Typography>
			<Typography>{item.tracks.total}</Typography>
		</Stack>
	</CardSlot>)
}



const AlbumItem: FC<{item: AlbumResult, image?: ImgProps}> = ({item, image}) => {
	return (<CardSlot img={image} title={item.name}>
		<Typography sx={{flex: 1, p: 1, height:32, textOverflow: 'ellipsis'}}>{item.name}</Typography>
		<Divider orientation="vertical"/>
		<Stack alignItems="center" sx={{px:1, width: 64}}>
			<Typography sx={{fontSize:8}}>Tracks</Typography>
			<Typography>{item.total_tracks}</Typography>
		</Stack>
	</CardSlot>)
}
type ImgProps = {
	src: string,
	height: number
}
export const CardSlot: FC<{img?: ImgProps, children: ReactNode, title: string, justifyContent?:string}> = ({img, title, justifyContent="center", children}) => {
	
	return (<Box sx={{
		display:'inline-flex',
		p:1
	}}>
		<Card sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-start'}}>
			<Tooltip sx={{height: '100%'}} title={title}>
				<CardActionArea sx={{
					flexGrow:1, 
					display: 'flex', 
					justifyContent: 'flex-start', 
					flexDirection: 'column',
					width: theme=>theme.constants.gridCellWidth,
					height: theme=>theme.constants.gridCellHeight,
					position: 'relative'}}>
					{img && <Img sx={{
						width: '100%'
					}} src={img.src} alt={title}/>}
					<Stack sx={{position: 'absolute', top:0, left: 0, right: 0, bottom: 0}} justifyContent="flex-end">
						<Stack sx={{minHeight: theme=>theme.constants.gridCellHeight-(img?.height ?? theme.constants.gridCellWidth), bgcolor: 'overlays.900', backdropFilter: 'blur(8px)'}} direction="row" justifyContent={justifyContent} alignItems="center">
							{children}
						</Stack>
					</Stack>
				</CardActionArea>
			</Tooltip>
		</Card>
	</Box>)
}
const Img = styled('img', {shouldForwardProp: (_)=>true})({})

