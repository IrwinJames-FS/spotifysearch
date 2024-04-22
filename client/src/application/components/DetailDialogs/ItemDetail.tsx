import { FC } from "react"
import { DetailsState } from "./types"
import { DialogTitle } from "@mui/material"

export const ItemDetail: FC<DetailsState> = ({name, ...item}) => {
	console.log(item);
	return (<>
		<DialogTitle sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>{name}</DialogTitle>
	</>)
}