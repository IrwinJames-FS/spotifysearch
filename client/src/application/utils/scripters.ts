//Because I have to use their CDN I need to reload the script with each update
//This is a convenience method to make the development simpler
export const scripter = (src: string, id: string = "") => {
	const el = document.getElementById(id);
	if( el ) el.remove(); //remove the previous reference to ensure refire of ready callback this is for hot reloading
	const script = document.createElement("script");
	script.src = src;
	script.async = true;
	script.id = id
	document.body.appendChild(script);
}