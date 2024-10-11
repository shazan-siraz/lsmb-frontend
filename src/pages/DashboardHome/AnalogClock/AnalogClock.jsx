import React, { useEffect, useState } from "react";
import "./AnalogClock.css"; // Import the CSS file

const AnalogClock = () => {
  const [time, setTime] = useState({
    hoursRotation: 0,
    minutesRotation: 0,
    secondsRotation: 0,
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hoursRotation = (hours % 12) * 30 + minutes / 2; // Calculate hour hand rotation
      const minutesRotation = minutes * 6; // Calculate minute hand rotation
      const secondsRotation = seconds * 6; // Calculate second hand rotation

      setTime({ hoursRotation, minutesRotation, secondsRotation });
    };

    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="clock-container">
      <div className="clock">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${time.hoursRotation}deg)` }}
        />
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${time.minutesRotation}deg)` }}
        />
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${time.secondsRotation}deg)` }}
        />

        {/* Clock numbers */}
        <div className="clock-face">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`number number${i + 1}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
