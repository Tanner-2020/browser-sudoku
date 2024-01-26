import './App.css';
import { useState } from 'react';
import { generateSudokuTable, generatePuzzle } from'./Generator'

function App() {
  const [diff, setDiff] = useState("");
  const [difficultyText, setDifficultyText] = useState("Select a difficulty:");
  let table = generateSudokuTable();
  let puzzle = generatePuzzle(table, diff);

  function setDifficulty(difficulty){
    if(diff !== "" && difficulty !== ""){
      if(window.confirm("If you change the difficulty, the current Sudoku puzzle and progress will be lost!")){
        setDiff(difficulty);
        setDifficultyText("Current Difficulty: " + difficulty);
      }
    }
    else if(diff !== "" && difficulty === ""){
      if(window.confirm("Quitting will result in the Sudoku puzzle and all progress being lost!")){
        setDiff(difficulty);
        setDifficultyText("Select a difficulty:");
      }
    }
    else {
      setDiff(difficulty);
      setDifficultyText("Current Difficulty: " + difficulty);
    }
  }

  return (
    <div className="App">
      <h1>ReDoKu</h1>
      <h3>- A React.js Sudoku Game -</h3>
      <p>{difficultyText}</p>
      <button onClick={() => setDifficulty("Beginner")}>Beginner</button>
      <button onClick={() => setDifficulty("Easy")}>Easy</button>
      <button onClick={() => setDifficulty("Normal")}>Normal</button>
      <button onClick={() => setDifficulty("Hard")}>Hard</button>
      <button onClick={() => setDifficulty("Expert")}>Expert</button>
      {printSudoku(puzzle)}
      <button>Check</button>
      <button>Rules</button>
      <button onClick={() => setDifficulty("")}>Quit</button>
    </div>
  );
}

function printSudoku(puzzle){
  const board = puzzle;

  return (
    <div className="Puzzle-grid">
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
