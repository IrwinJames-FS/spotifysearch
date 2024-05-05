import { SxProps, Theme, styled } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"

type ColKey = [number]
type PlayIconProps = {paused?: boolean}
export const PlayingIcon: FC<PlayIconProps> = ({paused=false}) => {
	const [cols, setCols] = useState<ColKey[]>(new Array(3).fill(null).map((_, i)=>[Math.floor((Math.random()*47)+1)]));
	const timer = useRef<NodeJS.Timeout | undefined>()
	const velocity = 2e2;
	useEffect(()=>{
		if(timer.current) return;
		timer.current = setInterval(()=>{
			if(paused) return;
			setCols(new Array(3).fill(null).map((_, i)=>[Math.floor((Math.random()*47)+1)]));
		}, velocity);
		return () => {
			if(timer.current) clearInterval(timer.current);
			timer.current = undefined;
		}
	}, [setCols, paused])
	return <S xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
		{cols.map(([height], i)=>(<R key={i} {...{x: i*16, sx: {
			height,
			y: 48-height,
			transition: theme=>theme.transitions.create(['y', 'height'], {
				easing:  theme.transitions.easing.sharp,
				duration: velocity
			})
		}}}/>))}
	</S>
}


const R = styled("rect")({
	width: 14,
	fill: 'currentcolor'
});

const S = styled("svg")({
	width: 24,
	height: 24,
	color: 'inherit'
})