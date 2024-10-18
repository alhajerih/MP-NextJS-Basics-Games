"use client";
import AgeCounter from "./components/AgeCounter.js";
import CurrencyCounter from "./components/CurrencyCounter.js";
import { useState } from "react";

export default function Home() {
  // States for the age and net worth (currency)
  const [monthsCounter, setMonthsCounter] = useState(0);
  const [netWorth, setNetWorth] = useState(0);

  // Handle button click to increment age
  const handleAgeIncrement = () => {
    if (monthsCounter <= 1020) {
      setMonthsCounter(monthsCounter + 1); // Increment by one month per click
      handleNetWorth();
    }
  };

  // Handles changing currency based on age and other conditions
  function handleNetWorth() {
    setNetWorth(netWorth + 10);
    if (monthsCounter === 180) {
      //15 years in months
      setNetWorth(netWorth + 200);
    }
    if (monthsCounter === 660) {
      //55 years in months
      setNetWorth(netWorth + 100000);
    }
  }

  return (
    <>
      <div>

        <div className="logo">
        <img src="game_title.PNG" alt="header" width={300} height={200}/>
        </div>

        {/* <h1 className="header">
          Welcome to Age Me {String.fromCodePoint(0x1f60d)}
        </h1> */}

        <h2 className="intro">
          I'm Codey, and every click helps me grow older. How many years can you
          add to my life?{String.fromCodePoint(0x1f914)}
        </h2>

        <div className="codey-div">
          <img
            src="Codey/codey_0.png"
            alt="Codey"
            className="codey"
            width={200}
            height={200}
          />
        </div>
        <div>
          <AgeCounter
            monthsCounter={monthsCounter}
            handleAgeIncrement={handleAgeIncrement}
          />
        </div>
        <div className="currancy-logo">
          <CurrencyCounter netWorth={netWorth} />
          <img
            style={{ width: 100, height: 100 }} // or any inline style you want to use
            src="boat.png"
            alt="Tiny Logo"
          />
        </div>

        <div className="footer">
        <h2>by Janna and Hamad </h2>
        </div>
      </div>
    </>
  );
}
