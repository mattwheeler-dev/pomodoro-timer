import { useState, useEffect } from "react";

const DURATIONS = {
	work: 25 * 60,
	shortBreak: 5 * 60,
	longBreak: 15 * 60,
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

		if (timeLeft == 0) {
			setIsRunning(false);
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
		<section>
			<h2>Current Session: {mode.toUpperCase()}</h2>
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
					onClick={() => selectMode("shortBreak")}
					disabled={mode == "shortBreak"}
				>
					Short Break
				</button>
				<button
					onClick={() => selectMode("longBreak")}
					disabled={mode == "longBreak"}
				>
					Long Break
				</button>
			</div>
		</section>
	);
};

export default Timer;
