
function Cell(x, y) {
    this.x = x;
    this.y = y;

    this.add = function (cell) {
        this.x += cell.x;
        this.y += cell.y;
    }

    this.setCell = function (cell) {
        this.x = cell.x;
        this.y = cell.y;
    }
}

function Snake(cells, direction) {
    this.cells = cells;

    this.direction = direction;

    this.doStep = function () {
        this.cells.forEach((element, index) => {
            if (index < this.cells.length - 1) {
                this.cells[index].setCell(this.cells[index + 1]);
            }
        });
        if (_grow) {
            // this.cells.push(new Cell(last_x, last_y));
            this.addCellByDirection();
            _grow = false;
            // _score++;
        }
        else {
            this.cells[this.cells.length - 1].add(this.direction);
        }
    }

    this.getLastCell = function () {
        return this.cells[this.cells.length - 1];
    }

    this.addCellByDirection = function () {
        let lastCell = this.getLastCell();
        this.cells.push(new Cell(lastCell.x + this.direction.x, lastCell.y + this.direction.y))
    }
}