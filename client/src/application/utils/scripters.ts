//Because I have to use their CDN I need to reload the script with each update
//This is a convenience method to make the development simpler

export const scripter = (src: string, id: string = "") => {
	const el = document.getElementById(id);
	//if( el ) el.remove(); //remove the previous reference to ensure refire of ready callback this is for hot reloading
	if( el ) return; //Instead just dont add a new script
	const script = document.createElement("script");
	script.src = src;
	script.async = true;
	script.defer = true;
	script.id = id
	document.body.appendChild(script);
}