import { Tooltip } from "@mui/material"
import { FC } from "react"
import { getCountry } from "../utils/strings"
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export const MarketIcon: FC<{code: string}> = ({code}) => {
	return (<Tooltip title={getCountry(code)}>
		<span>{getUnicodeFlagIcon(code)}</span>
	</Tooltip>)
}