import { FC } from "react";
import { EpisodeResult } from "../common.types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dx } from "../../utils/dx";
import { Image } from "./common.ui";

export const EpisodeTable: FC<{episodes:EpisodeResult[]}> = ({episodes}) => {
	console.log(episodes)
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell sx={{textAlign: 'center'}}>#</TableCell>
					<TableCell/>
					<TableCell>Name</TableCell>
					<TableCell>Time</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{episodes.map((track, i) => <TableRow key={i}>
					<TableCell sx={{textAlign: 'center', width: 32}}>{i+1}</TableCell>
					<TableCell><Image {...{images: track.images, size:'sm'}} sx={{width: 48, height: 48}}/></TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell>{dx(track.duration_ms*10)}</TableCell>
				</TableRow>)}
			</TableBody>
		</Table>
	</TableContainer>)
}