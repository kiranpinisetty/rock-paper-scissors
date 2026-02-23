const CHOICES = ["rock", "paper", "scissors"];
const statsKey = "rps_stats_v1";

const state = {
  playerScore: 0,
  computerScore: 0,
  round: 0,
  targetWins: 5,
  matchOver: false
};

const elements = {
  targetWins: document.getElementById("targetWins"),
  targetWinsLabel: document.getElementById("targetWinsLabel"),
  newMatchBtn: document.getElementById("newMatchBtn"),
  playerScore: document.getElementById("playerScore"),
  computerScore: document.getElementById("computerScore"),
  statusText: document.getElementById("statusText"),
  roundCount: document.getElementById("roundCount"),
  lastPlayerMove: document.getElementById("lastPlayerMove"),
  lastComputerMove: document.getElementById("lastComputerMove"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  totalGames: document.getElementById("totalGames"),
  totalWins: document.getElementById("totalWins"),
  totalLosses: document.getElementById("totalLosses"),
  totalTies: document.getElementById("totalTies"),
  moveButtons: [...document.querySelectorAll(".move-btn")]
};

const stats = loadStats();
renderStats();
startNewMatch();

elements.moveButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.move));
});

elements.newMatchBtn.addEventListener("click", startNewMatch);
elements.clearHistoryBtn.addEventListener("click", clearRoundHistory);
elements.targetWins.addEventListener("change", () => {
  state.targetWins = Number(elements.targetWins.value);
  elements.targetWinsLabel.textContent = String(state.targetWins);
  startNewMatch();
});

window.addEventListener("keydown", (event) => {
  const keyMap = { r: "rock", p: "paper", s: "scissors" };
  const move = keyMap[event.key.toLowerCase()];
  if (move) {
    playRound(move);
  }
});

function startNewMatch() {
  state.playerScore = 0;
  state.computerScore = 0;
  state.round = 0;
  state.matchOver = false;
  state.targetWins = Number(elements.targetWins.value);

  elements.targetWinsLabel.textContent = String(state.targetWins);
  elements.playerScore.textContent = "0";
  elements.computerScore.textContent = "0";
  elements.roundCount.textContent = "Round 0";
  elements.statusText.textContent = "Choose your move to start.";
  elements.statusText.className = "status";
  elements.lastPlayerMove.textContent = "-";
  elements.lastComputerMove.textContent = "-";

  clearRoundHistory();
  setButtonsDisabled(false);
}

function playRound(playerMove) {
  if (state.matchOver || !CHOICES.includes(playerMove)) {
    return;
  }

  const computerMove = CHOICES[Math.floor(Math.random() * CHOICES.length)];
  state.round += 1;

  const outcome = getRoundOutcome(playerMove, computerMove);

  if (outcome === "win") {
    state.playerScore += 1;
    stats.totalWins += 1;
    setStatus("You win this round.", "win");
  } else if (outcome === "loss") {
    state.computerScore += 1;
    stats.totalLosses += 1;
    setStatus("Computer wins this round.", "loss");
  } else {
    stats.totalTies += 1;
    setStatus("Round tied.", "tie");
  }

  stats.totalGames += 1;
  saveStats();
  renderStats();

  elements.playerScore.textContent = String(state.playerScore);
  elements.computerScore.textContent = String(state.computerScore);
  elements.roundCount.textContent = `Round ${state.round}`;
  elements.lastPlayerMove.textContent = formatMove(playerMove);
  elements.lastComputerMove.textContent = formatMove(computerMove);
  highlightMove(playerMove);

  prependHistoryItem(state.round, playerMove, computerMove, outcome);
  evaluateMatchEnd();
}

function getRoundOutcome(player, computer) {
  if (player === computer) {
    return "tie";
  }

  const isWin =
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper");

  return isWin ? "win" : "loss";
}

function evaluateMatchEnd() {
  if (state.playerScore >= state.targetWins) {
    state.matchOver = true;
    setStatus(`Match won ${state.playerScore}-${state.computerScore}. Start a new match.`, "win");
    setButtonsDisabled(true);
  } else if (state.computerScore >= state.targetWins) {
    state.matchOver = true;
    setStatus(`Match lost ${state.playerScore}-${state.computerScore}. Start a new match.`, "loss");
    setButtonsDisabled(true);
  }
}

function prependHistoryItem(round, playerMove, computerMove, outcome) {
  const empty = elements.historyList.querySelector(".history-empty");
  if (empty) {
    empty.remove();
  }

  const li = document.createElement("li");
  li.className = outcome;
  li.textContent = `R${round}: You ${formatMove(playerMove)} vs Computer ${formatMove(computerMove)} -> ${outcome.toUpperCase()}`;
  elements.historyList.prepend(li);
}

function clearRoundHistory() {
  elements.historyList.innerHTML = '<li class="history-empty">No rounds played yet.</li>';
}

function setButtonsDisabled(disabled) {
  elements.moveButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function setStatus(message, type) {
  elements.statusText.textContent = message;
  elements.statusText.className = "status";
  if (type) {
    elements.statusText.classList.add(type);
  }
}

function highlightMove(move) {
  elements.moveButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.move === move);
  });
}

function formatMove(move) {
  return move.charAt(0).toUpperCase() + move.slice(1);
}

function loadStats() {
  try {
    const raw = localStorage.getItem(statsKey);
    if (!raw) {
      return { totalGames: 0, totalWins: 0, totalLosses: 0, totalTies: 0 };
    }

    const parsed = JSON.parse(raw);
    return {
      totalGames: Number(parsed.totalGames) || 0,
      totalWins: Number(parsed.totalWins) || 0,
      totalLosses: Number(parsed.totalLosses) || 0,
      totalTies: Number(parsed.totalTies) || 0
    };
  } catch (_) {
    return { totalGames: 0, totalWins: 0, totalLosses: 0, totalTies: 0 };
  }
}

function saveStats() {
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

function renderStats() {
  elements.totalGames.textContent = String(stats.totalGames);
  elements.totalWins.textContent = String(stats.totalWins);
  elements.totalLosses.textContent = String(stats.totalLosses);
  elements.totalTies.textContent = String(stats.totalTies);
}
