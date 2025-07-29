import Timer from "./components/Timer";
import SessionsSummary from "./components/SessionsSummary";

const App = () => {
	return (
		<>
			<h1>Pomodoro Timer</h1>
			<Timer />
			<SessionsSummary />
		</>
	);
};

export default App;
