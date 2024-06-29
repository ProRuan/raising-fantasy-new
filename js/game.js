let canvas;
let currentWidth;
let currentHeight;
let keyboard;
let world;
let currentWorld = 'level';
let paused;
let pauseDisabled = false;
let pauseStart = 0;
let pauseEnd = 0;
let pauseTime = 0;
let storableItems = {};
let tempScore;
let score = {};
let volume = {};
let source;


function init() {
    updateStoreableItems();

    setSource();
    setCanvas();

    if (canvas.offsetWidth != screen.width && canvas.offsetHeight != screen.height) {    // depends on final html!
        enableFullscreen(true);
    }

    setKeyboard();
    setStartWorld();
}


// jsdoc
function updateStoreableItems() {
    updateScore();
    updateVolume();
    storableItems.score = score;
    storableItems.volume = volume;
}


// jsdoc
function updateScore() {
    score.best = getDefaultScore();
    score.last = getDefaultScore();
    loadScore();
}


// jsdoc
function getDefaultScore() {
    return { coins: 0, leaves: 0, time: 300000 };
}


// jsdoc
function updateVolume() {
    volume = { music: 5, sound: 5 };
    loadVolume();
}


// jsdoc
function setSource() {
    source = new Source();
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
    currentWorld = 'start';
    paused = false;
}


// jsdoc
function setLevelWorld() {
    world = new LevelWorld(canvas, keyboard);
    currentWorld = 'level';
}




// move to key.js!!!

function processKeydown(event) {    // check doubleClick!!!
    if (!world.interacted) {
        interactFirst(event);
    } else {
        selectCurrentButton();
        setKeyProperties(event);
        closeBoard();

        if (isMatch(currentWorld, 'level') && !isTrue(pauseDisabled)) {

            exitLevel();

            if (isKey('keyP')) {    // or touch in pause zone!!!
                (!paused) ? pauseGame(true) : pauseGame(false);
                paused = (!paused) ? true : false;
                if (isTrue(paused)) {
                    setPauseStart();
                } else {
                    setPauseEnd();


                    if (world.endboss.magic && world.endboss.magic instanceof Lightning) {
                        let magic = world.endboss.magic;
                        // console.log(magic.targetingStop, magic.chargingStop);
                        magic.targetingStop = magic.targetingStop + getSum(pauseEnd, -pauseStart);
                        magic.chargingStop = magic.chargingStop + getSum(pauseEnd, -pauseStart);
                        // console.log(magic.targetingStop, magic.chargingStop);
                    }
                    if (world.endboss.calmTime) {
                        world.endboss.calmTime += getSum(pauseEnd, -pauseStart);
                    }
                    if (world.endboss.nextCast) {
                        world.endboss.nextCast += getSum(pauseEnd, -pauseStart);
                    }
                    if (world.endboss.chapterTime) {
                        world.endboss.chapterTime += getSum(pauseEnd, -pauseStart);
                    }
                    if (world.endboss.selectionTime) {
                        world.endboss.selectionTime += getSum(pauseEnd, -pauseStart);
                    }
                    world.enemies.forEach((enemy) => {
                        if (enemy.timeToGo) {
                            enemy.timeToGo += getSum(pauseEnd, -pauseStart);
                        }
                        if (enemy.hitTime) {
                            enemy.hitTime += getSum(pauseEnd, -pauseStart);
                        }
                    });
                    world.enemies.forEach((enemy) => {
                        if (enemy instanceof Dino) {
                            enemy.pursuitStop += getSum(pauseEnd, -pauseStart);
                        }
                        if (enemy instanceof Ent) {
                            enemy.lastTurn += getSum(pauseEnd, -pauseStart);
                        }
                        if (enemy instanceof Spider) {
                            enemy.nextThrow += getSum(pauseEnd, -pauseStart);
                        }
                        if (enemy instanceof Spider && enemy.web) {
                            if (enemy.web.throwResetTime) {
                                enemy.web.throwResetTime += getSum(pauseEnd, -pauseStart);
                            }
                            if (enemy.web.throwDoneTime) {
                                enemy.web.throwDoneTime += getSum(pauseEnd, -pauseStart);
                            }
                        }
                    });
                    if (world.hero.jumpTime) {
                        world.hero.jumpTime += getSum(pauseEnd, -pauseStart);
                    }
                    if (world.hero.lastIdle) {
                        world.hero.lastIdle += getSum(pauseEnd, -pauseStart);
                    }
                }
            }
        }
    }

}


