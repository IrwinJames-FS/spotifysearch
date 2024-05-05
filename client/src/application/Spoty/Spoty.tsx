import { FC } from "react"
import { SpotyProvider } from "./SpotyContext"
import { SpotyProps } from "./spoty.types"
import { SpotyLoader } from "./SpotyLoader"

/**
 * Spoty is going to be my final attempt to keep my word... (to myself) on separating UI and from logic
 * 
 * I think the easiest way to handle such things is to build this as if I were publishing it so it should have no understanding of existing technologies within the environment. soooo it does not have awareness of the data model.
 * 
 * For spoty to be a front end only solution an access key method will be used with default fetchers however if a customer base path or enpoint override is inplace it will defer to using credentials or the method method provided
 */
export const Spoty: FC<SpotyProps> = ({config, children}) => {
	//The right way to do this is to split the separate states entirely
	return (<SpotyLoader>
		<SpotyProvider {...{config}}>
			{children}
		</SpotyProvider>
	</SpotyLoader>)
}; //never re-render