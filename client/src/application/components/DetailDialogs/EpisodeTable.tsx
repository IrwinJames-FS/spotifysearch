import { FC } from "react";
import { EpisodeResult } from "../common.types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dx } from "../../utils/dx";
import { Image, LoadingList } from "./common.ui";
import { TR } from "../TR";
import { PlayButton } from "../PlayButton";

export const EpisodeTable: FC<{episodes?:EpisodeResult[], length?: number, context?: string}> = ({episodes, length=0, context}) => {
	return (<TableContainer>
		<Table>
			<TableHead>
				<TableRow sx={{bgcolor: 'overlays.A700'}}>
					<TableCell sx={{textAlign: 'center'}}>#</TableCell>
					<TableCell/>
					<TableCell>Name</TableCell>
					<TableCell>Time</TableCell>
					<TableCell/>
				</TableRow>
			</TableHead>
			<TableBody>
				{!!episodes ? episodes.map((track, i) => <TR key={i} index={i}>
					<TableCell sx={{textAlign: 'center', width: 32}}>{i+1}</TableCell>
					<TableCell><Image {...{images: track.images, size:'sm'}} sx={{width: 48, height: 48}}/></TableCell>
					<TableCell>{track.name}</TableCell>
					<TableCell>{dx(track.duration_ms*10)}</TableCell>
					<TableCell>
						<PlayButton contextUri={context} offset={{uri: track.uri}}/>
					</TableCell>
				</TR>):<LoadingList {...{length}}/>}
			</TableBody>
		</Table>
	</TableContainer>)
}