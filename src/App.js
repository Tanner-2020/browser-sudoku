import './App.css';
import { useState } from 'react';
import { generateSudokuTable, generatePuzzle } from'./Generator'

function App() {
  const [diff, setDiff] = useState("");
  const [difficultyText, setDifficultyText] = useState("Select a difficulty:");
  let table = generateSudokuTable();
  let puzzle = generatePuzzle(table, diff);

  function setDifficulty(difficulty){
    if(diff !== "" && difficulty !== "" && diff !== difficulty){
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
    else if(diff === "" && difficulty === ""){
      setDifficultyText("Select a difficulty:");
    }
    else {
      setDiff(difficulty);
      setDifficultyText("Current Difficulty: " + difficulty);
    }
  }

  return (
    <>
      <div className="App">
        <h1>ReDoKu</h1>
        <h3>- A React.js Sudoku Game -</h3>
        <p>{difficultyText}</p>
        <button id="Beginner-button" onClick={() => setDifficulty("Beginner")}>Beginner</button>
        <button id="Easy-button" onClick={() => setDifficulty("Easy")}>Easy</button>
        <button id="Normal-button" onClick={() => setDifficulty("Normal")}>Normal</button>
        <button id="Hard-button" onClick={() => setDifficulty("Hard")}>Hard</button>
        <button id="Expert-button" onClick={() => setDifficulty("Expert")}>Expert</button>
        {printSudoku(puzzle)}
        <button id="Check-button">Check</button> {/* TODO: Create a component to evaluate if a puzzle has been solved successfully */}
        <button id="Rules-button" onClick={() => toggleRules()}>Rules</button> {/* TODO: Create panel that opens next to the game board that can be closed without disturbing the game */}
        <button id="Quit-button" onClick={() => setDifficulty("")}>Quit</button>
      </div>
      <div className="App" id="Rules-panel">
        <h2>The rules of sudoku:</h2>
        <p>The goal of sudoku is simple: Fill the open spaces in the puzzle grid with the correct number.</p>
        <h4>The numbers entered in the grid must fit the required criteria, listed below:</h4>
        <p>Each 3x3 section of the puzzle grid must include the numbers 1 through 9. Each number must appear once.</p>
        <p>Each row of the puzzle grid must contain the numbers 1 through 9. Each number must appear once.</p>
        <p>Each column of the puzzle grid must contain the numbers 1 through 9. Each number must appear once.</p>
        <h4>This game features various difficulties:</h4>
        <p>Beginner: The player must fill in 18 numbers into the grid.</p>
        <p>Easy: The player must fill in 27 numbers into the grid.</p>
        <p>Normal: The player must fill in 36 numbers into the grid.</p>
        <p>Hard: The player must fill in 45 numbers into the grid.</p>
        <p>Expert: The player must fill in 54 numbers into the grid.</p>
        <h4>Tips for beginners:</h4>
        <p>Start by trying to fill in the 3x3 sections that contain the most numbers from the start.</p>
        <p>Look for rows or columns where the 3x3 sections have 2 of a number defined. This can narrow down where the third occurrence of that number will appear.</p>
        <p>Focus the number that appears the most in the given squares of the puzzle grid.</p>
      </div>
    </>
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

function toggleRules(){
  if(document.getElementById("Rules-panel").style.visibility === 'collapse' || document.getElementById("Rules-panel").style.visibility === ''){
    document.getElementById("Rules-panel").style.visibility = 'visible';
    document.getElementById("Rules-panel").style.opacity = 1;
  }
  else{
    document.getElementById("Rules-panel").style.visibility = 'collapse';
    document.getElementById("Rules-panel").style.opacity = 0;
  }
}

export default App;
