import { FC } from "react";
import { TrackResultLite } from "../common.types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dx } from "../../utils/dx";
import { PlayButton } from "../PlayButton";
import { TR } from "../TR";
import { LoadingList } from "./common.ui";

export const TrackTable: FC<{tracks?:TrackResultLite[], context:string, length:number}> = ({tracks, length, context}) => {
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell sx={{width: 48, textAlign: 'center'}}>Track</TableCell>
					<TableCell>Name</TableCell>
					<TableCell sx={{width: 128, textAlign: 'center'}}>Time</TableCell>
					<TableCell sx={{width: 32}}></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{!!tracks ? tracks?.map((track, i) => <TR index={i} key={i}>
					<TableCell sx={{textAlign: 'center'}}>{i+1}</TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell sx={{textAlign: 'center'}}>{dx(track.duration_ms*10)}</TableCell>
					<TableCell><PlayButton contextUri={context} offset={{uri:track.uri}} placement="left"/></TableCell>
				</TR>):<LoadingList length={length}/>}
			</TableBody>
		</Table>
	</TableContainer>)
}
