import { FC } from "react";
import { DetailLoader, DetailLoaderProps } from "./DetailLoader";
import { Card } from "../common";

export const DetailCell: FC<DetailLoaderProps> = props => {
	return (<Card>
		<DetailLoader {...props}/>
	</Card>)
}