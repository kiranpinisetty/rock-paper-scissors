const button = document.getElementById("btn");

button.addEventListener("click", rockPaperScissorsGame);

function rockPaperScissorsGame() {
  const userInput = document.getElementById("userChoice").value.toLowerCase();
  const userResult = document.getElementById("userResult");
  const computerResult = document.getElementById("computerResult");
  const winner = document.getElementById("winner");

  if (!userInput) {
    winner.textContent = "Please enter a choice!";
    return;
  }

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  userResult.textContent = `You chose: ${userInput}`;
  computerResult.textContent = `Computer chose: ${computerChoice}`;

  if (
    (userInput === "rock" && computerChoice === "scissors") ||
    (userInput === "paper" && computerChoice === "rock") ||
    (userInput === "scissors" && computerChoice === "paper")
  ) {
    winner.textContent = "You Win! 🎉";
    winner.style.color = "green";
  } else if (userInput === computerChoice) {
    winner.textContent = "It's a Tie 🤝";
    winner.style.color = "orange";
  } else if (!choices.includes(userInput)) {
    winner.textContent = "Invalid input! Use rock, paper, or scissors.";
    winner.style.color = "red";
  } else {
    winner.textContent = "Computer Wins 😈";
    winner.style.color = "red";
  }
}
