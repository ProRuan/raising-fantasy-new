let canvas;
let keyboard;
let mouseClick;    // to edit + to move

let screen;
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
            screen = new LevelScreen(canvas, keyboard);
            inPlay = null;
        } else if (inPlay == false) {
            screen = new StartScreen(canvas, keyboard);
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
    screen = new StartScreen(canvas, keyboard);
}


// jsdoc
function setLevelScreen() {
    screen = new LevelScreen(canvas, keyboard);
}


let mainButtons = ['newGameButton', 'storyButton', 'cupButton', 'settingsButton'];
let mainButtonCounter = 0;
let volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];
let volumeButtonsId = 0;
let musicButtons = true;


function processKeydown(event) {
    if (screen.displayed) {
        console.log(event);
        let code = event.code;
        code = code.replace(code[0], code[0].toLowerCase());
        console.log(screen.keyboard[code].keydown);
        screen.keyboard[code].keydown = true;
        console.log(screen.keyboard[code].keydown);


        if (code == 'arrowDown' && mainButtonCounter < mainButtons.length - 1 && !screen.isStoryBgOpened() && !screen.isLeaderboardOpened()) {
            screen[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter++;
            screen[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }

        if (code == 'arrowUp' && 0 < mainButtonCounter && !screen.isStoryBgOpened() && !screen.isLeaderboardOpened()) {
            screen[mainButtons[mainButtonCounter]].selected = false;
            mainButtonCounter--;
            screen[mainButtons[mainButtonCounter]].selected = true;
            console.log(mainButtonCounter, mainButtons[mainButtonCounter]);
        }


        if (code == 'enter' && screen.newGameButton.selected == true) {
            console.log('start new game ...');
            // screen.newGameButton.locked = true;
        }
        if (code == 'enter' && screen.storyButton.selected == true) {
            if (screen.cupButton.locked == true) {
                screen.cupButton.locked = false;
            }
            if (screen.settingsButton.locked == true) {
                screen.settingsButton.locked = false;
            }
            screen.storyButton.locked = true;
        }
        if (code == 'enter' && screen.cupButton.selected == true) {
            if (screen.storyButton.locked == true) {
                screen.storyButton.locked = false;
            }
            if (screen.settingsButton.locked == true) {
                screen.settingsButton.locked = false;
            }
            screen.cupButton.locked = true;
        }
        if (code == 'enter' && screen.settingsButton.selected == true) {
            if (screen.storyButton.locked == true) {
                screen.storyButton.locked = false;
            }
            if (screen.cupButton.locked == true) {
                screen.cupButton.locked = false;
            }
            screen.settingsButton.locked = true;

            // double code!!!
            screen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = 0;
            musicButtons = true;
        }

        if ((code == 'backspace' || code == 'escape' || code == 'space' || code == 'keyX') && screen.storyButton.locked == true) {
            screen.storyButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && screen.cupButton.locked == true) {
            screen.cupButton.locked = false;
        }
        if ((code == 'backspace' || code == 'escape' || code == 'keyX') && screen.settingsButton.locked == true) {
            screen.settingsButton.locked = false;
        }

        if (code == 'arrowLeft' && screen.settingsButton.isLocked()) {
            screen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 0 : 2;
            screen[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 0 && isLarger(0, music)) {
                music--;
            }
            if (volumeButtonsId == 2 && isLarger(0, sound)) {
                sound--;
            }
        }
        if (code == 'arrowRight' && screen.settingsButton.isLocked()) {
            screen[volumeButtons[volumeButtonsId]].selected = false;
            volumeButtonsId = (musicButtons) ? 1 : 3;
            screen[volumeButtons[volumeButtonsId]].selected = true;
            if (volumeButtonsId == 1 && isLarger(music, 9)) {
                music++;
            }
            if (volumeButtonsId == 3 && isLarger(sound, 9)) {
                sound++;
            }
        }
        if (code == 'arrowDown' && screen.settingsButton.isLocked()) {
            if (musicButtons == true) {
                musicButtons = false;
                screen[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 0) ? 2 : 3;
                screen[volumeButtons[volumeButtonsId]].selected = true;
            }
        }
        if (code == 'arrowUp' && screen.settingsButton.isLocked()) {
            if (musicButtons == false) {
                musicButtons = true;
                screen[volumeButtons[volumeButtonsId]].selected = false;
                volumeButtonsId = (volumeButtonsId == 2) ? 0 : 1;
                screen[volumeButtons[volumeButtonsId]].selected = true;
            }
        }

    }
}


function processKeyup(event) {
    if (screen.displayed) {
        console.log(event);
        let code = event.code;
        code = code.replace(code[0], code[0].toLowerCase());
        console.log(screen.keyboard[code].keydown);
        screen.keyboard[code].keydown = false;
        console.log(screen.keyboard[code].keydown);

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