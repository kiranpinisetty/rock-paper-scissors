# Rock Paper Scissors

A browser-based Rock Paper Scissors game with configurable match lengths, round history, keyboard controls, and all-time statistics stored locally in the browser.

## Features

- Play against a randomly selected computer move.
- Choose a match target of 3, 5, or 7 wins.
- View the current score, round result, and move history.
- Use `R`, `P`, or `S` as keyboard shortcuts.
- Track rounds, wins, losses, and ties in browser `localStorage`.
- Start a new match or clear the current match history at any time.
- Responsive layout for desktop and mobile screens.

## Getting started

No build tools or dependencies are required. Open `index.html` directly in a modern browser, or serve the project with any static file server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Game rules

- Rock beats Scissors.
- Scissors beats Paper.
- Paper beats Rock.
- Matching moves result in a tie.

The first player to reach the selected target wins the match.

## Project structure

| File | Description |
| --- | --- |
| `index.html` | Game layout and accessible controls |
| `rock.js` | Game logic, match state, history, and statistics |
| `style.css` | Responsive visual styling |

Statistics are saved under the `rps_stats_v1` key in the browser's local storage and are specific to the browser profile being used.
