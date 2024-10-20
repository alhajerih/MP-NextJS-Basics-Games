// This array defines the options which will pop up and influence the currency (net worth) either by adding to it or decreasing from it (on top of the passive incrementing)

const choices = [
  /* when he get 21 years old */
  {
    id: 1,
    message: "Codey is doing well at his job! Should Codey ask for a bonus?",
    choiceYes: false,
    price: 2000,
  },
  /* when he get 25 years old */
  {
    id: 2,
    message:
      "It's time to think about his future. Would you like Codey to invest in CODED stock?",
    choiceYes: false,
    price: Math.floor(Math.random() * (100000 - -100000) + -100000),
  },
  /* when he get 28 years old */
  {
    id: 3,
    message:
      "Codey would like to get married. He must now pay for the wedding. Should he?",
    choiceYes: false,
    price: -100000,
  },
  /* when he get 31 years old */
  {
    id: 4,
    message:
      "Codey would like financial freedom to spend more time with his family. Should he start a business?",
    choiceYes: false,
    price: Math.floor(Math.random() * (10000 - -10000) + -10000),
  },
  /* when he get 32 years old */
  {
    id: 5,
    message:
      "Oh no! Codey is getting sued for money laundering. He must pay a fine or battle in court.",
    choiceYes: false,
    price: Math.floor(Math.random() * (10000 - -10000) + -10000),
  },
  /* when he get 45 years old */
  {
    id: 6,
    message:
      "In his retirement Codey is feeling bored and lonely. Should he learn a new skill, like gardening?",
    choiceYes: false,
    price: 5000,
  },
];
export default choices;