//1. Deposit the money
//2. Determine the number of  lines to bet
//3. Collect the bet amount
//4. Spin the slot machine
//5. Check if the user win
//6. Give the user their winnings
//7.  Play again

const prompt = require("prompt-sync")();

//global variables
const ROWS = 3;
const COLS = 3;

const Symbol_Counts = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const Symbol_Values = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const spin = () => {
  const symbols = [];
  for (const [symbol, counts] of Object.entries(Symbol_Counts)) {
    for (let i = 0; i < counts; i++) {
      symbols.push(symbol);
    }
  }
  //what is error in this code
  //console.log(symbols);
  const reels = [];

  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelsSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsSymbol.length);
      const SeletedSymbol = reelsSymbol[randomIndex];
      reels[i].push(SeletedSymbol);

      reelsSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

//console.log(reelSpin);

const Deposit = () => {
  while (true) {
    const amountDeposit = prompt("Enter the deposit amount to bet: ");
    //convert the string  to a number
    const numberDepositAmount = parseFloat(amountDeposit);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log(
        "Invalid deposit Amount,Try Again must be a number and must be greater than zero"
      );
    } else {
      //console.log("good deposit Amount");
      return numberDepositAmount;
    }
  }
};
//<<<<<<<<....using balance parameter to get bet..........>>>>>>>
//<<<<<<<<<<....if balance is less than bet than i can't bet >>>>>>>>>>>>>>>>>
let Balance = Deposit(); //intial account balance
//console.log(Balance);

const getBet = (Balance, numberOfLines) => {
  while (true) {
    const bet = prompt("Enter the total betper line: ");
    //convert the string  to a number
    const numberofBet = parseFloat(bet);

    if (
      isNaN(numberofBet) ||
      numberofBet <= 0 ||
      numberofBet > Balance / numberOfLines
    ) {
      console.log(
        "Invalid bet Amount,Try Again must be a small than balance and must be greater than zero"
      );
    } else {
      //console.log("good bet Amount");
      return numberofBet;
    }
  }
};

//calling the bet function

//console.log(Showbet);

const getNumberofLines = () => {
  while (true) {
    const numberOfLines = prompt("Enter the number of lines to bet(1-3): ");
    //convert the string  to a number
    const numberNumberOfLines = parseInt(numberOfLines);

    if (
      isNaN(numberNumberOfLines) ||
      numberNumberOfLines <= 0 ||
      numberNumberOfLines > 3
    ) {
      console.log(
        "Invalid number of lines,Try Again must be a number and must be greater than zero"
      );
    } else {
      //console.log("good number of lines");
      return numberNumberOfLines;
    }
  }
};

const LinesEntered = getNumberofLines();
//console.log(LinesEntered);
const Showbet = getBet(Balance, LinesEntered);

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < ROWS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
const reels = spin();
const rows = transpose(reels);
// console.log(rows);
// console.log(reels);

const Printrow = (row) => {
  for (const row of rows) {
    let rowString = [];
    for (const [i, symbol] of rows.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }

    console.log(rowString);
  }
};
Printrow(rows);

const Winning = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * Symbol_Values[symbols[0]];
    }
  }
  return winnings;
};

//console.log(Winning());
const winnings = Winning(rows, Showbet, LinesEntered);
console.log("u won $," + winnings.toString());
