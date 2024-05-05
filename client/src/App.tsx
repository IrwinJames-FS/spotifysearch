import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Application, Home } from './application';
import { SpotifyPlayer } from './application/components/SpotifyPlayer';
import { Search } from './application/Search';


const App = () => {
	return (<BrowserRouter>
		<Routes>
			{
				//This is a compromise to get a proof of concept if this is successfull as a way to get manage the player state without creating extra resources
			}
			<Route element={<Application/>}>
				<Route path="/" element={<Home/>}/>
				<Route path="/:type" element={<Search/>}/>
			</Route>
		</Routes>
	</BrowserRouter>)
}

export default App;