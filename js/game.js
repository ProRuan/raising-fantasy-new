let canvas;
let keyboard;
let mouseClick;    // to edit + to move

let startScreen;
let inPlay = false;

let counter = 0;
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

const SOURCE = new Source();

intervalIds = [];


function init() {
    setCanvas();
    setKeyboard();

    switchScreen();
}


function switchScreen() {
    setInterval(() => {
        if (inPlay == true) {
            startScreen = new LevelScreen(canvas, keyboard);
            inPlay = null;
        } else if (inPlay == false) {
            startScreen = new StartScreen(canvas, keyboard);
            inPlay = null;
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
function setStartScreen() {
    startScreen = new StartScreen(canvas, keyboard);
}


// jsdoc
function setLevelScreen() {
    levelScreen = new LevelScreen(canvas, keyboard);
}


let mainButtons = ['newGameButton', 'storyButton', 'cupButton', 'settingsButton'];
let mainButtonCounter = 0;
let volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];
let volumeButtonsId = 0;
let musicButtons = true;


function processKeydown(event) {
    if (startScreen.displayed) {
        console.log(event);
        let code = event.code;
        code = code.replace(code[0], code[0].toLowerCase());
        console.log(startScreen.keyboard[code].keydown);
        startScreen.keyboard[code].keydown = true;
        console.log(startScreen.keyboard[code].keydown);


        if (code == 'arrowDown' && mainButtonCounter < mainButtons.length - 1 && !startScreen.isStoryBgOpened() && !startScreen.isLeaderboardOpened()) {
            startScreen[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter++;
            startScreen[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }

        if (code == 'arrowUp' && 0 < mainButtonCounter && !startScreen.isStoryBgOpened() && !startScreen.isLeaderboardOpened()) {
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

            // double code!!!
            startScreen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = 0;
            musicButtons = true;
        }

        if ((code == 'backspace' || code == 'escape' || code == 'space' || code == 'keyX') && startScreen.storyButton.locked == true) {
            startScreen.storyButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && startScreen.cupButton.locked == true) {
            startScreen.cupButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && startScreen.settingsButton.locked == true) {
            startScreen.settingsButton.locked = false;
        }

        if (code == 'arrowLeft' && startScreen.settingsButton.isLocked()) {
            startScreen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 0 : 2;
            startScreen[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 0 && isLarger(0, music)) {
                music--;
            }
            if (volumeButtonsId == 2 && isLarger(0, sound)) {
                sound--;
            }
        }
        if (code == 'arrowRight' && startScreen.settingsButton.isLocked()) {
            startScreen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 1 : 3;
            startScreen[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 1 && isLarger(music, 9)) {
                music++;
            }
            if (volumeButtonsId == 3 && isLarger(sound, 9)) {
                sound++;
            }
        }
        if (code == 'arrowDown' && startScreen.settingsButton.isLocked()) {
            if (musicButtons == true) {
                musicButtons = false;
                startScreen[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 0) ? 2 : 3;
                startScreen[volumeButtons[volumeButtonsId]].selected = true;
            }
        }
        if (code == 'arrowUp' && startScreen.settingsButton.isLocked()) {
            if (musicButtons == false) {
                musicButtons = true;
                startScreen[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 2) ? 0 : 1;
                startScreen[volumeButtons[volumeButtonsId]].selected = true;
            }
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