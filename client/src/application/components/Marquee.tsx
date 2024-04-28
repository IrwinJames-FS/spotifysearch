import { Typography, TypographyProps, styled } from "@mui/material";
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";

/**
 * Just some flair I suppose. I wanted a way to display overflowing text this is the best I could come up with. I also wanted to take a crack at writing a marqee but there are third party libraries which simplify this.
 */
type MarqueeProps = {
	velocity?: number
	children?: ReactNode
}
export const Marquee: FC<MarqueeProps> = ({velocity=1, children, ...props}) => {
	const [offset, setOffset] = useState(0);
	const timer = useRef<NodeJS.Timeout | undefined>();
	const _offset = useRef<number>(0);
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const carriageRef = useRef<HTMLDivElement | null>(null);
	useEffect(()=>{
		if(!wrapRef.current || !carriageRef.current) return;
		if(timer.current) return;
		timer.current = setInterval(()=>{
			if(!velocity || carriageRef.current!.clientWidth <= wrapRef.current!.clientWidth) {
				//dont cancel the interval because it wont restart
				setOffset(0);//just move to the beginning
				return; 
			}
			const w = carriageRef.current!.clientWidth;
			const n = _offset.current
			_offset.current = ((n+velocity)%(w*2));
			setOffset(o=>_offset.current-w); //gets brought in from the right and exits through the left
		}, 1e2);
		return () => {
			if(timer.current) clearInterval(timer.current);
			timer.current = undefined;
		}
	}, [setOffset, velocity]);
	return (<MarqueeWrapper ref={wrapRef}>
		<MarqueeCarriage sx={{left:-offset}} ref={carriageRef}>
			{children}
		</MarqueeCarriage>
		</MarqueeWrapper>);
}

const MarqueeCarriage = styled("div")({
	minWidth: '100%', //I think this should make the carriage 100% now it just needs to be moved
	position: 'absolute',
	display: 'flex',
	flexDirection: 'row'
});

//This is the anchor to the UI it stays still everything inside this moves.
const MarqueeWrapper = styled("div")({
	minHeight: '2rem',
	width: '100%',
	position: 'relative',
	overflow: 'clip'
})