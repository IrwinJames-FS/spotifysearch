import { Error, Forward, Search } from "@mui/icons-material";
import { Toolbar, TextField, InputAdornment, IconButton, Typography, Button, CircularProgress, Card, CardContent, Stack } from "@mui/material";
import { useApplication } from "./Application"
import { SearchField, Topbar } from "./components";
import { useInputValue } from "./hooks/useInputValue";
import { KeyboardEventHandler, useCallback, useMemo, useState } from "react";
import { useBool } from "./hooks/useBool";
import { useAsync } from "./hooks";
import { SearchResult, SearchResultGroup, ResultItem } from "./components/common.types";
import { search } from "./utils/api";
import { Flex } from "./components/Flex";
import { HorizontalList } from "./components/SearchResults";


export const Home = () => {
	const {user} = useApplication();
	const [query, setQuery] = useState("");
	const onSearch = useCallback((value: string)=>{
		setQuery(value);
	}, [])
	const [loading, error, results] = useAsync<SearchResult | undefined>(useCallback(async ()=>{
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