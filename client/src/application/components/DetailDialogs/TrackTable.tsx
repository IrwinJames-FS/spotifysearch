import { FC } from "react";
import { TrackResultLite } from "../common.types";
import { IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { dx } from "../../utils/dx";
import { PlayArrow } from "@mui/icons-material";
import { play } from "../../utils/api";

export const TrackTable: FC<{tracks?:TrackResultLite[], context:string, length:number, device_id: string}> = ({tracks, length, device_id, context}) => {
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell>Track</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Time</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{!!tracks ? tracks.map((track, i) => <TableRow key={i}>
					<TableCell>{i+1}</TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell>{dx(track.duration_ms*10)}</TableCell>
					<TableCell>{!!device_id && <Tooltip title="Play now!"><IconButton color="primary" onClick={()=>play(device_id, context, track.uri)}> <PlayArrow/> </IconButton></Tooltip>}</TableCell>
				</TableRow>):<LoadingList length={length}/>}
			</TableBody>
		</Table>
	</TableContainer>)
}

const LoadingList: FC<{length: number}> = ({length}) => {
	return (<>
	{new Array(length).fill(null).map((_, i)=><TableRow key={i}>
		<TableCell colSpan={4}><Skeleton width="100%"/></TableCell>
	</TableRow>)}
	</>);
}