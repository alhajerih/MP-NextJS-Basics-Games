"use client";

import { useState } from "react";
import codeyImages from "../data/codeyImages";

export default function AgeCounter({monthsCounter, handleAgeIncrement, handleCodeyImage, codeyImages}) {
//   // States for the age and net worth (currency)
//   const [monthsCounter, setMonthsCounter] = useState(0);

//   // Handle button click to increment age
//   const handleAgeIncrement = () => {
//     setMonthsCounter(monthsCounter + 1); // Increment by one month per click
//   };

  // Calculate years and months from total months
  const years = Math.floor(monthsCounter / 12);
  const months = monthsCounter % 12;

  return (
    <div className="age-counter">
      <div className="age-display">
        <span className="years">
          {years} {years === 1 ? "year" : "years"}
        </span>{" "}
        and{" "}
        <span className="months" onChange={() => handleCodeyImage(monthsCounter, codeyImages)}>
          {months} {months === 1 ? "month" : "months"}
        </span>{" "}
        old
      </div>
      <button className="age-btn" onClick={handleAgeIncrement}>
        Grow Older
      </button>
    </div>
  );
}
