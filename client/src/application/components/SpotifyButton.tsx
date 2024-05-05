import { FC } from "react";
import { ExternalUrls } from "../Spoty/spoty.record.types";
import { Button, Tooltip } from "@mui/material";
import { FaSpotify } from "react-icons/fa";

export const SpotifyButton: FC<{external_urls?: Partial<ExternalUrls>} & Record<string,any>> = ({external_urls:{spotify}={}}) => {
	if(!spotify) return null;
	return (<Tooltip title="Open in Spotify"><Button variant="contained" component={"a"} href={spotify} target="_blank" color="primary" startIcon={<FaSpotify/>}>Open in Spotify</Button></Tooltip>)
}