export const stx = (store: Storage) => {
	const getItem = <T>(key: string): T | null => {
		const item = store.getItem(key);
		if(item === null) return null;
		return JSON.parse(item) as T;
	}
	const setItem = (key: string, value: any) => store.setItem(key, JSON.stringify(value));
	const removeItem = (key: string) => store.removeItem(key);
	return {
		getItem,
		setItem,
		removeItem
	}
}