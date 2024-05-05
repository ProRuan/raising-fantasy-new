let canvas;
let keyboard;
let mouseClick;    // to edit + to move
let startScreen;
let levelScreen;

let buttons = ['newGame', 'story', 'coin', 'cup', 'settings', 'x', 'lowMusic', 'highMusic', 'lowSound', 'highSound'];
let result = {
    'best': {
        'coins': 19,
        'leaves': 17,
        'time': '7 min 13 s'
    },
    'last': {
        'coins': 17,
        'leaves': 15,
        'time': '9 min 31 s'
    }
};

let music = 4;
let sound = 7;

pointer = false;

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
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        hover(event, button);
    }
}


function hover(event, name) {
    if (startScreen) {
        let targeted = (isMouseEvent(event, startScreen[name])) ? true : false;
        setstartScreenButtonValue(name, 'targeted', targeted);
        updateCursor(event);
    }
}


function setstartScreenButtonValue(name, key, value) {
    if (startScreen[name].isReachable()) {
        startScreen[name][key] = value;
    }
}


function updateCursor(event) {
    pointer = getPointer(event);
    (pointer) ? setCursor('pointer') : setCursor('default');
}


function getPointer(event) {
    return (isBottonTargeted(event)) ? true : false;
}


function isBottonTargeted(event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        if (startScreen[button].isReachable() && isMouseEvent(event, startScreen[button])) {
            return true;
        }
    }
}


function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Make a class MouseEvent!!!


function processMouseDown(event) {
    clickArrowButton(event, 'lowMusicButton');
    clickArrowButton(event, 'highMusicButton');
    clickArrowButton(event, 'lowSoundButton');
    clickArrowButton(event, 'highSoundButton');


    closeStoryBg(event);

    clickExtraButton(event, 'cupButton');
    clickExtraButton(event, 'settingsButton');

    clickExtraButton(event, 'storyButton');


}


function closeStoryBg(event) {
    if (isStoryBgToClose(event)) {
        setstartScreenButtonValue('storyButton', 'locked', false);
    }
}


function clickExtraButton(event, name) {
    if (isMouseEvent(event, startScreen[name])) {
        setstartScreenButtonValue(name, 'locked', true);
    } else if (isLeaderBoardToClose(event)) {
        setstartScreenButtonValue(name, 'locked', false);
    }
}


function isStoryBgToClose(event) {
    return !isMouseEvent(event, startScreen.storyBg) && startScreen.storyButton.isLocked() || isMouseEvent(event, startScreen.storyBg) && isMouseEvent(event, startScreen.coinButton);
}


// cupButton or settingsButton must be locked (condition)!!!
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