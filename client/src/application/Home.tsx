import { useApplication } from "./Application"
import { ResultsGrid, Topbar } from "./components";

export const Home = () => {
	const {user} = useApplication();

	return (<>
	<Topbar/>
	<ResultsGrid/>
	</>)
}