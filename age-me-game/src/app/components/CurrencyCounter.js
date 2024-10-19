"use client";

import React from "react";
import { useState } from "react";

function CurrencyCounter({ netWorth }) {
  return (
    <div className="self-center">
      <p className="currency-text">{netWorth}KD</p>
    </div>
  );
}

export default CurrencyCounter;
