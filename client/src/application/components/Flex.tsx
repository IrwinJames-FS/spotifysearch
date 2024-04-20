import { Stack, StackProps } from "@mui/material"
import { FC } from "react"

type FlexProps = StackProps & {
	fill?: boolean
	center?: boolean
	row?: boolean
	justifyEnd?:boolean
}
export const Flex: FC<FlexProps> = ({fill, center, row, justifyEnd, sx={}, ...props}:FlexProps) => {
	return (<Stack {...{
		sx: {
			...sx,
			...(fill && {width: '100%', height: '100%'}),
		},
		...(row && {direction: 'row'}),
		...(justifyEnd && {justifyContent: 'flex-end'}),
		...(center && {justifyContent: 'center', alignItems: 'center'}),
		...props}}/>)
}