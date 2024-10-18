"use client";
import React from "react";
import { useState } from "react";

function AgeCounter({age, handleAge}) {

  return (
    <div>
      {age}
      <button onClick={handleAge}>Age Me!</button>
    </div>
  );
}

export default AgeCounter;
