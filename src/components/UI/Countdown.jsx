import React, { useCallback, useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const getTimeRemaining = useCallback(() => {
    const distance = expiryDate - new Date().getTime();

    if (distance <= 0) {
      return null;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }, [expiryDate]);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    if (!expiryDate) return;

    setTimeRemaining(getTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate, getTimeRemaining]);

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