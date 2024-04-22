import { FC } from "react";
import { TrackResultLite } from "../common.types";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { dx } from "../../utils/dx";
import { PlayArrow } from "@mui/icons-material";
import { play } from "../../utils/api";

export const TrackTable: FC<{tracks:TrackResultLite[], device_id: string}> = ({tracks, device_id}) => {
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
				{tracks.map((track, i) => <TableRow key={i}>
					<TableCell>{i+1}</TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell>{dx(track.duration_ms*10)}</TableCell>
					<TableCell><Tooltip title="Play now!"><IconButton color="primary" onClick={()=>play([track.uri], device_id)}> <PlayArrow/> </IconButton></Tooltip></TableCell>
				</TableRow>)}
			</TableBody>
		</Table>
	</TableContainer>)
}