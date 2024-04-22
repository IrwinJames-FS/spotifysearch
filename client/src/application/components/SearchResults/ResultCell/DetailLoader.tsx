
import { FC, ReactNode, useCallback } from "react";
import { useDetails } from "../../../DetailContainer";
import { usePlayer } from "../../Player";
import { getItem } from "../../../utils/api";
import { CardActionArea } from "../common";

export type DetailLoaderProps = {
	type: 'album' | 'artist' | 'audiobook' | 'playlist' | 'show' | 'track' | 'episode'
	id: string
	title: string
	children?: ReactNode
}
export const DetailLoader: FC<DetailLoaderProps> = ({type, id, title, children}) => {
	const {setDetails} = useDetails();
	const {setToast, device_id} = usePlayer();
	const onClick = useCallback(async () => {
		try{
			const item = await getItem(type, id);
			setDetails({...item, device_id});
		} catch (error) {
			setToast({open: true, autoHideDuration: 5e3, title:'Something went wrong...', severity: 'error'});
		}
	}, [setDetails, setToast, device_id, id, type]);
	return (<CardActionArea {...{title, onClick}}>{children}</CardActionArea>)
}