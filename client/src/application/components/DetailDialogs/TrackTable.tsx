import { FC } from "react";
import { TrackResultLite } from "../common.types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dx } from "../../utils/dx";
import { PlayButton } from "../PlayButton";
import { TR } from "../TR";
import { LoadingList } from "./common.ui";
import { EnqueueButton } from "../EnqueueButton";
import { useSpoty } from "../../Spoty/SpotyContext";

export const TrackTable: FC<{tracks?:TrackResultLite[], context:string, length:number}> = ({tracks, length, context}) => {
	const { isLocal } = useSpoty();
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell sx={{width: 48, textAlign: 'center'}}>Track</TableCell>
					<TableCell>Name</TableCell>
					<TableCell sx={{width: 128, textAlign: 'center'}}>Time</TableCell>
					{isLocal && <TableCell sx={{width: 64}}></TableCell>}
				</TableRow>
			</TableHead>
			<TableBody>
				{!!tracks ? tracks?.map((track, i) => <TR index={i} key={i}>
					<TableCell sx={{textAlign: 'center'}}>{i+1}</TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell sx={{textAlign: 'center'}}>{dx(track.duration_ms)}</TableCell>
					{isLocal && <TableCell sx={{display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems:'center'}}>
						<PlayButton contextUri={context} offset={{uri:track.uri}} placement="left"/>
						<EnqueueButton uris={track.uri}/>
					</TableCell>}
				</TR>):<LoadingList length={length}/>}
			</TableBody>
		</Table>
	</TableContainer>)
}
