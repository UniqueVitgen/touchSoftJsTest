
console.log('alert');
var body = document.getElementsByTagName('body')[0];
var container = document.createElement("div");
// container.classList = 'container';
container.classList = 'rTable';
var objectiveOnScreen = false;
var _grow = false;
var _board_y = 20, _board_x = 20;
var htmlCells = [];
var previousSnakeCellsHtml = [];
var objectiveCell;
var K_SPACE = 32;
var K_LEFT = 37;
var K_UP = 38;
var K_RIGHT = 39;
var K_DOWN = 40;
var _pause = false;
var _isArrowPress = false;