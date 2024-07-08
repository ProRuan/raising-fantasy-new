let canvas;
let currentWidth;
let currentHeight;
let keyboard;
let world;
let currentWorld = 'level';
let paused;
let pauseDisabled = false;
let forcedBreak = false;
let pauseStart = 0;
let pauseEnd = 0;
let pauseTime = 0;
let storableItems = {};
let tempScore;
let score = {};
let volume = {};
let source;


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


window.addEventListener("orientationchange", (event) => {
    let currentOrientation = getCurrentOrientation(event);
    if (isMatch(currentOrientation, 90)) {
        switchStartMusic('play');
        pauseOnRotation(forcedBreak, false);
    } else if (isMatch(currentOrientation, 0)) {
        switchStartMusic('pause');
        pauseOnRotation(!paused, true);
    }
});


/**
 * Provides the current orientation.
 * @param {event} event - The event of the orientation change.
 * @returns {string} - The current orientation.
 */
function getCurrentOrientation(event) {
    return event.target.screen.orientation.angle;
}


/**
 * Switches the start music.
 * @param {string} method - The method to apply.
 */
function switchStartMusic(method) {
    if (isMatch(currentWorld, 'start')) {
        world.music[method]();
    }
}


/**
 * Pauses the game on rotation.
 * @param {boolean} condition - The pause condition.
 * @param {boolean} logical - A boolean value.
 */
function pauseOnRotation(condition, logical) {
    if (isMatch(currentWorld, 'level') && condition) {
        forcedBreak = logical;
        pauseLevel();
    }
}