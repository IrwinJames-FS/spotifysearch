import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Application, Home } from './application';


const App = () => {
	return (<BrowserRouter>
		<Routes>
			<Route element={<Application/>}>
				<Route path="/" element={<Home/>}/>
			</Route>
		</Routes>
	</BrowserRouter>)
}

export default App;