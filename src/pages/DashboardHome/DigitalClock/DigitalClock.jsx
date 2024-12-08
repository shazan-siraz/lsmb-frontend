
import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12; // Convert to 12-hour format, '0' becomes '12'

    hours = String(hours).padStart(2, '0'); // Ensure 2-digit format for hours
    
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="lg:text-[80px] md:text-[50px] font-mono text-gray-800">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default DigitalClock;