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




// set canvas, keyboard, source ...

// init() ...
// global functions ...


// move to key.js!!!
// pause also for mouse and touch!!!


// Review instanceof methods (variable class name) ... !!!
// Review music pause and play conflict ...




function init() {
    updateStoreableItems();

    setSource();
    setCanvas();

    // if (canvas.offsetWidth != screen.width && canvas.offsetHeight != screen.height) {    // depends on final html!
    //     enableFullscreen(true);
    // }

    setKeyboard();
    setStartWorld();
    setTouchZones();
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


// jsdoc
function setTouchZones() {
    setTouchZoneSize();
    setPauseZoneSize();
}


// jsdoc
function setTouchZoneSize() {
    touchZoneWidth = getZoneSize('offsetWidth', 3, 1);
    touchZoneHeight = getZoneSize('offsetHeight', 3, 2);
}


// jsdoc
function getZoneSize(key, a, b) {
    return body[key] / a * b
}


// jsdoc
function setPauseZoneSize() {
    pauseZoneWidth = getZoneSize('offsetWidth', 16, 3);
    pauseZoneHeight = getZoneSize('offsetHeight', 9, 2);
}


// jsdoc
function setPause() {
    if (isMatch(currentWorld, 'level') && !isTrue(pauseDisabled)) {
        if (isKey('escape')) {
            exitLevel();
        } else if (isKey('keyP')) {
            pauseLevel();
        }
    }
}


// jsdoc
function exitLevel() {
    if (paused) {
        world.stopped = true;
        setStartWorld();
        world.interacted = true;
        world.setCurrentButton('newGameButton');
    }
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
function pauseGame(logical) {
    if (!isTrue(pauseDisabled)) {
        pauseHero(logical);
        pauseStateBars(logical);
        pauseLevelComponents(logical);
        world.pauseSound(logical);
    }
}


// jsdoc
function pauseHero(logical) {
    let hero = world.hero;
    pauseLevelObject(hero, 'bomb', logical);
    pauseLevelObject(hero, 'interval', logical);
}


// jsdoc
function pauseLevelObject(object, key, logical) {
    if (isMatch(key, 'interval') && object[key]) {
        object.stop(logical);
    } else if (object[key]) {
        object[key].stop(logical);
    }
}


// jsdoc
function pauseStateBars(logical) {
    let keys = ['hpBar', 'energyBar', 'staminaBar'];
    keys.forEach((key) => {
        let stateBar = world[key];
        pauseLevelObject(stateBar, 'interval', logical);
    });
}


// jsdoc
function pauseLevelComponents(logical) {
    for (const [key] of Object.entries(world.level)) {
        let objectGroup = world.level[key];
        objectGroup.forEach((object) => {
            pauseLevelObject(object, 'magic', logical);
            pauseLevelObject(object, 'web', logical);
            pauseLevelObject(object, 'interval', logical);
        });
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




function enableFullscreen(logical) {
    let nativeFactor = 16 / 9;
    let factor = body.offsetWidth / body.offsetHeight;
    // ipad factor, e.g. 4!!! (offset / screen) ...

    if (isTrue(logical) && isGreater(nativeFactor, factor)) {
        updateCanvas(true, 'unset', '100vh');
    } else if (isTrue(logical) && isGreater(factor, nativeFactor)) {
        updateCanvas(true, '100%', 'unset');
    } else if (isTrue(logical) && isMatch(factor, nativeFactor)) {
        updateCanvas(true, '100%', '100vh');
    } else {
        updateCanvas(false, `${currentWidth}px`, `${currentHeight}px`);
    }
}


function updateCanvas(logical, width, height) {
    setCurrentSize(logical);
    setCanvasSize('width', width);
    setCanvasSize('height', height);
}



// jsdoc
function setCurrentSize(logical) {
    if (logical) {
        currentWidth = canvas.offsetWidth;
        currentHeight = canvas.offsetHeight;
    }
}


// jsdoc
function setCanvasSize(key, value) {
    canvas.style[key] = value;
}


// window.addEventListener('resize', (event) => {
//     if (event) {
//         enableFullscreen(true);
//     }
// });


// window.addEventListener("orientationchange", (event) => {
//     let currentOrientation = event.target.screen.orientation.angle;

//     if (isMatch(currentOrientation, 90)) {
//         if (isMatch(currentWorld, 'start')) {    // pause music of start world at least
//             world.music.play();
//         }
//         if (isMatch(currentWorld, 'level') && !isTrue(paused)) {    // pause music of start world at least
//             pauseGame(false);
//         }
//         // console.log('landscape: ', currentOrientation);
//     } else if (isMatch(currentOrientation, 0)) {
//         if (isMatch(currentWorld, 'start')) {    // pause music of start world at least
//             world.music.pause();
//         }
//         if (isMatch(currentWorld, 'level') && !isTrue(paused)) {    // pause music of start world at least
//             pauseGame(true);
//         }
//         // console.log('protrait: ', currentOrientation);
//     }
// });