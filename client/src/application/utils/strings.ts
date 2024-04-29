export const caplitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const commafy = (str: string) => {
	for (let i = str.length-3; i > 0; i-=3) {
		
		str = str.slice(0, i)+','+str.slice(i);
	}
	return str;
}

export const getCountry = (code: string) => {
	const region = new Intl.DisplayNames(['en'], {type:'region'});
	return region.of(code);
}

/**
 * Just not a fan of how the date is displayed this will reformat it in a naive manner
 * @param date 
 */
export const redate = (date: string) => {
	if (!date.trim()) return '';
	const [,year, month, day] = /(\d{4})-(\d{2})-(\d{2})/.exec(date) ?? []
	return `${day}/${month}/${year}`;
}