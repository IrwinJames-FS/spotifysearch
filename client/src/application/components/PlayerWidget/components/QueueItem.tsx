import { FC } from "react";
import { Episode, Track } from "../../../Spoty/spoty.record.types";
import { ListItemButton, ListItemText } from "@mui/material";
import { Image } from "../../Image";

export const QueueItem:FC<{item: Track | Episode, isPlaying?:boolean, onClick?:()=>void}> = ({item, isPlaying, onClick}) => {
	return (<ListItemButton selected={isPlaying} onClick={onClick}>
		<Image images={item.type === 'track' ? item?.album?.images:item?.images} sx={{width: 64, height: 64}}/>
		<ListItemText primary={item?.name} secondary={item?.type === 'track' ? item?.artists.map(a=>a.name).join(', ') + ' - ' + item.album.name:item.show.name + ' - ' + item.show.publisher}/>
	</ListItemButton>)
}