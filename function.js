
function gameOver() {
    alert("You lose! F5 to play again.");
    return false;
}

function detectCollision() {
    died = false;

    // I did separated for the sake of readability
    var lastCell = this.snake.cells[this.snake.cells.length - 1];
    if (lastCell.x < 0 || lastCell.y < 0)
        died = true;

    else if (lastCell.x >= 20 || lastCell.y >= 20)
        died = true;

    else
        // Verifies if snake's head collided with the body
        this.snake.cells.forEach((cell, index) => {
            if (index < this.snake.cells.length - 1) {
                if (cell.x == lastCell.x && cell.y == lastCell.y)
                    died = true;

            }

        })
    // for (i = 1; i < _x.length; i++)
    //     if (_x[0] == _x[i] && _y[0] == _y[i])
    //         died = true;

    return died;
}

function createHtmlElements() {
    body.appendChild(container);
    body.addEventListener('keyup', (event) => {
        // console.log(event.keyCode);
        if (event.keyCode == K_SPACE) {
            _pause = !_pause
            return false;
        }
        if (event.keyCode == 37) {
            if (this.snake.previousDirection.x != 1) {
                this.snake.direction.y = 0;
                this.snake.direction.x = -1;
                _isArrowPress = true;
            }
        }
        if (event.keyCode == 38) {
            if (this.snake.previousDirection.y != 1) {
                this.snake.direction.y = -1;
                this.snake.direction.x = 0;
                _isArrowPress = true;
            }
        }
        if (event.keyCode == 39) {
            if (this.snake.previousDirection.x != -1) {
                this.snake.direction.y = 0;
                this.snake.direction.x = 1;
                _isArrowPress = true;
            }
        }
        if (event.keyCode == 40) {
            if (this.snake.previousDirection.y != -1) {
                this.snake.direction.y = 1;
                this.snake.direction.x = 0;
                _isArrowPress = true;
            }
        }
    })
    for (var i = 0; i < 20; i++) {
        htmlCells[i] = [];
        // var node = document.createElement("div");      
        // node.classList="row-container";
        // container.appendChild(node);
        var node2 = document.createElement("div");
        // node2.classList = "row";
        node2.classList = "rTableRow";
        container.appendChild(node2);
        for (var j = 0; j < 20; j++) {
            var col = document.createElement("div");
            // col.classList = "column";
            col.classList = "rTableCell " + 'cell' + i + "-" + j;
            htmlCells[i][j] = col;
            node2.appendChild(col);
        }
    }

}

function doStep() {
    snake.doStep();
    doFirstStep();

}

function getRandomSnakeCells() {

    var cells = [];
    var x = Math.floor(Math.random() * (_board_x));
    var y = Math.floor(Math.random() * (_board_y));
    cells.push(new Cell(x, y));
    var currentCell = new Cell(x,y);
    for (var i = 1; i < 3; i++) {
        var isValidData = false;
        var direction;
        // var inside = isInside(currentCell, cells);
        var inside = true;
        while (!isValidData || inside) {
            var rand = Math.floor(Math.random() * 4);
            if (rand == 0) {
                direction = new Cell(-1, 0);
            }
            else if (rand == 1) {
                direction = new Cell(0, -1);

            }
            else if (rand == 2) {
                direction = new Cell(1, 0);
            }
            else if (rand == 3) {
                direction = new Cell(0, 1);
            }
            direction.add(currentCell);
            isValidData = isValidCell(direction);
            inside = isInside(direction, cells);
        }
        cells.push(direction);
        currentCell.setCell(direction);
    }
    return cells;
}

function isValidCell(cell) {
    var isValidX = cell.x < 20 && cell.x >= 0;
    var isValidY = cell.y < 20 && cell.y >= 0;
    return isValidX && isValidY;
}

function isInside(cell, cells) {
    var inside = false;
    for (i = 0; i < cells.length; i++) {
        if (cell.x == cells[i].x && cell.y == cells[i].y) {
            inside = true;
            continue;
        }
    }
    return inside;
}

function doFirstStep() {
    // snake.doStep();
    for (var previousHtml of previousSnakeCellsHtml) {
        previousHtml.classList.remove('snake-cell');
        previousHtml.classList.remove('last-snake-ceil');
    }
    previousSnakeCellsHtml = [];
    snake.cells.forEach( (snakeCell, index) =>{
        var currentHtmlCell = htmlCells[snakeCell.y][snakeCell.x];
        currentHtmlCell.classList.add('snake-cell');
        if(index == snake.cells.length - 1) {
            currentHtmlCell.classList.add('last-snake-ceil');
        }
        previousSnakeCellsHtml.push(currentHtmlCell);
    })
    if (objectiveCell && objectiveCell.x == this.snake.getLastCell().x && objectiveCell.y == this.snake.getLastCell().y) {
        _grow = true;
        objectiveOnScreen = false;
        htmlCells[objectiveCell.y][objectiveCell.x].classList.remove('object-cell');
    }
    this.snake.previousDirection.setCell(this.snake.direction);
    placeObjective();
}

function placeObjective() {
    if (!objectiveOnScreen) {
        // Test if will not place objective inside snake
        inside = true;
        while (inside) {
            inside = false;

            _objective_x = Math.floor(Math.random() * _board_x);
            _objective_y = Math.floor(Math.random() * _board_y);

            for (i = 0; i < this.snake.cells.length; i++) {
                if (_objective_x == this.snake.cells[i].x && _objective_y == this.snake.cells[i].y) {
                    inside = true;
                    continue;
                }
            }
        }

        objectiveOnScreen = true;
    }
    // $("#" + _objective_y + "-" + _objective_x).css("backgroundColor", _color["obj"]);
    htmlCells[_objective_y][_objective_x].classList.add('object-cell');
    objectiveCell = new Cell(_objective_x, _objective_y);
}
