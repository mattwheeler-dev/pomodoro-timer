import { useSessions } from "../App";

const SessionsSummary = () => {
	const { sessions } = useSessions();

	return (
		<section className="summary">
			<h3>Sessions Summary</h3>
			{sessions.length == 0 ? (
				<p>No sessions yet</p>
			) : (
				sessions.map((session, index) => (
					<p key={index}>
						<span>{session.type}</span>: {Math.floor(session.duration / 60)} min
						– <em>{new Date(session.timestamp).toLocaleTimeString()}</em>
					</p>
				))
			)}
		</section>
	);
};

export default SessionsSummary;
