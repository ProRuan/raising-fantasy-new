let canvas;
let keyboard;
let mouseClick;    // to edit + to move
let startScreen;
let levelScreen;

let music = 4;
let sound = 7;

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
    hover(event, 'xButton');
    hover(event, 'lowMusicButton');
    hover(event, 'highMusicButton');
    hover(event, 'lowSoundButton');
    hover(event, 'highSoundButton');
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
    clickExtraButton(event, 'cupButton');
    clickExtraButton(event, 'settingsButton');
    clickArrowButton(event, 'lowMusicButton');
    clickArrowButton(event, 'highMusicButton');
    clickArrowButton(event, 'lowSoundButton');
    clickArrowButton(event, 'highSoundButton');
}


function clickExtraButton(event, name) {
    if (isMouseEvent(event, startScreen[name])) {
        setstartScreenButtonValue(name, 'locked', true);
    } else if (isLeaderBoardToClose(event)) {
        setstartScreenButtonValue(name, 'locked', false);
    }
}


function isLeaderBoardToClose(event) {
    return !isMouseEvent(event, startScreen.leaderboard) || isMouseEvent(event, startScreen.leaderboard) && isMouseEvent(event, startScreen.xButton);
}


function clickArrowButton(event, name) {
    updateVolume(event, name);
}


function updateVolume(event, name) {
    if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'lowMusicButton') && isLarger(0, music)) {
        music--;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'highMusicButton') && isLarger(music, 9)) {
        music++;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'lowSoundButton') && isLarger(0, sound)) {
        sound--;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'highSoundButton') && isLarger(sound, 9)) {
        sound++;
    }
}


function isMatch(a, b) {
    return a == b;
}


function isWordMatch(word, subword) {
    return word.includes(subword);
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