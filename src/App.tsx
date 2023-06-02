import './App.css';
import { useState } from 'react';

const BOARD_LEN = 9;

function Game() {
  const [squares, setSquares] = useState<any[]>([
    '', '', '', '', '', '', '', '', ''
  ]);
  const [turn, setTurn] = useState(0);

  function handleSetSquare(idx: number, mark: string) {
    let newSquares = [];
    for(let i = 0; i < BOARD_LEN; i++) {
      newSquares[i] = squares[i];
      if (i === idx) newSquares[i] = mark;
    }
    setSquares(newSquares);
  }

  function handleSquareClick(idx: number) {
    if (squares[idx] !== "") return;
    
    if (turn === 0) {
      handleSetSquare(idx, 'X');
      setTurn(1);
    } else if (turn === 1) {
      handleSetSquare(idx, 'O');
      setTurn(0);
    }
  }

  return (
    <div className="Game">
      {
        squares.map((square, idx) => (
          <div className="Square" key={idx} onClick={() => handleSquareClick(idx)}>
            <div className="SquareItem">{ square }</div>
          </div>
        ))
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  )
}

export default App;
