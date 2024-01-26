import './App.css';
import { generateSudokuTable, generatePuzzle } from'./Generator'

function App() {
  let table = generateSudokuTable();
  let puzzle = generatePuzzle(table, "hard");
  console.log(table);
  console.log(puzzle);

  return (
    <div className="App">
      <h1>ReDoKu</h1>
      <h3>- A React.js Sudoku Game -</h3>
      <p>Select a difficulty:</p>
      <button>Beginner</button>
      <button>Easy</button>
      <button>Normal</button>
      <button>Hard</button>
      <button>Expert</button>
      {printSudoku(puzzle)}
      <button>Check</button>
      <button>Rules</button>
      <button>Quit</button>
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
            <input type="text" key={j} defaultValue={cell}  className="Puzzle-cell"/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
