export function generateSudokuTable(difficulty){

    let grid = [[7,2,6,3,5,9,4,1,8],
                [4,5,8,1,6,7,2,3,9],
                [9,1,3,8,2,4,7,6,5],
                [1,6,2,9,7,5,3,8,4],
                [3,9,4,2,8,6,1,5,7],
                [8,7,5,4,1,3,9,2,6],
                [5,3,7,6,4,1,8,9,2],
                [6,8,9,7,3,2,5,4,1],
                [2,4,1,5,9,8,6,7,3]];

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
    console.log(grid);
    return [grid, puzzle];
}
