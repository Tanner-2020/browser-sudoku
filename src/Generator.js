var grid;
export function generateSudokuTable(difficulty){

    grid = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

    generateDiagonal();
    sudokuSolver(grid);
    console.log(grid);

    // Sets number of values to remove for the puzzle table.
    let removedValues = 0;
    if(difficulty === "Beginner"){
        removedValues = 18;
    }
    else if(difficulty === "Easy"){
        removedValues = 27;
    }
    else if(difficulty === "Normal"){
        removedValues = 36;
    }
    else if(difficulty === "Hard"){
        removedValues = 45;
    }
    else if(difficulty === "Expert"){
        removedValues = 54;
    }
    else{
        removedValues = 81;
    }

    // Randomly removes the desired number of values
    let puzzle = grid.map(inner => inner.slice());
    for(let hidden = 0; hidden < removedValues; hidden++){
        let isRemoved = false;
        while(isRemoved === false){
            let randomIndex = Math.floor(Math.random() * 81);
            if(puzzle[Math.floor(randomIndex/9)][randomIndex%9] !== ""){
                puzzle[Math.floor(randomIndex/9)][randomIndex%9] = "";
                isRemoved = true;
            }
        }
    }
    return [grid, puzzle];
}

function generateDiagonal(){
    for(let i = 0; i < 3; i ++){
        let numList = generateList();
        for(let j = 0; j < 9; j++){
            grid[(i*3)+Math.floor(j/3)][(i*3)+j%3] = numList[j];
        }
    }
}

function generateList(){
    let list = [1,2,3,4,5,6,7,8,9];
    for(let i = 0; i < 9; i++){
        let temp = list[i]
        let randomIndex = Math.floor(Math.random()*9);
        list[i] = list[randomIndex];
        list[randomIndex] = temp;
    }
    return list;
}


// Modified off of code by user "mojtaba ramezani" on Stack Overflow
function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
          return false;
        }
    }
    return true;
}

// Modified off of code by user "mojtaba ramezani" on Stack Overflow
function sudokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = parseInt(`${k}`);
          if (sudokuSolver(data)) {
           return true;
          } else {
           data[i][j] = 0;
          }
         }
       }
       return false;
     }
   }
 }
 return true;
}