import { useState, useEffect } from "react";
import { useSessions } from "../App";

const DURATIONS = {
	work: 25 * 60,
	"short-break": 5 * 60,
	"long-break": 15 * 60,
};

const formatTime = (secs) => {
	const min = Math.floor(secs / 60)
		.toString()
		.padStart(2, "00");
	const sec = (secs % 60).toString().padStart(2, "0");
	return `${min}:${sec}`;
};

const Timer = () => {
	const [mode, setMode] = useState("work");
	const [timeLeft, setTimeLeft] = useState(DURATIONS[mode]);
	const [isRunning, setIsRunning] = useState(false);

	const { logSession } = useSessions();

	// Reset timer on mode change
	useEffect(() => {
		setTimeLeft(DURATIONS[mode]);
		setIsRunning(false);
	}, [mode]);

	// Timer countdown
	useEffect(() => {
		let interval = null;
		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		}

		if (timeLeft == 0 && isRunning) {
			setIsRunning(false);
			logSession(mode, DURATIONS[mode]);
		}

		return () => clearInterval(interval);
	}, [isRunning, timeLeft]);

	const handleStartStop = () => {
		setIsRunning((prev) => !prev);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTimeLeft(DURATIONS[mode]);
	};

	const selectMode = (newMode) => {
		if (newMode != mode) {
			setMode(newMode);
		}
	};

	return (
		<section className="timer">
			<h2>
				Current Session: <span>{mode}</span>
			</h2>
			<p>{formatTime(timeLeft)}</p>

			<div className="timer-ctrls">
				<button onClick={handleStartStop}>
					{isRunning ? "Pause" : "Start"}
				</button>
				<button onClick={handleReset}>Reset</button>
			</div>

			<div className="mode-ctrls">
				<button onClick={() => selectMode("work")} disabled={mode == "work"}>
					Work
				</button>
				<button
					onClick={() => selectMode("short-break")}
					disabled={mode == "short-break"}
				>
					Short Break
				</button>
				<button
					onClick={() => selectMode("long-break")}
					disabled={mode == "long-break"}
				>
					Long Break
				</button>
			</div>
		</section>
	);
};

export default Timer;
