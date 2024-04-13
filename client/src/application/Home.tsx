import { useApplication } from "./Application"
import { Topbar } from "./components/Topbar";

export const Home = () => {
	const {user} = useApplication();

	return (<>
	<Topbar/>
	</>)
}