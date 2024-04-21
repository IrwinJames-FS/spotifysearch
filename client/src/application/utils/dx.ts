export const dx = (n: number) => {
	const s = Math.floor(n/1e3) % 60;
	const m = Math.floor(n/6e5) % 60;
	const h = Math.floor(n/36e5);
	let tm = [];
	if(h) tm.push(px(h));
	tm.push(px(m));
	tm.push(px(s));
	return tm.join(':')
}

export const px = (n:number, pad: number=2) => (''+n).padStart(pad, '0');