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
}
const ApplicationContext = createContext<AppContext>({loadingUser: true});

export const useApplication = ()=>useContext(ApplicationContext);

export const Application = () => {
	const [loadingUser, userError, user] = useAsync<AppUser>(useCallback(async ()=>{
		const {user} = await getSelf()
		return user;
	}, []));
	const theme = useAppTheme();
	return (<ApplicationContext.Provider value={{user, loadingUser, userError}}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Outlet/>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}