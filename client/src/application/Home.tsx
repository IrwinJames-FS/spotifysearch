import { Error, Login, Search } from "@mui/icons-material";
import { Toolbar, Typography, CircularProgress, Card, CardContent, Stack } from "@mui/material";
import { useApplication } from "./Application";
import { SearchField, Topbar, UserButton } from "./components";
import { useCallback, useMemo } from "react";
import { useAsync } from "./hooks";
import { SearchResult } from "./components/common.types";
import { search } from "./utils/api";
import { Flex } from "./components/Flex";
import { HorizontalList } from "./components/SearchResults";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'qs';
import { FilterButton } from "./components/FilterButton";

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
	}, [navigate]);
	
	const [loading, error, results] = useAsync<SearchResult | undefined>(useCallback(async ()=>{
		if(!user) return undefined;
		const q = query.trim();
		if(!q) return undefined;
		return await search(q, ['artist','album','playlist','track','show','episode','audiobook']);
	}, [query, user]));

	const keys: (keyof SearchResult)[] | undefined = useMemo(()=>{
		if(loading || error || !results) return undefined
		return (Object.keys(results) as (keyof SearchResult)[]).sort((a, b)=>results[b].total-results[a].total)
	}, [loading, error, results])
	return (<>
	<Topbar>
		<Toolbar disableGutters>
			{user && <SearchField {...{onSearch}}/>}
			<FilterButton title="Everything"/>
			<UserButton/>
		</Toolbar>
	</Topbar>
	{!user && <Flex component="main" fill center>
		<Login/>
		<Toolbar>
			<Typography>Login to get started</Typography>
			<UserButton/>
		</Toolbar>
	</Flex>}
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
	{!loading && !error && !keys && <Flex component="main" center fill gap={1} sx={{p:1}}>
		<Search/>
		<Typography>Tell me what you want to hear</Typography>
	</Flex>}
	{keys && keys.length && <Flex component="main" fill gap={1} sx={{p:1}}>
		{keys.map((k, i)=><HorizontalList key={k} title={k} group={results![k]}/>)}
	</Flex>}
	</>)
}