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
let fullScreenEnabled = false;


/**
 * Initializes the game.
 */
async function init() {
    updateStoreableItems();
    await includeHTML();
    setSource();
    setCanvas();
    setKeyboard();
    setStartWorld();
    setTouchZones();
}


/**
 * Updates the values of the storable items.
 */
function updateStoreableItems() {
    updateScore();
    updateVolume();
    storableItems.score = score;
    storableItems.volume = volume;
}


/**
 * Updates the score.
 */
function updateScore() {
    score.best = getDefaultScore();
    score.last = getDefaultScore();
    loadScore();
}


/**
 * Provides the default score.
 * @returns {object} - The default score.
 */
function getDefaultScore() {
    return { coins: 0, leaves: 0, time: 300000 };
}


/**
 * Loads the score.
 */
function loadScore() {
    load('score');
    if (storableItems.score) {
        score = storableItems.score;
    }
}


/**
 * Updates the volume.
 */
function updateVolume() {
    volume = { music: 5, sound: 5 };
    loadVolume();
}


/**
 * Loads the volume.
 */
function loadVolume() {
    load('volume');
    if (storableItems.volume) {
        volume = storableItems.volume;
    }
}


/**
 * Sets the source.
 */
function setSource() {
    source = new Source();
}


/**
 * Sets the canvas.
 */
function setCanvas() {
    canvas = document.getElementById('canvas');
    setCurrentSize();
}


/**
 * Sets the current size of the canvas.
 */
function setCurrentSize() {
    if (canvas) {
        currentWidth = canvas.offsetWidth;
        currentHeight = canvas.offsetHeight;
    }
}


/**
 * Sets the keyboard.
 */
function setKeyboard() {
    keyboard = new Keyboard();
}


/**
 * Sets the start world.
 */
function setStartWorld() {
    world = new StartWorld(canvas, keyboard);
    currentWorld = 'start';
    paused = false;
}


/**
 * Sets the level world.
 */
function setLevelWorld() {
    world = new LevelWorld(canvas, keyboard);
    currentWorld = 'level';
}


/**
 * Sets the pause.
 */
function setPause() {
    if (isMatch(currentWorld, 'level') && !isTrue(pauseDisabled)) {
        if (isKey('escape')) {
            exitLevel();
        } else if (isKey('keyP')) {
            pauseLevel();
        }
    }
}


/**
 * Exits the level.
 */
function exitLevel() {
    if (paused) {
        world.stopped = true;
        setStartWorld();
        world.interacted = true;
        world.setCurrentButton('newGameButton');
    }
}


/**
 * Pause the level.
 */
function pauseLevel() {
    setGamePaused();
    setPauseTime();
}


/**
 * Set game paused.
 */
function setGamePaused() {
    if (!paused) {
        paused = true;
        pauseGame(true);
    } else {
        paused = false;
        pauseGame(false);
    }
}


/**
 * Pauses the game.
 * @param {boolean} logical - A boolean value.
 */
function pauseGame(logical) {
    if (!isTrue(pauseDisabled)) {
        pauseHero(logical);
        pauseStateBars(logical);
        pauseLevelComponents(logical);
        world.pauseSound(logical);
    }
}


/**
 * Pauses the hero.
 * @param {boolean} logical - A boolean value.
 */
function pauseHero(logical) {
    let hero = world.hero;
    pauseLevelObject(hero, 'bomb', logical);
    pauseLevelObject(hero, 'interval', logical);
}


/**
 * Pauses a level object.
 * @param {object} object - The object to pause.
 * @param {string} key - The key of the subobject.
 * @param {boolean} logical - A boolean value.
 */
function pauseLevelObject(object, key, logical) {
    if (isMatch(key, 'interval') && object[key]) {
        object.stop(logical);
    } else if (object[key]) {
        object[key].stop(logical);
    }
}


/**
 * Pauses the state bars.
 * @param {boolean} logical - A boolean value.
 */
function pauseStateBars(logical) {
    let keys = ['hpBar', 'energyBar', 'staminaBar'];
    keys.forEach((key) => {
        let stateBar = world[key];
        pauseLevelObject(stateBar, 'interval', logical);
    });
}


/**
 * Pauses the level components.
 * @param {boolean} logical - A boolean value.
 */
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


/**
 * Sets the time of the pause.
 */
function setPauseTime() {
    if (isTrue(paused)) {
        setPauseStart();
    } else {
        setPauseEnd();
        applyPauseOffset();
    }
}


/**
 * Sets the start time of the pause.
 */
function setPauseStart() {
    pauseStart = getTime();
    pauseLevelMusic('pause');
}


/**
 * Pauses the level music.
 * @param {string} method - The method to apply.
 */
function pauseLevelMusic(method) {
    world.hero.music[method]();
    if (world.endboss.triggered) {
        world.endboss.music[method]();
    }
}


/**
 * Sets the end time of the pause.
 */
function setPauseEnd() {
    pauseEnd = getTime();
    pauseTime += getSum(pauseEnd, -pauseStart);
    pauseLevelMusic('play');
}


