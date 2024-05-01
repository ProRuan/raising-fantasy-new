let canvas;
let keyboard;
let mouseClick;
let world;


function init() {
    setCanvas();
    setKeyboard();
    setWorld(canvas, keyboard);
}


function setCanvas() {
    canvas = document.getElementById('canvas');
}


function setKeyboard() {
    keyboard = new Keyboard();
}


function setWorld(canvas, keyboard) {
    world = new World(canvas, keyboard);
}


function processMouseDown(event) {
    mouseClick = getMouseXY(event);
    // Make a class MouseClick


    console.clear();
    console.log(isMouseEvent(event, world.CUP_BUTTON));
    console.log(isMouseEvent(event, world.SETTINGS_BUTTON));
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