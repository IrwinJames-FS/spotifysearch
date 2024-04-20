import { Error } from "@mui/icons-material";
import { Toolbar, Typography, Button, CircularProgress, Card, CardContent, Stack } from "@mui/material";
import { useApplication } from "./Application";
import { SearchField, Topbar } from "./components";
import { useCallback, useMemo } from "react";
import { useAsync } from "./hooks";
import { SearchResult } from "./components/common.types";
import { search } from "./utils/api";
import { Flex } from "./components/Flex";
import { HorizontalList } from "./components/SearchResults";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'qs';

const useQuery = (key: string) => {
	const { search } = useLocation()
	return useMemo(()=>new URLSearchParams(search).get(key) ?? "", [search, key]);
}

export const Home = () => {
	const {user} = useApplication();
	const navigate = useNavigate();
	let query = useQuery("q")
	const onSearch = useCallback((value: string)=>{
		navigate(`/?${qs.stringify({q: value})}`)
	}, [navigate])
	const [loading, error, results] = useAsync<SearchResult | undefined>(useCallback(async ()=>{
		if(!user) return undefined;
		const q = query.trim();
		if(!q) return undefined;
		return await search(q);
	}, [query]));
	const keys: (keyof SearchResult)[] | undefined = useMemo(()=>{
		if(loading || error || !results) return undefined
		return (Object.keys(results) as (keyof SearchResult)[]).sort((a, b)=>results[b].total-results[a].total)
	}, [loading, error, results])
	return (<>
	<Topbar>
	{user && (<Toolbar sx={{color:"inherit", gap: 1, alignItems: 'center'}} disableGutters>
		<SearchField {...{onSearch}}/>
		<Typography color="inherit">{user.displayName}</Typography>
	</Toolbar>)}
		{!user && (<>
		<Button color="inherit" component="a" href="http://localhost:3001/api/v1/auth">Sign In</Button>
		</>)}
	</Topbar>
	{loading && <Flex component="main" fill center><CircularProgress/></Flex>}
	{!loading && error && <Flex component="main" fill center>
		<Card>
			<CardContent>
				<Stack>
					<Error/>
					<Typography>Something went wrong</Typography>
				</Stack>
			</CardContent>
		</Card>
	</Flex>}
	{keys && <Flex component="main" fill gap={1} sx={{p:1}}>
		{keys.map((k, i)=><HorizontalList key={k} title={k} group={results![k]}/>)}
	</Flex>}
	</>)
}