/**
 * Applies the pause offset.
 */
function applyPauseOffset() {
    addEndbossPauseOffset();
    addEnemyPauseOffset();
    addHeroPauseOffset();
    addMagicPauseOffset();
}


/**
 * Adds the pause offset of the endboss.
 */
function addEndbossPauseOffset() {
    addPauseOffset(world, 'endboss', 'calmTime');
    addPauseOffset(world, 'endboss', 'nextCast');
    addPauseOffset(world, 'endboss', 'chapterTime');
    addPauseOffset(world, 'endboss', 'selectionTime');
}


/**
 * Adds the pause offset.
 * @param {object} variable - The providing object.
 * @param {string} key - The key of the object to update.
 * @param {string} subkey - The key of the subobject to update.
 */
function addPauseOffset(variable, key, subkey) {
    if (!subkey && variable[key]) {
        variable[key] += getSum(pauseEnd, -pauseStart);
    } else if (subkey && variable[key][subkey]) {
        variable[key][subkey] += getSum(pauseEnd, -pauseStart);
    }
}


/**
 * Adds the pause offset of the enemies.
 */
function addEnemyPauseOffset() {
    world.enemies.forEach((enemy) => {
        addPauseOffset(enemy, 'timeToGo');
        addPauseOffset(enemy, 'hitTime');
        addInstancePauseOffset(enemy, Dino, 'pursuitStop');
        addInstancePauseOffset(enemy, Ent, 'lastTurn');
        addInstancePauseOffset(enemy, Spider, 'nextThrow');
    });
}


/**
 * Adds the pause offset of an enemy.
 * @param {Enemy} enemy - The enemy object.
 * @param {instance} object - The instance of the enemy.
 * @param {string} key - The key of the value to update.
 */
function addInstancePauseOffset(enemy, object, key) {
    if (enemy instanceof object) {
        enemy[key] += getSum(pauseEnd, -pauseStart);
        addWebPauseOffset(enemy);
    }
}


/**
 * Adds the pause offset to a web.
 * @param {Enemy} enemy - The enemy object.
 */
function addWebPauseOffset(enemy) {
    if (enemy instanceof Spider && enemy.web) {
        addPauseOffset(enemy, 'web', 'throwResetTime');
        addPauseOffset(enemy, 'web', 'throwDoneTime');
    }
}


/**
 * Adds the pause offset of the hero.
 */
function addHeroPauseOffset() {
    addPauseOffset(world, 'hero', 'jumpTime');
    addPauseOffset(world, 'hero', 'lastIdle');
}


/**
 * Adds the pause offset of the magic.
 */
function addMagicPauseOffset() {
    let magic = world.endboss.magic;
    if (magic && magic instanceof Lightning) {
        addPauseOffset(magic, 'targetingStop');
        addPauseOffset(magic, 'chargingStop');
    }
}


/**
 * Enables the full screen.
 * @param {boolean} logical - A boolean value.
 */
function enableFullscreen(logical) {
    let nativeFactor = NATIVE_WIDTH / NATIVE_HEIGHT;
    let factor = body.offsetWidth / body.offsetHeight;
    updateCanvasSize(logical, nativeFactor, factor);
}


/**
 * Updates the canvas size.
 * @param {boolean} logical - A boolean value.
 * @param {number} nativeFactor - The native aspect ratio of the canvas.
 * @param {number} factor - The apsect ratio of the body.
 */
function updateCanvasSize(logical, nativeFactor, factor) {
    if (isTrue(logical) && isGreater(nativeFactor, factor)) {
        updateCanvas('unset', '100vh');
    } else if (isTrue(logical) && isGreater(factor, nativeFactor)) {
        updateCanvas('100%', 'unset');
    } else if (isTrue(logical) && isMatch(factor, nativeFactor)) {
        updateCanvas('100%', '100vh');
    } else {
        updateCanvas('unset', 'unset');
    }
}


/**
 * Updates the size values of the canvas.
 * @param {number} width - The width to set.
 * @param {number} height - The height to set.
 */
function updateCanvas(width, height) {
    setCanvasSize('width', width);
    setCanvasSize('height', height);
}


/**
 * Sets the style value of the canvas.
 * @param {string} key - The key of the style value.
 * @param {string} value - The style value to set.
 */
function setCanvasSize(key, value) {
    canvas.style[key] = value;
}


window.addEventListener('resize', (event) => {
    if (event && !isTrue(fullScreenEnabled)) {
        setCurrentSize();
    } else if (event && isTrue(fullScreenEnabled)) {
        enableFullscreen(true);
    }
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




// sort this js file ...
// out folger ...
// Remove console.logs ...
// final check on browser ...


// remove comments of the level world ...
// getElement function ... !


// fix exit button (disturbs the touch) ... !!!
// fix header, main and footer (including rotation hint) ...


// set canvas, keyboard, source ...

// init() ...
// global functions ...


// move to key.js!!!
// pause also for mouse and touch!!!


// Review instanceof methods (variable class name) ... !!!
// Review music pause and play conflict ...