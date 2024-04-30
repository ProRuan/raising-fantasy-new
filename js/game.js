let canvas;
let keyboard;
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