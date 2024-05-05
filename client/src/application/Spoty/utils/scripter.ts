//This is a convenience method to make the development simpler
export const scripter = (src: string, id: string = "") => {
	if( document.getElementById(id) ) return; //Instead just dont add a new script
	const script = document.createElement("script");
	script.src = src;
	script.async = true;
	script.defer = true;
	script.id = id
	document.body.appendChild(script);
}