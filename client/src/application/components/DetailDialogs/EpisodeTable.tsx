import { FC } from "react";
import { EpisodeResult } from "../common.types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dx } from "../../utils/dx";

export const EpisodeTable: FC<{tracks:EpisodeResult[]}> = ({tracks}) => {
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell>Track</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Time</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{tracks.map((track, i) => <TableRow key={i}>
					<TableCell>{i+1}</TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell>{dx(track.duration_ms*10)}</TableCell>
				</TableRow>)}
			</TableBody>
		</Table>
	</TableContainer>)
}