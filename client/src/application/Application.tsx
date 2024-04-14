import { Dispatch, SetStateAction, createContext, useCallback, useContext, useState } from "react";
import { Outlet, Search } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getSelf, search } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchResult } from "./components/common.types";
type AppUser = {
	displayName: string
}
type AppContext = {
	user?: AppUser,
	loadingUser: boolean,
	userError?: Error,
	resultLoading: boolean,
	resultError?: Error,
	result?: SearchResult
	q: string,
	setQ: Dispatch<SetStateAction<string>>
}
const ApplicationContext = createContext<AppContext>({loadingUser: true, resultLoading: false, setQ: ()=>{}, q: ""});

export const useApplication = ()=>useContext(ApplicationContext);

export const Application = () => {
	const [loadingUser, userError, user] = useAsync<AppUser>(useCallback(async ()=>{
		const {user} = await getSelf()
		return user;
	}, []));
	const [q, setQ] = useState("");
	const [resultLoading, resultError, result] = useAsync<SearchResult | undefined>(useCallback(async () => {
		if(!q.trim()) return undefined; //this should evaluate to false for an empty string
		const result = await search(q);
		return result;
	}, [q]))
	const theme = useAppTheme();
	return (<ApplicationContext.Provider value={{user, loadingUser, userError, resultLoading, resultError, result, q, setQ}}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Outlet/>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}