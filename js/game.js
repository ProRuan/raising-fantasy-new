let canvas;
let keyboard;
let hovered = false;    // rename?
let buttonSelected = false;    // move to StartWorld?!
let mouseClick;    // to edit + to move

let world;
let inPlay = true;    // set to false!!!
let currentWorld = 'level';    // condition for mouse and keyboard!!!

let buttons = ['newGame', 'story', 'cup', 'settings', 'coin', 'x', 'lowMusic', 'highMusic', 'lowSound', 'highSound'];
let storableItems = {};

let tempScore;
let score = {
    'best': { coins: 0, leaves: 0, time: 300000 },
    'last': { coins: 0, leaves: 0, time: 300000 }
};


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

let counter = 0;    // for start world (necessary?)

let volume = { music: 5, sound: 5 };    // to set in level world!
let music = 3;
let sound = 7;

pointer = false;

let paused = false;
let pauseStart = 0;
let pauseEnd = 0;
let pauseTime = 0;

let source = new Source();


function init() {
    loadScore();
    loadVolume();
    setCanvas();
    setKeyboard();

    // set class Star!!!

    world = new StartWorld(canvas, keyboard);
    currentWorld = 'start';    // set start!

    // world = new LevelWorld(canvas, keyboard);    // is working
    // currentWorld = 'level';    // is working

    // switchWorld();    // necessary? --> menu control!

    setStoreableItems();
}


function switchWorld() {    // only for testing?
    setInterval(() => {
        if (inPlay == true) {
            world = new LevelWorld(canvas, keyboard);
            inPlay = null;
            currentWorld = 'level';
        } else if (inPlay == false) {
            world = new StartWorld(canvas, keyboard);
            inPlay = null;
            currentWorld = 'start';
        }
    }, 1000 / 60);
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
function setStartWorld() {
    world = new StartWorld(canvas, keyboard);
}


// jsdoc
function setLevelWorld() {
    world = new LevelWorld(canvas, keyboard);
}


// jsdoc
function setStoreableItems() {
    storableItems.score = score;
    storableItems.volume = volume;
}


let mainButtons = ['newGameButton', 'storyButton', 'cupButton', 'settingsButton'];
let mainButtonCounter = 0;
let volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];
let volumeButtonsId = 0;
let musicButtons = true;


function processKeydown(event) {    // check doubleClick!!!
    if (isMatch(currentWorld, 'start')) {
        world.currentButton.selected = true;    // newGameButton selected?
    }

    // console.log(event);
    let code = getCode(event.code);
    setKey(code, 'keydown', true);
    setKey(code, 'timeStamp', getTime());
    verifyDoubleClick(code);


    if (isMatch(currentWorld, 'start')) {
        closeWithKey('backspace', 'leaderboard', 'xButton');
        closeWithKey('backspace', 'questRoll', 'coinButton');
        closeWithKey('space', 'leaderboard', 'xButton');
        closeWithKey('space', 'questRoll', 'coinButton');
        closeWithKey('keyX', 'leaderboard', 'xButton');
        closeWithKey('keyX', 'questRoll', 'coinButton');
    }

    if (isMatch(currentWorld, 'level')) {
        if (isKey('keyP')) {
            (!paused) ? pauseGame(true) : pauseGame(false);
            paused = (!paused) ? true : false;
            if (paused) {
                pauseStart = getTime();
            } else {
                pauseEnd = getTime();
                pauseTime += getSum(pauseEnd, -pauseStart);
                console.log('Pause time: ', pauseTime);
            }
        }
    }

}


// jsdoc
function closeWithKey(key, dialog, button) {
    if (isKey(key) && world[dialog].isOpened()) {
        world[button].locked = true;
    }
}


function processKeyup(event) {
    buttonSelected = false;
    keyboard.enter.locked = false;

    // console.log(event);    // to delete!!!
    let code = getCode(event.code);
    setKey(code, 'keydown', false);
    setKey(code, 'doubleClick', false);
    setKey(code, 'lastKeyUp', getTime());
}


// jsdoc
function getTime() {
    return new Date().getTime();
}



// Make a class MouseEvent!!!


function isMatch(a, b) {
    return a == b;
}


function isWordMatch(word, subword) {
    return word.includes(subword);
}


function isMouseEvent(mouse, object) {
    if (mouse && object) {
        let m = getMouseXY(mouse);
        // console.log(m, object);
        return isIncluded2D(m, object);
    }
}


// jsdoc
function getMouseXY(m) {
    return { x: m.offsetX, y: m.offsetY };
}


// jsdoc
function isCollided(a, b) {
    return isCollidedX(a, b) && isCollidedY(a, b);
}


// jsdoc
function isCollidedX(a, b) {
    return isCollidedXLeft(a, b) || isCollidedXRight(a, b);
}


// jsdoc
function isCollidedY(a, b) {
    return isCollidedYTop(a, b) || isCollidedYBottom(a, b);
}


// jsdoc
function isCollidedXLeft(a, b) {
    return isIncluded(a.xLeft, b.xLeft, a.xRight) || isIncluded(b.xLeft, a.xLeft, b.xRight);
}


// jsdoc
function isCollidedXRight(a, b) {
    return isIncluded(a.xLeft, b.xRight, a.xRight) || isIncluded(b.xLeft, a.xRight, b.xRight);
}


// jsdoc
function isCollidedYTop(a, b) {
    return isIncluded(a.yTop, b.yTop, a.yBottom) || isIncluded(b.yTop, a.yTop, b.yBottom);
}


// jsdoc
function isCollidedYBottom(a, b) {
    return isIncluded(a.yTop, b.yBottom, a.yBottom) || isIncluded(b.yTop, a.yBottom, b.yBottom);
}


// jsdoc
function isIncluded2D(m, o) {
    return isIncluded(o.xLeft, m.x, o.xRight) && isIncluded(o.yTop, m.y, o.yBottom);
}


// jsdoc
function isIncluded(a, b, c) {
    return isGreater(a, b) && isGreater(b, c);
}


// jsdoc
function isGreater(a, b, tolerant) {    // rename to isGreater()
    return (!tolerant) ? a < b : a <= b;
}


function formatSplitWord(text) {
    if (text.includes('_')) {
        text = text.split('_');
        let secondInitial = text[1][0].toUpperCase();
        text[1] = text[1].replace(text[1][0], secondInitial);
        return text[0] + text[1];
    } else {
        return text;
    }
}


// jsdoc
function isUndefined(value) {
    return value === undefined;
}


// jsdoc
function isTrue(value) {
    return (value == true) ? true : false;
}


// jsdoc
function isOnTime(current, last, value) {
    return current - last > value;
}


// jsdoc
function getLastElement(array) {
    return array[array.length - 1];
}


// jsdoc
function getLastIndex(array) {
    return array.length - 1;
}


// jsdoc
function getVerifiedValue(valueA, valueB) {
    return isGreater(valueA, valueB) ? valueA : valueB;
}


// jsdoc
function getSum(summandA, summandB) {
    return summandA + summandB;
}


// jsdoc
function getRandomNumber(max, dev) {
    return max - Math.round(Math.random() * dev);
}


// jsdoc
function formatInitial(word, method) {
    let initial = word[0];
    return word.replace(initial, initial[method]());
}