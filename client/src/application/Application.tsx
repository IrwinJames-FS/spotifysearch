import { createContext, useCallback, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useAppTheme, useAsync } from "./hooks";
import { getSelf } from "./utils/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
type AppUser = {
	displayName: string
}
type AppContext = {
	user?: AppUser
}
const ApplicationContext = createContext<AppContext>({});

export const useApplication = ()=>useContext(ApplicationContext);

export const Application = () => {
	const [loadingUser, userError, user] = useAsync<AppUser>(useCallback(async ()=>{
		const {user} = await getSelf()
		console.log(user);
		return user;
	}, []))
	const theme = useAppTheme();
	return (<ApplicationContext.Provider value={{user}}>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Outlet/>
		</ThemeProvider>
	</ApplicationContext.Provider>);
}