"use client";

import { useState, useEffect } from "react";
import AgeCounter from "./components/AgeCounter.js";
import CurrencyCounter from "./components/CurrencyCounter.js";
import ReloadButton from "./components/ReloadButton.js";
import EventModal from "./components/EventModal.js";
import milestones from "./data/milestones.js";
import choices from "./data/choices.js";
import PurchaseMenu from "./components/PurchaseMenu.js";
import PurchaseInventory from "./components/PurchaseInventory.js";

export default function Home() {
  const [monthsCounter, setMonthsCounter] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [codeyImage, setCodeyImage] = useState("Codey/codey_0.png");
  const [showEventModal, setShowEventModal] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false); // pop window for choices
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null); // state for choice
  const [gameOver, setGameOver] = useState(false); //tracking the networth
  const [transitionClass, setTransitionClass] = useState("");
  const [isActive, setIsActive] = useState(false); // Passive income condition
  const [intervalId, setIntervalId] = useState(null); // Store the interval ID for passive income
  const [purchaseProps, setPurchaseProps] = useState([]); // Track clothing items applied to Codey


  //Handle codey broke img
  useEffect(() => {
    if (gameOver) {
      setCodeyImage("Codey/codey_jail.png");
      setTransitionClass("dramatic-loss");

      // Remove the class after the animation completes
      const timer = setTimeout(() => {
        setTransitionClass("");
      }, 1000); // Match this duration with the combined animation duration

      return () => clearTimeout(timer);
    } else {
      // Just update the image without the dramatic effect
      setTransitionClass("");
    }
  }, [gameOver]);

  useEffect(() => {
    if (monthsCounter > 0 && !intervalId) {
      startPassiveIncome(); // Start passive income after 5 years
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [monthsCounter]);

  function handleCodeyImage() {
    if (monthsCounter <= 60) {
      setCodeyImage("Codey/codey_0.png"); // 0 - 5 years (0 - 60 months)
    } else if (monthsCounter <= 180) {
      setCodeyImage("Codey/codey_5.png"); // 5 - 15 years
    } else if (monthsCounter <= 300) {
      setCodeyImage("Codey/codey_15.png"); // 15 - 25 years
    } else if (monthsCounter <= 420) {
      setCodeyImage("Codey/codey_25.png"); // 25 - 35 years
    } else if (monthsCounter <= 540) {
      setCodeyImage("Codey/codey_35.png"); // 35 - 45 years
    } else if (monthsCounter <= 660) {
      setCodeyImage("Codey/codey_45.png"); // 45 - 55 years
    } else if (monthsCounter <= 780) {
      setCodeyImage("Codey/codey_55.png"); // 55 - 65 years
    } else if (monthsCounter <= 900) {
      setCodeyImage("Codey/codey_65.png"); // 65 - 75 years
    } else if (monthsCounter <= 1020) {
      setCodeyImage("Codey/codey_75.png"); // 75 - 85 years
    } else if (monthsCounter < 1140) {
      setCodeyImage("Codey/codey_85.png"); // 85 - 95 years
    } else if (monthsCounter == 1140) {
      setCodeyImage("Codey/codey_grave.png"); // dead Codey
    }
  }

  const handlePurchase = (item) => {
    if (netWorth >= item.price) {
      setNetWorth((prevNetWorth) => prevNetWorth - item.price);
      setPurchaseProps((prevPurchase) => [...prevPurchase, item.img]); 
    }
  };

  // const renderCodeywithPurchase = () => {
  //   return (
  //     <div className="codey-div">
  //       <img src={codeyImage} alt="Codey" className={`codey ${transitionClass}`} width={200} height={200} />
  //       {clothingProps.map((clothing, index) => (
  //         <img key={index} src={clothing} alt="Clothing" className="clothing-prop" width={75} height={75} style={{ position: 'absolute', top: 600, left: 700, zIndex: 1 }} />
  //       ))}
  //     </div>
  //   );
  // };

  // Handle button click to increment age
  const handleAgeIncrement = () => {
    if (!gameOver && monthsCounter <= 1140) {
      setMonthsCounter(monthsCounter + 6); // Increment by 6 month per click
      handleCodeyImage();
      handleNetWorth();
      checkForMilestone(); // Check if a milestone event should be triggered
      checkForChoices(); // Check if a choice should be triggered based on age
    }
  };

  function startPassiveIncome() {
    setIsActive(true);
    const id = setInterval(() => {
      if (isActive) {
        setNetWorth((prevNetWorth) => prevNetWorth + 1); // Passive income increments every second
      }
    }, 1000); // 1000 ms = 1 second
    setIntervalId(id); // Store the interval ID to allow stopping it later
  }

  function stopPassiveIncome() {
    setIsActive(false); // Stop income
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null); // Clear interval when stopping
    }
  }

  // Handles changing currency based on age and other conditions
  function handleNetWorth() {
    if (monthsCounter > 0 && monthsCounter <= 180) {
      startPassiveIncome(); // Start passive income after 5 years, and continue until retirement at 55
    }

    if (monthsCounter > 180) {
      stopPassiveIncome(); // Stop passive income
    }

    if (monthsCounter > 60) {
      setNetWorth(netWorth + 200);
    } // Eid bonus at 5 years old
    if (monthsCounter > 180 && monthsCounter < 276) {
      setNetWorth(netWorth + 500);
    } // Part-time job until 23
    if (monthsCounter > 276 && monthsCounter < 420) setNetWorth(netWorth + 550); // Raise at 23
    if (monthsCounter > 420) setNetWorth(netWorth + 1000); // Kids have grown up at 35
    if (monthsCounter === 540) setNetWorth(netWorth + 50000); // Book publishing at 45, no more investment income
    if (monthsCounter > 660) setNetWorth(netWorth + 200); // Retiring at 55
    if (monthsCounter > 780) setNetWorth(netWorth + 200000); // Selling house at 65
    if (monthsCounter > 900) setNetWorth(netWorth - 100000); // Terminal illness at 75
    if (monthsCounter > 1020) setNetWorth(netWorth - 100000); // Donating at 85
    if (monthsCounter > 1140) setNetWorth(netWorth - netWorth); // Dead at 95

    if (netWorth < 0) {
      setGameOver(true);
      handleCodeyImage();
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
          return monthsCounter === 252; // 20 years
        case 2:
          return monthsCounter === 312; // 26 years
        case 3:
          return monthsCounter === 336; // 28 years
        case 4:
          return monthsCounter === 384; // 32 years
        case 5:
          return monthsCounter === 480; // 40 years
        case 6:
          return monthsCounter === 720; // 50 years
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
      setNetWorth(netWorth + Math.floor(currentChoice.price)); // Adjust net worth based on the user choice
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
          <img src="game_title.PNG" alt="header" width={250} height={150} />
        </div>

        <h2 className="intro">
          This is Codey, and every click helps him grow older. How many years
          can you add to his life?{String.fromCodePoint(0x1f914)}
        </h2>
        {gameOver && <h2 className="game-over-message">Game Over!</h2>}
        {gameOver && (
          <h2 className="game-over-jail">Codey is in JAIL for unpaid debt!</h2>
        )}

          

        <div className="codey-div">
        {/* {renderCodeywithPurchase()}  */}
          <img
            src={codeyImage}
            alt="Codey"
            className={`codey ${transitionClass}`}
            width={200}
            height={200}
            style={{
              objectFit: "contain",
              // maxWidth: "200px",
              maxHeight: "300px",
            }}
          />
        </div>

        <div>
          <AgeCounter
            monthsCounter={monthsCounter}
            handleAgeIncrement={handleAgeIncrement}
            isDisabled={gameOver}
            handleCodeyImage={handleCodeyImage}
          />
        </div>

        <div className="reload-div">
          <ReloadButton />
        </div>

        <div className="currancy-logo">
          <CurrencyCounter netWorth={netWorth} />
          {/* <img
            style={{ width: 100, height: 100 }}
            src="boat.png"
            alt="Tiny Logo"
          /> */}
        </div>

        <div className="menu-div">
        <PurchaseMenu netWorth={netWorth} handlePurchase={handlePurchase} />

        <PurchaseInventory purchaseProps={purchaseProps} />
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

        <div
          className="footer"
          onClick={() => setGameOver(true)}
          style={{ cursor: "pointer" }}
        >
          <h2>by Janna and Hamad</h2>
        </div>
      </div>
    </>
  );
}
