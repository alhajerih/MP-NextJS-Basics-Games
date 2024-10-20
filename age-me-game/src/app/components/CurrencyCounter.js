"use client";

import React from "react";
import { useSpring, animated } from "@react-spring/web";

function CurrencyCounter({ netWorth }) {
  // Create a spring for netWorth value
  const props = useSpring({
    value: netWorth,
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="self-center">
      <animated.p className="currency-text">
        {props.value.to((val) => `${Math.floor(val)} KD`)}
      </animated.p>
    </div>
  );
}

export default CurrencyCounter;
