

// console.log(new Cell(1, 1))
// console.log(htmlCells);
// var snakeCells = [
//     new Cell(1, 1),
//     new Cell(1, 2),
//     new Cell(2, 2)
// ];
var snakeCells = getRandomSnakeCells();
console.log(snakeCells);
var snakeDirection = new Cell(0, 1);
var snake = new Snake(snakeCells, snakeDirection);

createHtmlElements();
doFirstStep();
var interval = setInterval(() => {
    if (detectCollision()) {
        gameOver();
        clearInterval(interval);
    }
    else if (_pause || !_isArrowPress) {

    }
    else {
        doStep();
    }
}, 200);