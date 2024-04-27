import { Skeleton } from "@mui/material"
import { Card, CardContent } from "../common"

export const LoadingCell = (props: Record<string, any>) => {
	return (<Card>
		<CardContent>
			<Skeleton width={256} height={256}/>
		</CardContent>
	</Card>)
}