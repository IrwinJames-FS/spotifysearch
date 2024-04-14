import { Stack, StackProps } from "@mui/material"
import { FC } from "react"

type FlexProps = StackProps & {
	fill?: boolean
	center?: boolean
}
export const Flex: FC<FlexProps> = ({fill, center, sx={}, ...props}:FlexProps) => {
	return (<Stack {...{
		sx: {
			...sx,
			...(fill && {width: '100%', height: '100%'}),
		},
		...(center && {justifyContent: 'center'}),
		...props}}/>)
}