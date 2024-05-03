let canvas;
let keyboard;
let mouseClick;    // to edit + to move
let startScreen;
let levelScreen;

const SOURCE = new Source();


function init() {
    setCanvas();
    setKeyboard();

    setStartScreen();
    // setLevelScreen();
}


// jsdoc
function setCanvas() {
    canvas = document.getElementById('canvas');
}


// jsdoc
function setKeyboard() {
    keyboard = new Keyboard();
}


// jsdoc
function setStartScreen() {
    startScreen = new StartScreen(canvas, keyboard);
}


// jsdoc
function setLevelScreen() {
    levelScreen = new LevelScreen(canvas, keyboard);
}


function processMouseMove(event) {
    hover(event, 'cupButton');
    hover(event, 'settingsButton');
}


function hover(event, name) {
    if (startScreen) {
        let targeted = (isMouseEvent(event, startScreen[name])) ? true : false;
        setstartScreenButtonValue(name, 'targeted', targeted);
    }
}


function setstartScreenButtonValue(name, key, value) {
    startScreen[name][key] = value;
}


// Make a class MouseEvent!!!


function processMouseDown(event) {
    click(event, 'cupButton');
    click(event, 'settingsButton');
}


function click(event, name) {
    if (isMouseEvent(event, startScreen[name])) {
        setstartScreenButtonValue(name, 'locked', true);
    } else {
        setstartScreenButtonValue(name, 'locked', false);
    }
}


function processMouseUp() {
    mouseClick = null;
}


// jsdoc
function isMouseEvent(m, o) {
    if (m) {
        let mouse = getMouseXY(m);
        let object = getObjectXY(o);
        return isIncluded2D(mouse, object);
    }
}


// jsdoc
function getMouseXY(m) {
    return {
        'x': m.offsetX,
        'y': m.offsetY
    }
}


// jsdoc
function getObjectXY(o) {
    return {
        'xLeft': o.xLeft,
        'xRight': o.xRight,
        'yTop': o.yTop,
        'yBottom': o.yBottom
    };
}


// jsdoc
function isIncluded2D(m, o) {
    return isIncluded(o.xLeft, m.x, o.xRight) && isIncluded(o.yTop, m.y, o.yBottom);
}


// jsdoc
function isIncluded(a, b, c) {
    return isLarger(a, b) && isLarger(b, c);
}


// jsdoc
function isLarger(a, b, tolerant) {
    return (!tolerant) ? a < b : a <= b;
}