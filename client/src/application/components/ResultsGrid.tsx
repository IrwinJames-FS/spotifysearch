import { FC, useMemo } from "react";
import { useApplication } from "../Application";
import { ResultItem, SearchResult, SearchResultGroup } from "./common.types";
import { Card, Grid, SxProps, Theme, Typography } from "@mui/material";

/**
 * Results will display lists based on which group had the most results
 * @returns 
 */
export const ResultsGrid = () => {
	const {resultLoading, resultError, result} = useApplication();
	const sorted = useMemo(()=>{
		if(!result) return;
		return Object.keys(result).sort((a, b) => {
			return result[b as keyof SearchResult].total - result[a as keyof SearchResult].total;
		})
	}, [result])
	return (<>
	{resultLoading && <h1>Loading</h1>}
	{resultError && <h1>Error</h1>}
	{sorted && <Grid container>
		{sorted.map(key=><GroupGrid key={key} title={key} group={result![key as keyof SearchResult]}/>)}

	</Grid>}
	</>);
}

type GroupGridProps = {
	title: string
	group: SearchResultGroup<ResultItem>
}

const GroupGrid: FC<GroupGridProps> = ({title, group}) => {
	return (<>
	<GroupTitle {...{title, group}}/>
	<GroupItems items={group.items}/>
	</>)
}

const GroupTitle: FC<GroupGridProps> = ({title, group}) => {
	return (<Grid item sx={{p:1}} xs={12}>
		<Card sx={{p:1}}>
			<Typography variant="h5">{title} ({group.total})</Typography>
		</Card>
	</Grid>)
}

type GroupItemsProps = {
	items: ResultItem[]
}

const GroupItems: FC<GroupItemsProps> = ({items}) => {
	return (<>
	{items.map(item=><GroupItem key={`${item.id}`} item={item}/>)}
	</>)
}

const GroupItem: FC<{item: ResultItem}> = ({item}) => {
	return (<Grid item sx={{p:1, display: 'flex'}} xs={12} sm={6} md={4} lg={3} xl={1}>
		<Card sx={{p:1, flex: 1}}>
			<Typography>{item.name}</Typography>
		</Card>
	</Grid>)
}

