"use client";

import { useState } from "react";
import codeyImages from "../data/codeyImages";

export default function AgeCounter({ monthsCounter, handleAgeIncrement }) {
  const years = Math.floor(monthsCounter / 12);
  const months = monthsCounter % 12;

  return (
    <div className="age-counter">
      <div className="age-display">
        Codey is
        <span className="years">
          {years} {years === 1 ? "year" : "years"}
        </span>{" "}
        and{" "}
        <span className="months">
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
