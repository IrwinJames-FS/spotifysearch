import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Outlet, Search } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getSelf, refresh, search, signout } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchResult } from "./components/common.types";
import { Player } from "./components/Player";
import { DetailContainer } from "./DetailContainer";
type AppUser = {
	displayName: string
	accessToken: string
	expires: number
}
type AppContext = {
	user?: AppUser,
	loadingUser: boolean,
	userError?: Error,
}
const ApplicationContext = createContext<AppContext>({loadingUser: true});

export const useApplication = ()=>useContext(ApplicationContext);

export const Application = () => {
	var timer = useRef<NodeJS.Timer | null>(null)
	const theme = useAppTheme();
	const [loadingUser, userError, user, setUser] = useAsync<AppUser>(useCallback(async ()=>{
		try {
			const {user} = await getSelf()
			return user;
		} catch (error) {
			return undefined
		}
		
		
	}, []));

	useEffect(()=>{
		if(timer.current) clearTimeout(timer.current);
		if(!user) return
		//calculate the time until expiration
		const diff = user.expires - new Date().getTime() - 1e4
		timer.current = setTimeout(async () => {
			const {user} = await refresh();
			setUser({loading: false, data:user});
		}, diff); //every 30 seconds for now
	}, [user, setUser])
	
	
	return (<ApplicationContext.Provider value={{user, loadingUser, userError }}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<DetailContainer>
				<Player>
					<Outlet/>
				</Player>
			</DetailContainer>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}