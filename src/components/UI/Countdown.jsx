import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  function getTimeRemaining() {
    const distance = expiryDate - new Date().getTime();

    if (distance <= 0) {
      return null;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate || !timeRemaining) {
    return null;
  }

  return (
    <div className="de_countdown">
      {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
    </div>
  );
};

export default Countdown;