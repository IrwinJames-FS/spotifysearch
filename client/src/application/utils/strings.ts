export const caplitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const commafy = (str: string) => {
	for (let i = str.length-3; i > 0; i-=3) {
		
		str = str.slice(0, i)+','+str.slice(i);
	}
	return str;
}