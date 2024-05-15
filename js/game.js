let canvas;
let keyboard;
let mouseClick;    // to edit + to move

let world;
let inPlay = true;    // set to false!!!
let currentWorld = 'level';    // condition for mouse and keyboard!!!

let buttons = ['newGame', 'story', 'cup', 'settings', 'coin', 'x', 'lowMusic', 'highMusic', 'lowSound', 'highSound'];
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

let source = new Source();

intervalIds = [];


function init() {
    setCanvas();
    setKeyboard();

    world = new LevelWorld(canvas, keyboard);
    currentWorld = 'level';
    // switchWorld();    // necessary? --> menu control!
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


let mainButtons = ['newGameButton', 'storyButton', 'cupButton', 'settingsButton'];
let mainButtonCounter = 0;
let volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];
let volumeButtonsId = 0;
let musicButtons = true;


function processKeydown(event) {    // check doubleClick!!!

    // console.log(event);
    let code = getCode(event.code);
    setKey(code, 'keydown', true);
    setKey(code, 'timeStamp', getTime());
    verifyDoubleClick(code);


    if (this.currentWorld == 'start') {
        if (code == 'arrowDown' && mainButtonCounter < mainButtons.length - 1 && !world.isStoryBgOpened() && !world.isLeaderboardOpened()) {
            world[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter++;
            world[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }

        if (code == 'arrowUp' && 0 < mainButtonCounter && !world.isStoryBgOpened() && !world.isLeaderboardOpened()) {
            world[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter--;
            world[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }


        if (code == 'enter' && world.newGameButton.selected == true) {
            console.log('start new game ...');
            // world.newGameButton.locked = true;
        }
        if (code == 'enter' && world.storyButton.selected == true) {
            if (world.cupButton.locked == true) {
                world.cupButton.locked = false;
            }
            if (world.settingsButton.locked == true) {
                world.settingsButton.locked = false;
            }
            world.storyButton.locked = true;
        }
        if (code == 'enter' && world.cupButton.selected == true) {
            if (world.storyButton.locked == true) {
                world.storyButton.locked = false;
            }
            if (world.settingsButton.locked == true) {
                world.settingsButton.locked = false;
            }
            world.cupButton.locked = true;
        }
        if (code == 'enter' && world.settingsButton.selected == true) {
            if (world.storyButton.locked == true) {
                world.storyButton.locked = false;
            }
            if (world.cupButton.locked == true) {
                world.cupButton.locked = false;
            }
            world.settingsButton.locked = true;

            // double code!!!
            world[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = 0;
            musicButtons = true;
        }

        if ((code == 'backspace' || code == 'escape' || code == 'space' || code == 'keyX') && world.storyButton.locked == true) {
            world.storyButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && world.cupButton.locked == true) {
            world.cupButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && world.settingsButton.locked == true) {
            world.settingsButton.locked = false;
        }

        if (code == 'arrowLeft' && world.settingsButton.isLocked()) {
            world[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 0 : 2;
            world[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 0 && isLarger(0, music)) {
                music--;
            }
            if (volumeButtonsId == 2 && isLarger(0, sound)) {
                sound--;
            }
        }
        if (code == 'arrowRight' && world.settingsButton.isLocked()) {
            world[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 1 : 3;
            world[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 1 && isLarger(music, 9)) {
                music++;
            }
            if (volumeButtonsId == 3 && isLarger(sound, 9)) {
                sound++;
            }
        }
        if (code == 'arrowDown' && world.settingsButton.isLocked()) {
            if (musicButtons == true) {
                musicButtons = false;
                world[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 0) ? 2 : 3;
                world[volumeButtons[volumeButtonsId]].selected = true;
            }
        }
        if (code == 'arrowUp' && world.settingsButton.isLocked()) {
            if (musicButtons == false) {
                musicButtons = true;
                world[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 2) ? 0 : 1;
                world[volumeButtons[volumeButtonsId]].selected = true;
            }
        }
    }
}


function processKeyup(event) {
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


// jsdoc
function isMouseEvent(m, o) {
    if (m) {
        let mouse = getMouseXY(m);    // necessary???
        let object = getObjectXY(o);    // necessary???
        return isIncluded2D(mouse, object);
    }
}


// jsdoc (necessary???)
function getMouseXY(m) {
    return {
        'x': m.offsetX,
        'y': m.offsetY
    }
}


// jsdoc (necessary???)
function getObjectXY(o) {
    return {
        'xLeft': o.xLeft,
        'xRight': o.xRight,
        'yTop': o.yTop,
        'yBottom': o.yBottom
    };
}


// jsdoc
function isCollided(a, b) {
    return isCollidedX(a, b) && isCollidedY(a, b);
}


// jsdoc
function isCollidedX(a, b) {
    return isIncluded(a.xLeft, b.xLeft, a.xRight) || isIncluded(a.xLeft, b.xRight, a.xRight);
}


// jsdoc
function isCollidedY(a, b) {
    return isIncluded(a.yTop, b.yTop, a.yBottom) || isIncluded(a.yTop, b.yBottom, a.yBottom);
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