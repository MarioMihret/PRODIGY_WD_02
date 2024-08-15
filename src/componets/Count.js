import React, { useState, useEffect } from "react";
import "./Count.css";

function Stopwatch() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval); // Clear the interval when isRunning is false
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [isRunning]); 

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLapTimes([]);
  };

  const handleLap = () => {
    setLapTimes([...lapTimes, time]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div>
      <div>
        <h1 className="title">Stopwatch</h1>
      </div>
      <div className="container">
        <h1 className="number">{formatTime(time)}</h1>
        {isRunning ? (
          <button className="button" onClick={handlePause}>
            Pause
          </button>
        ) : (
          <button className="button" onClick={handleStart}>
            Start
          </button>
        )}
        <button className="button" onClick={handleReset}>
          Reset
        </button>
        <button className="button" onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;