import { useApplication } from "./Application"

export const Home = () => {
	const {user} = useApplication();

	return (<h1>Home {user ? 'got user':'no user'}</h1>)
}