import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Outlet, Search } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getSelf, refresh, search, signout } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchResult } from "./components/common.types";
import { Player } from "./components/Player";
import { DetailContainer } from "./DetailContainer";
import { PlayerWidget } from "./components/SpotifyPlayer/PlayerWidget";
import { SpotifyPlayer, useSpotifyPlayer } from "./components/SpotifyPlayer";
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
	const {setToken} = useSpotifyPlayer();
	var timer = useRef<NodeJS.Timer | null>(null)
	const theme = useAppTheme();
	const [loadingUser, userError, user, setUser] = useAsync<AppUser>(useCallback(async ()=>{
		try {
			const {user} = await getSelf();
			setToken(user.accessToken);
			return user;
		} catch (error) {
			return undefined
		}
	}, []));

	useEffect(()=>{
		if(timer.current) {
			clearTimeout(timer.current);
			timer.current = null;
		}
		if(!user) return
		//calculate the time until expiration
		const diff = 3e4;
		timer.current = setTimeout(async () => {
			console.log("refreshing");
			const {user} = await refresh();
			setUser({loading: false, data:user});
			setToken(user.accessToken);
			timer.current = null;
		}, diff); //every 30 seconds for now
	}, [user, setUser, setToken])
	
	
	return (<ApplicationContext.Provider value={{user, loadingUser, userError }}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<DetailContainer>
				<Outlet/>
				<PlayerWidget/>
			</DetailContainer>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}