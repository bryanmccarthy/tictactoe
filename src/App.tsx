import './App.css';
import { useState } from 'react';

const BOARD_LEN = 9;

const winRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]

type GamePropTypes = {
  squares: any[];
  setSquares: (value: any) => void;
  turn: number;
  setTurn: (value: number) => void;
  winner: string;
  setWinner: (value: string) => void;
  displayPopup: boolean;
  setDisplayPopup: (value: boolean) => void;
  handleRestart: () => void;
}

function Game({squares, setSquares, turn, setTurn, winner, setWinner, displayPopup, setDisplayPopup, handleRestart}: GamePropTypes) {

  function handleSetSquare(idx: number, mark: string) {
    let newSquares = [];
    for(let i = 0; i < BOARD_LEN; i++) {
      newSquares[i] = squares[i];
      if (i === idx) newSquares[i] = mark;
    }
    setSquares(newSquares);
    checkForWinner(newSquares);
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

  function checkForWinner(squares: any[]) {
    for(let i = 0; i < winRows.length; i++) {
      const possibleRow = winRows[i];
      const possibleWinner = squares[possibleRow[0]];
      if(squares[possibleRow[0]] === '') continue;
      if(squares[possibleRow[0]] === squares[possibleRow[1]] && squares[possibleRow[0]] === squares[possibleRow[2]]) {
        setWinner(possibleWinner);
        setDisplayPopup(true);
        return;
      }
    }

    if(!squares.includes('')) {
      setWinner('draw');
      setDisplayPopup(true);
    }
  }

  return (
    <div className="Game">
      {
        squares.map((square, idx) => (
          <div className="Square" key={idx} onClick={() => handleSquareClick(idx)}>
            <div className="SquareItem" style={{color: square === 'X' ? '#c5f007' : '#ed0731' }}>{ square }</div>
          </div>
        ))
      }
      <Popup displayPopup={displayPopup} winner={winner} handleRestart={handleRestart} />
    </div>
  )
}

type PopupPropTypes = {
  displayPopup: boolean,
  winner: string,
  handleRestart: () => void;
}

function Popup({ displayPopup, winner, handleRestart }: PopupPropTypes) {
  return (
    <div style={{visibility: displayPopup ? 'visible' : 'hidden' }} className="Popup">
      {
        winner === 'draw' ?
          <p className="WinnerText">{ winner }</p>
        :
          <p className="WinnerText"> { winner } Wins</p>
      }
      <button className="RestartButton" onClick={handleRestart}>Play again</button>
    </div>
  )
}

function App() {
  const [squares, setSquares] = useState<any[]>([
    '', '', '', '', '', '', '', '', ''
  ]);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState('');
  const [displayPopup, setDisplayPopup] = useState(false);

  function handleRestart() {
    setSquares(['', '', '', '', '', '', '', '', '']);
    setDisplayPopup(false);
    setWinner('');
    setTurn(0);
  }

  return (
    <div className="App">
      <div className="Title">Tic Tac Toe</div>
      <Game
        squares={squares}
        setSquares={setSquares}
        turn={turn}
        setTurn={setTurn}
        winner={winner}
        setWinner={setWinner}
        displayPopup={displayPopup}
        setDisplayPopup={setDisplayPopup}
        handleRestart={handleRestart}
      />
      <div className="GamePanel">
        <p className="TurnLabel">{turn === 0 ? "Player 1's turn (X)" : "Player 2's turn (O)"}</p>
        <button className="RestartButton" onClick={handleRestart}>Restart</button>
      </div>
    </div>
  )
}

export default App;
