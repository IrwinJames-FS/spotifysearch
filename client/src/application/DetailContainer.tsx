import { Dispatch, FC, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";
import { ParentElement } from "./components/common.types";
import { Dialog } from "@mui/material";
import { Detail } from "./components/DetailDialogs";
import { DetailsState } from "./components/DetailDialogs/types";
const DetailContext = createContext<{setDetails: Dispatch<SetStateAction<DetailsState | undefined>>}>({setDetails: () => {}});
export const useDetails = ()=>useContext(DetailContext);
/**
 * To allow for all details to be reduced to a single modal the detail Container will be responsible for presenting and hiding details
 */
export const DetailContainer: FC<ParentElement> = ({children}) => {
	const [details, setDetails] = useState<DetailsState | undefined>();
	const open = useMemo(()=>!!details, [details]);
	const closeDialog = useCallback(()=>setDetails(undefined), [setDetails]);

	return <DetailContext.Provider value={{setDetails}}>
		{children}
		<Dialog open={open} sx={{
			backdropFilter: 'blur(8px)'
		}} onClose={closeDialog} fullWidth>
			<Detail result={details}/>
		</Dialog>
	</DetailContext.Provider>
}
