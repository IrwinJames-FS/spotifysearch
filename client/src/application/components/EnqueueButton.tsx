import { Add } from "@mui/icons-material"
import { TconButton } from "./TconButton"
import { FC, useCallback } from "react"
import { addToQueue } from "../utils/api"

export type EnqueueButtonProps = {
	placement?:  "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"
	uris: string | string[]
}
export const EnqueueButton: FC<EnqueueButtonProps> = ({placement, uris}) => {
	const device_id = undefined
	const onClick = useCallback(async () => {
		const uis: string[] = Array.isArray(uris) ? uris:[uris];
		try{
			for (let uri of uis) {
				await addToQueue(uri, device_id!)
			}
			//await updateQueue();
		} catch (error) {
			console.log("Display a toast");
		}
	}, [uris])
	return <TconButton title="Add to queue" placement={placement} onClick={onClick} disabled={!device_id}><Add/></TconButton>
}