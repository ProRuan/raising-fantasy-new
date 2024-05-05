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


let mainButtons = ['newGameButton', 'storyButton', 'cupButton', 'settingsButton'];
let mainButtonCounter = 0;


function processKeydown(event) {
    if (startScreen.displayed) {
        console.log(event);
        let code = event.code;
        code = code.replace(code[0], code[0].toLowerCase());
        console.log(startScreen.keyboard[code].keydown);
        startScreen.keyboard[code].keydown = true;
        console.log(startScreen.keyboard[code].keydown);

        if (code == 'arrowDown' && mainButtonCounter < mainButtons.length - 1) {
            startScreen[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter++;
            startScreen[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }

        if (code == 'arrowUp' && 0 < mainButtonCounter) {
            startScreen[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter--;
            startScreen[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }


        if (code == 'enter' && startScreen.newGameButton.selected == true) {
            console.log('start new game ...');
            // startScreen.newGameButton.locked = true;
        }
        if (code == 'enter' && startScreen.storyButton.selected == true) {
            if (startScreen.cupButton.locked == true) {
                startScreen.cupButton.locked = false;
            }
            if (startScreen.settingsButton.locked == true) {
                startScreen.settingsButton.locked = false;
            }
            startScreen.storyButton.locked = true;
        }
        if (code == 'enter' && startScreen.cupButton.selected == true) {
            if (startScreen.storyButton.locked == true) {
                startScreen.storyButton.locked = false;
            }
            if (startScreen.settingsButton.locked == true) {
                startScreen.settingsButton.locked = false;
            }
            startScreen.cupButton.locked = true;
        }
        if (code == 'enter' && startScreen.settingsButton.selected == true) {
            if (startScreen.storyButton.locked == true) {
                startScreen.storyButton.locked = false;
            }
            if (startScreen.cupButton.locked == true) {
                startScreen.cupButton.locked = false;
            }
            startScreen.settingsButton.locked = true;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && startScreen.storyButton.locked == true) {
            startScreen.storyButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && startScreen.cupButton.locked == true) {
            startScreen.cupButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && startScreen.settingsButton.locked == true) {
            startScreen.settingsButton.locked = false;
        }

    }
}


function processKeyup(event) {
    if (startScreen.displayed) {
        console.log(event);
        let code = event.code;
        code = code.replace(code[0], code[0].toLowerCase());
        console.log(startScreen.keyboard[code].keydown);
        startScreen.keyboard[code].keydown = false;
        console.log(startScreen.keyboard[code].keydown);

    }
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