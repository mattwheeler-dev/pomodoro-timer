import { createContext, useContext, useState } from "react";
import Timer from "./components/Timer";
import SessionsSummary from "./components/SessionsSummary";

const SessionContext = createContext();

export function useSessions() {
	return useContext(SessionContext);
}

function App() {
	const [sessions, setSessions] = useState([]);

	const logSession = (type, duration) => {
		const timestamp = new Date().toISOString();
		setSessions((prev) => [...prev, { type, duration, timestamp }]);
	};

	return (
		<SessionContext.Provider value={{ sessions, logSession }}>
			<h1>Pomodoro Timer</h1>
			<Timer />
			<SessionsSummary />
		</SessionContext.Provider>
	);
}

export default App;
