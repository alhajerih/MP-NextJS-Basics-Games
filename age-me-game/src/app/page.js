"use client";

import { useState, useEffect } from "react";
import AgeCounter from "./components/AgeCounter.js";
import CurrencyCounter from "./components/CurrencyCounter.js";
import EventModal from "./components/EventModal.js";
import milestones from "./data/milestones.js";
import choices from "./data/choices.js";

export default function Home() {
  const [monthsCounter, setMonthsCounter] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [codeyImage, setCodeyImage] = useState("Codey/codey_0.png");
  const [showEventModal, setShowEventModal] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false); // pop window for choices
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null); // state for choice
  const [gameOver, setGameOver] = useState(false); //tracking the networth

  //Handle codey broke img
  useEffect(() => {
    if (gameOver) {
      setCodeyImage("Codey/codey_jail.png");
    }
  }, [gameOver]);

  function handleCodeyImage(updatedMonthsCounter) {
    if (updatedMonthsCounter <= 60) {
      setCodeyImage("Codey/codey_0.png"); // 0 - 5 years (0 - 60 months)
    } else if (updatedMonthsCounter <= 180) {
      setCodeyImage("Codey/codey_5.png"); // 5 - 15 years
    } else if (updatedMonthsCounter <= 300) {
      setCodeyImage("Codey/codey_15.png"); // 15 - 25 years
    } else if (updatedMonthsCounter <= 420) {
      setCodeyImage("Codey/codey_25.png"); // 25 - 35 years
    } else if (updatedMonthsCounter <= 540) {
      setCodeyImage("Codey/codey_35.png"); // 35 - 45 years
    } else if (updatedMonthsCounter <= 660) {
      setCodeyImage("Codey/codey_45.png"); // 45 - 55 years
    } else if (updatedMonthsCounter <= 780) {
      setCodeyImage("Codey/codey_55.png"); // 55 - 65 years
    } else if (updatedMonthsCounter <= 900) {
      setCodeyImage("Codey/codey_65.png"); // 65 - 75 years
    } else if (updatedMonthsCounter <= 1020) {
      setCodeyImage("Codey/codey_75.png"); // 75 - 85 years
    } else if (updatedMonthsCounter <= 1140) {
      setCodeyImage("Codey/codey_85.png"); // 85 - 95 years
    } else {
      setCodeyImage("Codey/codey_95.png"); // 95+ years
    }
  }

  // Handle button click to increment age
  const handleAgeIncrement = () => {
    if (!gameOver && monthsCounter <= 1140) {
      setMonthsCounter(monthsCounter + 1); // Increment by 6 month per click
      handleNetWorth();
      checkForMilestone(); // Check if a milestone event should be triggered
      checkForChoices(); // Check if a choice should be triggered based on age
      handleCodeyImage(monthsCounter);
    }
  };

  // Handles changing currency based on age and other conditions
  function handleNetWorth() {
    if (monthsCounter === 60) setNetWorth(netWorth + 200); // Eid bonus at 5 years old
    if (monthsCounter > 180 && monthsCounter < 300) setNetWorth(netWorth + 10); // Part-time job
    if (monthsCounter > 300 && monthsCounter < 420) setNetWorth(netWorth + 60); // Raise at 25
    if (monthsCounter > 420) setNetWorth(netWorth + 1000); // Kids have grown up at 35
    if (monthsCounter === 540) setNetWorth(netWorth + 100000); // Book publishing at 45

    if (netWorth < 0) {
      setGameOver(true);
      // handleCodeyImage(monthsCounter);
    }
  }

  // Check for milestone events (Find and display it )
  function checkForMilestone() {
    const milestone = milestones.find(
      (event) => event.ageInMonths === monthsCounter
    );
    if (milestone) {
      setCurrentEvent(milestone); // Set the current milestone event
      setShowEventModal(true); // Show the modal for milestones
    }
  }

  // Check for choices (user can pick yes or no) at specific ages
  function checkForChoices() {
    const choice = choices.find((choice) => {
      switch (choice.id) {
        case 1:
          return monthsCounter === 240; // 20 years
        case 2:
          return monthsCounter === 252; // 21 years
        case 3:
          return monthsCounter === 300; // 25 years
        case 4:
          return monthsCounter === 336; // 28 years
        case 5:
          return monthsCounter === 360; // 30 years
        case 6:
          return monthsCounter === 372; // 31 years
        case 7:
          return monthsCounter === 384; // 32 years
        case 8:
          return monthsCounter === 540; // 45 years
        default:
          return false;
      }
    });

    // Only show the choice modal if a choice is found for the current month
    if (choice) {
      setCurrentChoice(choice); // Set the current choice
      setShowChoiceModal(true); // Show the modal for choices
    } else {
      setShowChoiceModal(false); // close modal doesn't appear unnecessarily
    }
  }

  // Handle closing the milestone pop up window
  const closeEventModal = () => {
    setShowEventModal(false);
    setCurrentEvent(null);
  };

  // Handle "Yes" choice from the user for choices
  const handleYesChoice = () => {
    if (currentChoice) {
      setNetWorth(netWorth + currentChoice.price); // Adjust net worth based on the user choice
    }
    setShowChoiceModal(false); // Close the modal after choice
  };

  // Handle "No" choice from the user for choices
  const handleNoChoice = () => {
    setShowChoiceModal(false); // Close the modal without adjusting net worth
  };

  return (
    <>
      <div>
        <div className="logo">
          <img src="game_title.PNG" alt="header" width={300} height={200} />
        </div>

        <h2 className="intro">
          I'm Codey, and every click helps me grow older. How many years can you
          add to my life?{String.fromCodePoint(0x1f914)}
        </h2>
        {gameOver && <h2 className="game-over-message">Game Over!</h2>}
        {gameOver && (
          <h2 className="game-over-jail">You are in the Jail now.</h2>
        )}

        <div className="codey-div">
          <img
            src={codeyImage}
            alt="Codey"
            className="codey"
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div>
          <AgeCounter
            monthsCounter={monthsCounter}
            handleAgeIncrement={handleAgeIncrement}
            isDisabled={gameOver}
          />
        </div>

        <div className="currancy-logo">
          <CurrencyCounter netWorth={netWorth} />
          <img
            style={{ width: 100, height: 100 }}
            src="boat.png"
            alt="Tiny Logo"
          />
        </div>

        {/* Milestone Event Modal */}
        {showEventModal && (
          <EventModal
            show={showEventModal}
            message={currentEvent.message || ""}
            onClose={closeEventModal} // Close modal after user reads
            monthsCounter={monthsCounter} // Pass monthsCounter to the modal
          />
        )}

        {/* Choice Modal (user picks Yes or No) */}
        {showChoiceModal && (
          <EventModal
            show={showChoiceModal}
            message={currentChoice.message || ""}
            onYes={handleYesChoice} // Handle Yes choice
            onNo={handleNoChoice} // Handle No choice
            monthsCounter={monthsCounter} // Pass monthsCounter to the modal
          />
        )}

        <div className="footer">
          <h2>by Janna and Hamad</h2>
        </div>
      </div>
    </>
  );
}
