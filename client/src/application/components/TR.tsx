import { TableRow } from "@mui/material";
import { FC, ReactNode } from "react";


type TRProps = {
	index: number
	colors?: string[]
	children: ReactNode
}
export const TR: FC<TRProps> = ({index, colors=['overlays.900', 'overlays.A700'], children}) => <TableRow sx={{
	bgcolor: colors[index%2],
	'& td': {
		minHeight: '3rem',
		height: '3rem'
	}
}}>{children}</TableRow>