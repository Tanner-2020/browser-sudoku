import logo from './logo.svg';
import './App.css';
import { generateSudokuTable, generatePuzzle } from'./Generator'

function App() {
  let table = generateSudokuTable();
  let puzzle = generatePuzzle(table, "hard");
  console.log(table);
  console.log(puzzle);

  return (
    <div className="App">
      {printSudoku(puzzle)}
    </div>
  );
}

function printSudoku(puzzle){
  const board = puzzle;

  return (
    <div>
      {board.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <span key={j}>{cell} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
