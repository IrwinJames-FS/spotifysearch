import { Error, Login, Search as MuiSearch } from "@mui/icons-material";
import { Toolbar, Typography, Button, CircularProgress, Card, CardContent, Stack, capitalize } from "@mui/material";
import { useApplication } from "./Application";
import { SearchField, Topbar, UserButton } from "./components";
import { useCallback, useMemo } from "react";
import { useAsync } from "./hooks";
import { ResultType, SearchResult } from "./components/common.types";
import { search } from "./utils/api";
import { Flex } from "./components/Flex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import qs from 'qs';
import { VerticalList } from "./components/SearchResults/VerticalList";
import { FilterButton } from "./components/FilterButton";

const useQuery = (key: string) => {
	const { search } = useLocation()
	return useMemo(()=>new URLSearchParams(search).get(key) ?? "", [search, key]);
}

export const Search = () => {
	const type = useParams().type as ResultType;
	const t = type+'s'
	const {user} = useApplication();
	const navigate = useNavigate();
	let query = useQuery("q")
	const onSearch = useCallback((value: string)=>{
		navigate(`/${type}?${qs.stringify({q: value})}`)
	}, [navigate, type]);
	
	const [loading, error, results] = useAsync<SearchResult | undefined>(useCallback(async ()=>{
		if(!user) return undefined;
		const q = query.trim();
		if(!q) return undefined;
		const res = await search(q, [type], 50);
		return res;
	}, [query, user, type]));

	return (<>
	<Topbar>
		<Toolbar disableGutters>
			{user && <SearchField {...{onSearch}}/>}
			<FilterButton title={capitalize(type)+'s'}/>
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
	{!loading && !error && !results && <Flex component="main" center fill gap={1} sx={{p:1}}>
		<MuiSearch/>
		<Typography>Tell me what you want to hear</Typography>
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
	
	{!loading && !error && results && t in results && <VerticalList group={results[t as keyof SearchResult]} title={t}/>}
	</>)
}