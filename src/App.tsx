import { useState } from "react";

const WINNER_COMPS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // top-left to bottom-right diagonal
  [2, 4, 6], // top-right to bottom-left diagonal
];

const GRID = Array.from(Array(9).keys());


function App() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [plays, setPlays] = useState<Map<number, "X" | "O">>(new Map());

  function handleClick(cell: number) {

    if (plays.has(cell)) return;

    const draft = new Map(plays);

    draft.set(cell, player);

    const winner = WINNER_COMPS.find((comp) => comp.every((i) => draft.get(i) === player));
    setPlays(draft);

    if (winner) {
      setTimeout(() => {
        alert(`${player} wins!`);
        setPlays(new Map());
      }, 100);
      return;
    }

    if (plays.size === 8) {
      setTimeout(() => {
        alert("It's a draw!");
        setPlays(new Map());
      }, 100);
      return;
    }

    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }

  return (<>

    <h1>Tic Tac Toe</h1>
    <h2>Next player: {player}</h2>

    <main>

      {GRID.map((i) => (
        <button className={(plays.get(i) == "X"? "x":"o")} key={i} onClick={() => handleClick(i)}>
          <span>{plays.get(i)}</span>
        </button>
      ))}

    </main>
  </>);
}

export default App;
