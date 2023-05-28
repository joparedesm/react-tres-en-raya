import { ReactNode, useState, FC, MouseEventHandler } from "react";

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

interface CasillaProps {
  children: ReactNode;
  updateGRID?: (index: number) => void;
  index: number;
  isSelected: boolean;
  disabled?: boolean;
}

const TURNS = {
  X: "x",
  O: "o"
}

const Casilla:FC<CasillaProps> = ({ children, isSelected, updateGRID, index }) => {
  const desactivado = index%10 === 0;
  const className = (desactivado ? "player" : "") + (isSelected? " selected" : " ");
  const handleClick:MouseEventHandler<HTMLButtonElement> = () => {
    if (updateGRID) updateGRID(index);
  }

  return (
    <button onClick={handleClick} className={ className } key={index} disabled={ desactivado }>
      <span>{children}</span>
    </button>
  )
}

function App() {
  // const [player, setPlayer] = useState<"X" | "O">("X");
  // const [plays, setPlays] = useState<Map<number, "X" | "O">>(new Map());

  // function handleClick(cell: number) {

  //   if (plays.has(cell)) return;

  //   const draft = new Map(plays);

  //   draft.set(cell, player);

  //   const winner = WINNER_COMPS.find((comp) => comp.every((i) => draft.get(i) === player));
  //   setPlays(draft);

  //   if (winner) {
  //     setTimeout(() => {
  //       alert(`Gana ${player}!`);
  //       setPlays(new Map());
  //     }, 100);
  //     return;
  //   }

  //   if (plays.size === 8) {
  //     setTimeout(() => {
  //       alert("Empate!");
  //       setPlays(new Map());
  //     }, 100);
  //     return;
  //   }

  //   setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  // }

  const [GRID, setGRID] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const updateGRID = (index: number) => {
    if ( GRID[index-1] ) return;
    // update GRID
    const newGRID = [...GRID];
    newGRID[index-1] = turn;
    setGRID(newGRID);
    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

  };

  return (<>

    <h1>Tres en raya</h1>
    <h2>Jugador:
    <section className="turn">
      <Casilla index={10}
      isSelected={ turn === TURNS.X } >
        {TURNS.X}
      </Casilla>
      <Casilla index={20}
      isSelected={ turn === TURNS.O }>
        {TURNS.O}
      </Casilla>
    </section>
    </h2>
    <main>

      {GRID.map((_, i) => (
        <Casilla
        key={i+1}
        index={i+1}
        isSelected={false}
        updateGRID={updateGRID}
        disabled={ !!GRID[i] } //<-- here
         >
          { GRID[i] }
        </Casilla>
      ))}

    </main>
  </>);
}

export default App;
