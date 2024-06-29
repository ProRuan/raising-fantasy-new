let targeted = false;


executeEvent('mousemove', (event) => executeMouseMove(event));
executeEvent('mousedown', (event) => executeMouseDown(event));
executeEvent('mouseup', (event) => executeMouseUp(event));


// jsdoc
function executeEvent(key, subfunction) {
    return document.addEventListener(key, subfunction);
}


// jsdoc
function executeMouseMove(event) {
    targeted = false;
    if (isMatch(currentWorld, 'start')) {
        applyHover(event);
        setCursorInitial();
    }
}


// jsdoc
function applyHover(event) {
    if (event) {
        let buttons = getButtonRegister();
        buttons.forEach((button) => {
            hover(event, button);
        });
    }
}


// jsdoc
function getButtonRegister() {
    return [
        'xButton', 'lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton',
        'coinButton', 'cupButton', 'settingsButton', 'questButton', 'newGameButton'
    ];
}


// jsdoc
function hover(event, key) {
    if (isMouseEvent(event, world[key])) {
        setGlobalTargeted(key);
    } else {
        setButtonTargeted(key);
    }
}


// jsdoc
function isMouseEvent(mouse, object) {
    if (mouse && object) {
        mouse = getMouseXY(mouse);
        return isIncluded2D(mouse, object);
    }
}


// jsdoc
function getMouseXY(mouse) {
    let offsetX = getMouseCoord(mouse.offsetX, 'offsetWidth', NATIVE_WIDTH);
    let offsetY = getMouseCoord(mouse.offsetY, 'offsetHeight', NATIVE_HEIGHT);
    return { x: offsetX, y: offsetY };
}


// jsdoc
function getMouseCoord(mouse, key, size) {
    return mouse / canvas[key] * size;
}


// jsdoc
function setGlobalTargeted(key) {
    world[key].targeted = true;
    if (!isTrue(targeted)) {
        targeted = true;
    }
}


// jsdoc
function setButtonTargeted(key) {
    world[key].targeted = false;
}


// jsdoc
function setCursorInitial() {
    if (!isTrue(targeted)) {
        setCursor('initial');
    }
}


// jsdoc
function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Please sort the subsequent functions + rename!!!
function executeMouseDown(event) {
    if (event && currentWorld == 'start') {
        if (!world.interacted) {
            interactFirst(event);
        } else {
            world.currentButton.selected = false;

            closeLeaderboard(event);
            setVolume(event, 'lowMusicButton');
            setVolume(event, 'highMusicButton');
            setVolume(event, 'lowSoundButton');
            setVolume(event, 'highSoundButton');
            openLeaderboard(event, 'cupButton');
            openLeaderboard(event, 'settingsButton');

            closeQuestRoll(event);
            openQuestRoll(event, 'questButton');
            startNewGame(event);
        }
    }
}


// jsdoc
function interactFirst(event) {
    if (event) {
        world.interacted = true;
    }
}


function closeLeaderboard(event) {
    if (isMouseEvent(event, world.xButton) && world.xButton.reachable) {
        world.xButton.locked = true;
    }
}


function setVolume(event, key) {
    if (isMouseEvent(event, world[key]) && world[key].reachable) {
        world[key].locked = true;
    }
}


function openLeaderboard(event, key) {
    if (isNotLeaderBoard(event, key)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, true)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, false)) {
        world[key].locked = true;
    }
}


// jsdoc
function isNotLeaderBoard(event, key) {
    return !isMouseEvent(event, world[key]) && !isMouseEvent(event, world.leaderboard);
}


// jsdoc
function isButtonLocked(event, key, logical) {
    if (logical) {
        return isMouseEvent(event, world[key]) && world[key].isLocked();
    } else {
        return isMouseEvent(event, world[key]) && !world[key].isLocked();
    }
}


function closeQuestRoll(event) {    // double code?
    if (isMouseEvent(event, world.coinButton) && world.coinButton.reachable) {
        world.coinButton.locked = true;
    }
}


function openQuestRoll(event, key) {    // double code?
    if (isNotQuestRoll(event, key)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, false) && !world.leaderboard.isOpened()) {
        world[key].locked = true;
    }
}


function isNotQuestRoll(event, key) {    // double code?
    return !isMouseEvent(event, world[key]) && !isMouseEvent(event, world.questRoll);
}


function startNewGame(event) {
    if (isMouseEvent(event, world.newGameButton) && !isBoardOpened()) {
        world.newGameButton.locked = true;
    }
}


function isBoardOpened() {
    return world.leaderboard.isOpened() || world.questRoll.isOpened();
}


function executeMouseUp() {
    unlockMainButtons();
}


function unlockMainButtons() {
    if (currentWorld == 'start') {
        if (isTrue(world.interacted) && !world.mainRevealed) {
            world.mainRevealed = true;
            world.newGameButton.reachable = true;
            world.questButton.reachable = true;
            world.cupButton.reachable = true;
            world.settingsButton.reachable = true;
        }
    }
}