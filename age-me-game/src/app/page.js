"use client";
import AgeCounter from "./components/AgeCounter.js";
import CurrencyCounter from "./components/CurrencyCounter.js";
import codeyImages from "./data/codeyImages.js";
import { useState } from "react";

export default function Home() {
  // States for the age and net worth (currency)
  const [monthsCounter, setMonthsCounter] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [codeyImage, setCodeyImage] = useState("Codey/codey_0.png");

  // Handle button click to increment age
  const handleAgeIncrement = () => {
    if (monthsCounter <= 1020) {
      setMonthsCounter(monthsCounter + 1); // Increment by one month per click
      handleNetWorth();
    }
  };

  // Handles changing currency based on age and other conditions
  function handleNetWorth() {
    if (monthsCounter === 60) {
      // 5 years old in months - gets bonus from eid
      setNetWorth(netWorth + 200);
    }
    if (monthsCounter > 180 && monthsCounter < 300) {
      // 15 years old in months - starts earning salary
      setNetWorth(netWorth + 10);
    }
    if (monthsCounter > 300 && monthsCounter < 420) {
      // 25 years old in months - gets a raise
      setNetWorth(netWorth + 60);
    }
    if (monthsCounter > 420) {
      // 35 years old in months - kids have grown up
      setNetWorth(netWorth + 1000);
    }
    if (monthsCounter === 540) {
      // 45 years old in months - Codey publishes book
      setNetWorth(netWorth + 100000);
    }
  }

  function handleCodeyImage(monthsCounter, codeyImages) {
    const matchedImage = codeyImages.find(
      (image) => image.id === monthsCounter
    );
    if (matchedImage) {
      setCodeyImage(matchedImage.src); // Update the image if found
    }
  }

  return (
    <>
      <div>
        <div className="logo">
          <img src="game_title.PNG" alt="header" width={300} height={200} />
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
            src={codeyImage}
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
            handleCodeyImage={() =>
              handleCodeyImage(monthsCounter, codeyImages)
            }
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
