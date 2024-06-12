import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import LikeButton from './components/LikeButton';

function Root() {
	return (
		<div>
			<div className="Hello">
				<img width="100" alt="icon" src={icon} />
			</div>
			<LikeButton />
		</div>
	);
}

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root />} />
			</Routes>
		</Router>
	);
}