// jsdoc
function selectCurrentButton() {
    if (isMatch(currentWorld, 'start')) {
        world.currentButton.selected = true;
    }
}


// jsdoc
function closeBoard() {
    if (isMatch(currentWorld, 'start')) {
        let keys = ['backspace', 'space', 'keyX'];
        keys.forEach((key) => {
            closeWithKey(key, 'leaderboard', 'xButton');
            closeWithKey(key, 'questRoll', 'coinButton');
        })
    }
}


// jsdoc
function closeWithKey(key, dialog, button) {
    if (isKey(key) && world[dialog].isOpened()) {
        world[button].locked = true;
    }
}


// jsdoc
function exitLevel() {
    if (isKey('escape') && paused) {
        world.stopped = true;
        setStartWorld();
        world.interacted = true;
        world.setCurrentButton('newGameButton');
    }
}


// jsdoc
function setPauseStart() {
    pauseStart = getTime();
    pauseLevelMusic('pause');
}


// jsdoc
function pauseLevelMusic(method) {
    world.hero.music[method]();
    if (world.endboss.triggered) {
        world.endboss.music[method]();
    }
}


// jsdoc
function setPauseEnd() {
    pauseEnd = getTime();
    pauseTime += getSum(pauseEnd, -pauseStart);
    pauseLevelMusic('play');
}


function processKeyup(event) {
    buttonSelected = false;
    keyboard.enter.locked = false;

    unlockMainButtons();

    setKeyProperties(event);
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


function getMouseXY(m) {
    let offsetX = m.offsetX / canvas.offsetWidth * NATIVE_WIDTH;
    let offsetY = m.offsetY / canvas.offsetHeight * NATIVE_HEIGHT;
    return { x: offsetX, y: offsetY };

    // return { x: m.offsetX, y: m.offsetY };
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


function enableFullscreen(logical) {
    let orientation = screen.orientation.type;

    let nativeFactor = 16 / 9;
    let factor = body.offsetWidth / body.offsetHeight;
    // console.log(factor, isGreater(nativeFactor, factor));

    if (isTrue(logical) && isGreater(nativeFactor, factor)) {
        currentWidth = canvas.offsetWidth;
        currentHeight = canvas.offsetHeight;
        document.getElementById('canvas').style.width = 'unset';
        document.getElementById('canvas').style.height = '100vh';
    } else if (isTrue(logical) && isGreater(factor, nativeFactor)) {
        currentWidth = canvas.offsetWidth;
        currentHeight = canvas.offsetHeight;
        document.getElementById('canvas').style.width = '100%';
        document.getElementById('canvas').style.height = 'unset';
    } else if (isTrue(logical) && isMatch(factor, nativeFactor)) {
        currentWidth = canvas.offsetWidth;
        currentHeight = canvas.offsetHeight;
        document.getElementById('canvas').style.width = `100%`;
        document.getElementById('canvas').style.height = `100vh`;
    } else {
        document.getElementById('canvas').style.width = `${currentWidth}px`;
        document.getElementById('canvas').style.height = `${currentHeight}px`;
    }


    // if (isTrue(logical) && window.matchMedia("(orientation: landscape)").matches) {
    //     currentWidth = canvas.offsetWidth;
    //     document.getElementById('canvas').style.width = '100%';
    // } else {
    //     document.getElementById('canvas').style.width = `${currentWidth}px`;
    // }


    // set logical
    // save current width
    // calculate width or height
}


window.addEventListener('resize', (event) => {
    enableFullscreen(true);
});


window.addEventListener("orientationchange", (event) => {
    let currentOrientation = event.target.screen.orientation.angle;

    if (isMatch(currentOrientation, 90)) {
        if (isMatch(currentWorld, 'start')) {    // pause music of start world at least
            world.music.play();
        }
        if (isMatch(currentWorld, 'level') && !isTrue(paused)) {    // pause music of start world at least
            pauseGame(false);
        }
        // console.log('landscape: ', currentOrientation);
    } else if (isMatch(currentOrientation, 0)) {
        if (isMatch(currentWorld, 'start')) {    // pause music of start world at least
            world.music.pause();
        }
        if (isMatch(currentWorld, 'level') && !isTrue(paused)) {    // pause music of start world at least
            pauseGame(true);
        }
        // console.log('protrait: ', currentOrientation);
    }
});