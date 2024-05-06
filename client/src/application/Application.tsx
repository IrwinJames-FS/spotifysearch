import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getAccessToken, getSelf, refresh } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DetailContainer } from "./DetailContainer";
import { Spoty } from "./Spoty/Spoty";
import { SpotyConfig } from "./Spoty/spoty.types";
import { PlayerWidget } from "./components/PlayerWidget";

type SpotifyUserProfile = {
	country: string
	display_name: string
	email: string
	explicit_content: {
		filter_enabled: boolean
		filter_locked: boolean
	},
	external_urls: {
		spotify: string
	},
	followers: {
		href: string | null
		total: number
	},
	href: string
	id: string
	images: Spotify.Image[],
	product: 'free' | 'premium'
	type: string
	uri: string
}

type AppUser = {
	displayName: string
	accessToken: string
	expires: number
} & SpotifyUserProfile
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
			const {user} = await getSelf();
			console.log(user);
			//setToken(user.accessToken);
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
		const diff = user.expires-Date.now()-6e4; //1 minute before expiration
		timer.current = setTimeout(async () => {
			const {user} = await refresh();
			setUser({loading: false, data:user});
			//setToken(user.accessToken);
			timer.current = null;
		}, diff);
	}, [user, setUser])
	
	const getToken = useCallback(async (): Promise<string>=>await getAccessToken(), [])
	
	const config = useMemo<SpotyConfig>(()=>{
		return {
			getToken,
			product: user?.product,
			base: 'http://localhost:3001/api/v1/spot',
			playback: 'http://localhost:3001/api/v1/auth/update',
		}
	}, [getToken, user]);

	return (<ApplicationContext.Provider value={{user, loadingUser, userError }}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Spoty  {...{config}}>
				<DetailContainer>
					<Outlet/>
					<PlayerWidget/>
				</DetailContainer>
			</Spoty>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}