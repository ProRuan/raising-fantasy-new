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
function loadScore() {
    load('score');
    if (storableItems.score) {
        score = storableItems.score;
    }
}


// jsdoc
function updateVolume() {
    volume = { music: 5, sound: 5 };
    loadVolume();
}


// jsdoc
function loadVolume() {
    load('volume');
    if (storableItems.volume) {
        volume = storableItems.volume;
    }
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
// pause also for mouse and touch!!!
// exitLevel on another place? ...




// jsdoc
function setPause() {
    if (isMatch(currentWorld, 'level') && !isTrue(pauseDisabled)) {
        if (isKey('escape') && paused) {
            exitLevel();
        } else if (isKey('keyP')) {
            pauseLevel();
        }
    }
}


// jsdoc
function exitLevel() {
    world.stopped = true;
    setStartWorld();
    world.interacted = true;
    world.setCurrentButton('newGameButton');
}


// jsdoc
function pauseLevel() {
    setGamePaused();
    setPauseTime();
}


// jsdoc
function setGamePaused() {
    if (!paused) {
        paused = true;
        pauseGame(true);
    } else {
        paused = false;
        pauseGame(false);
    }
}


// jsdoc
function setPauseTime() {
    if (isTrue(paused)) {
        setPauseStart();
    } else {
        setPauseEnd();
        applyPauseOffset();
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


// jsdoc
function applyPauseOffset() {
    addEndbossPauseOffset();
    addEnemyPauseOffset();
    addHeroPauseOffset();
    addMagicPauseOffset();
}


// jsdoc
function addEndbossPauseOffset() {
    addPauseOffset(world, 'endboss', 'calmTime');
    addPauseOffset(world, 'endboss', 'nextCast');
    addPauseOffset(world, 'endboss', 'chapterTime');
    addPauseOffset(world, 'endboss', 'selectionTime');
}


// jsdoc
function addPauseOffset(variable, key, subkey) {
    if (!subkey && variable[key]) {
        variable[key] += getSum(pauseEnd, -pauseStart);
    } else if (subkey && variable[key][subkey]) {
        variable[key][subkey] += getSum(pauseEnd, -pauseStart);
    }
}


// jsdoc
function addEnemyPauseOffset() {
    world.enemies.forEach((enemy) => {
        addPauseOffset(enemy, 'timeToGo');
        addPauseOffset(enemy, 'hitTime');
        addInstancePauseOffset(enemy, Dino, 'pursuitStop');
        addInstancePauseOffset(enemy, Ent, 'lastTurn');
        addInstancePauseOffset(enemy, Spider, 'nextThrow');
    });
}


// jsdoc
function addInstancePauseOffset(enemy, object, key) {
    if (enemy instanceof object) {
        enemy[key] += getSum(pauseEnd, -pauseStart);
        addWebPauseOffset(enemy);
    }
}


// jsdoc
function addWebPauseOffset(enemy) {
    if (enemy instanceof Spider && enemy.web) {
        addPauseOffset(enemy, 'web', 'throwResetTime');
        addPauseOffset(enemy, 'web', 'throwDoneTime');
    }
}


// jsdoc
function addHeroPauseOffset() {
    addPauseOffset(world, 'hero', 'jumpTime');
    addPauseOffset(world, 'hero', 'lastIdle');
}


// jsdoc
function addMagicPauseOffset() {
    let magic = world.endboss.magic;
    if (magic && magic instanceof Lightning) {
        addPauseOffset(magic, 'targetingStop');
        addPauseOffset(magic, 'chargingStop');
    }
}



// Make a class MouseEvent!!!


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