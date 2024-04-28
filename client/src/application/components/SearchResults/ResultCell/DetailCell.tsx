import { FC } from "react";
import { DetailLoader, DetailLoaderProps } from "./DetailLoader";
import { Card } from "../common";

export const DetailCell: FC<DetailLoaderProps> = props => {
	const s = {xs: 128, md: 256}
	return (<Card sx={{
		width: s,
		height: s
	}}>
		<DetailLoader {...props}/>
	</Card>)
}