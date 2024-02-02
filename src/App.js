import './App.css';
import { useState } from 'react';
import { generateSudokuTable } from'./Generator'

function App() {
  const [diff, setDiff] = useState("");
  const [difficultyText, setDifficultyText] = useState("Select a difficulty:");
  let puzzle = generateSudokuTable(diff);
  const [userSolution, setUserSolution] = useState(puzzle[1].map(inner => inner.slice()));
  console.log(userSolution);

  function setDifficulty(difficulty){
    if(diff !== "" && difficulty !== "" && diff !== difficulty){
      if(window.confirm("If you change the difficulty, the current Sudoku puzzle and progress will be lost!")){
        setDiff(difficulty);
        setDifficultyText("Current Difficulty: " + difficulty);
        let grid = userSolution;
        for(let i = 0; i < 9; i++){
          for(let j = 0; j < 9; j++){
            grid[i][j] = '';
          }
        }
        setUserSolution(grid);
      }
    }
    else if(diff !== "" && difficulty === ""){
      if(window.confirm("Quitting will result in the Sudoku puzzle and all progress being lost!")){
        setDiff(difficulty);
        setDifficultyText("Select a difficulty:");
        let grid = userSolution;
        for(let i = 0; i < 9; i++){
          for(let j = 0; j < 9; j++){
            grid[i][j] = '';
          }
        }
        setUserSolution(grid);
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

  function updateUserSolution(cell, rowIndex, colIndex){
    const grid = userSolution;
    grid[rowIndex][colIndex] = cell;
    setUserSolution(grid);
    console.log(grid);
  }

  function printSudoku(puzzle){
    const board = puzzle[1];
    console.log('Rerendering');
    return (
      <div id="Puzzle-grid">
        {board.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <input type="text" key={j} value={cell === '' ? userSolution[i][j] : cell} className="Puzzle-cell" disabled={cell !== ''}
              style={{backgroundColor: (((j < 3 || j >= 6) && (i < 3 || i >=6)) || (j >= 3 && j <6 && i >=3 && i < 6)) ? 'lightgray' : 'white', fontWeight: (cell !== '') ? 'bolder' : 'normal'}}
              onChange={(e) => updateUserSolution(e.target.value, i, j, userSolution)}/>
            ))}
          </div>
        ))}
      </div>
    );
  }

  function checkUserInput(table, puzzle, user){
    let isCorrect = true;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(puzzle[i][j] === ''){
          if(table[i][j] !== parseInt(user[i][j])){
            isCorrect = false;
          }
        }
      }
    }
    toggleCheck(isCorrect);
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
        <button id="Check-button" onClick={() => checkUserInput(puzzle[0], puzzle[1], userSolution)}>Check</button>
        <button id="Rules-button" onClick={() => toggleRules()}>Rules</button>
        <button id="Quit-button" onClick={() => setDifficulty("")}>Quit</button>
      </div>
      <div className="App" id="Rules-panel">
        <h2>The Rules of Sudoku:</h2>
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
        <button id="Close-button" onClick={() => toggleRules()}>Close</button>
      </div>
      <div className="App" id="Success-panel">
        <h2>Correct!</h2>
        <p>You have successfully solved the puzzle!</p>
        <button id="Close-button" onClick={() => toggleCheck(true)}>Close</button>
      </div>
      <div className="App" id="Failure-panel">
        <h2>Incorrect!</h2>
        <p>The puzzle is not correct!</p>
        <button id="Close-button" onClick={() => toggleCheck(false)}>Close</button>
      </div>
    </>
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

  function toggleCheck(isCorrect){
    if(isCorrect === true){
      if(document.getElementById("Success-panel").style.visibility === 'collapse' || document.getElementById("Success-panel").style.visibility === ''){
        document.getElementById("Success-panel").style.visibility = 'visible';
        document.getElementById("Success-panel").style.opacity = 1;
      }
      else{
        document.getElementById("Success-panel").style.visibility = 'collapse';
        document.getElementById("Success-panel").style.opacity = 0;
      }
    }
    else{
      if(document.getElementById("Failure-panel").style.visibility === 'collapse' || document.getElementById("Failure-panel").style.visibility === ''){
        document.getElementById("Failure-panel").style.visibility = 'visible';
        document.getElementById("Failure-panel").style.opacity = 1;
      }
      else{
        document.getElementById("Failure-panel").style.visibility = 'collapse';
        document.getElementById("Failure-panel").style.opacity = 0;
      }
    }
  }

export default App;
