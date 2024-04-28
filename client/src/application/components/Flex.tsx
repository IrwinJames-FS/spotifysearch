import { Stack, StackProps } from "@mui/material"
import { FC } from "react"

export type FlexProps = StackProps & {
	fill?: boolean
	center?: boolean
	row?: boolean
	justifyEnd?:boolean
	stretch?: boolean
	justifyStart?: boolean
	justifyCenter?: boolean
	grow?: boolean
	split?: boolean
	slim?: boolean
	wrap?: boolean
}
export const Flex: FC<FlexProps> = ({fill, center, row, justifyEnd, justifyStart, grow, stretch, split, slim, justifyCenter, wrap, sx={}, ...props}:FlexProps) => {
	return (<Stack {...{
		sx: {
			...sx,
			...(fill && {width: '100%', height: '100%'}),
		},
		...(row && {direction: 'row'}),
		...(wrap && {flexWrap: 'wrap'}),
		...(justifyEnd && {justifyContent: 'flex-end'}),
		...(justifyStart && {justifyContent: 'flex-start'}),
		...(center && {justifyContent: 'center', alignItems: 'center'}),
		...(justifyCenter && {justifyContent: 'center'}),
		...(stretch && {alignItems: 'stretch'}),
		...(grow && {flexGrow: 1}),
		...(split && {justifyContent: 'space-between'}),
		...(slim && {alignItems: 'center'}),
		...props}}/>);
}