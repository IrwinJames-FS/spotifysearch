import { Dispatch, SetStateAction, createContext, useCallback, useContext, useState } from "react";
import { Outlet, Search } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getSelf, search, signout } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchResult } from "./components/common.types";
import { Player } from "./components/Player";
type AppUser = {
	displayName: string
	accessToken: string
}
type AppContext = {
	user?: AppUser,
	loadingUser: boolean,
	userError?: Error,
}
const ApplicationContext = createContext<AppContext>({loadingUser: true});

export const useApplication = ()=>useContext(ApplicationContext);

export const Application = () => {
	const [loadingUser, userError, user, setUser] = useAsync<AppUser>(useCallback(async ()=>{
		const {user} = await getSelf()
		return user;
	}, []));
	const theme = useAppTheme();
	
	return (<ApplicationContext.Provider value={{user, loadingUser, userError }}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Player>
				<Outlet/>
			</Player>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}