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
        setWorldButton(key, 'targeted', false);
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
    setWorldButton(key, 'targeted', true);
    if (!isTrue(targeted)) {
        targeted = true;
    }
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


// jsdoc
function executeMouseDown(event) {
    if (isWorldEvent(event, 'start')) {
        if (!world.interacted) {
            interactFirst(event);
        } else {
            setWorldButton('currentButton', 'selected', false);
            setLeaderboard(event);
            setQuestRoll(event);
            startNewGame(event);
        }
    }
}


// jsdoc
function isWorldEvent(event, name) {
    return event && isMatch(currentWorld, name);
}


// jsdoc
function interactFirst(event) {
    if (event) {
        world.interacted = true;
    }
}


// jsdoc
function setLeaderboard(event) {
    closeByMouseClick(event, 'xButton');
    openLeaderboard(event, 'cupButton');
    openLeaderboard(event, 'settingsButton');
    setVolumeButtonGroup(event);
}


// jsdoc
function closeByMouseClick(event, key) {
    if (isButtonReachable(event, key)) {
        setWorldButton(key, 'locked', true);
    }
}


// jsdoc
function isButtonReachable(event, key) {
    return isMouseEvent(event, world[key]) && world[key].reachable;
}


// jsdoc
function openLeaderboard(event, key) {
    if (isNotBoard(event, key, 'leaderboard') || isButtonLocked(event, key, true)) {
        setWorldButton(key, 'locked', false);
    } else if (isButtonLocked(event, key, false)) {
        setWorldButton(key, 'locked', true);
    }
}


// jsdoc
function isNotBoard(event, key, board) {
    let buttonClicked = isMouseEvent(event, world[key]);
    let boardClicked = isMouseEvent(event, world[board]);
    return !buttonClicked && !boardClicked;
}


// jsdoc
function isButtonLocked(event, key, logical) {
    if (logical) {
        return isMouseEvent(event, world[key]) && world[key].isLocked();
    } else {
        return isMouseEvent(event, world[key]) && !world[key].isLocked();
    }
}


// jsdoc
function setVolumeButtonGroup(event) {
    setVolumeButton(event, 'lowMusicButton');
    setVolumeButton(event, 'highMusicButton');
    setVolumeButton(event, 'lowSoundButton');
    setVolumeButton(event, 'highSoundButton');
}


// jsdoc
function setVolumeButton(event, key) {
    if (isButtonReachable(event, key)) {
        setWorldButton(key, 'locked', true);
    }
}


// jsdoc
function setQuestRoll(event) {
    closeByMouseClick(event, 'coinButton');
    openQuestRoll(event, 'questButton');
}


// jsdoc
function openQuestRoll(event, key) {
    if (isNotBoard(event, key, 'questRoll')) {
        setWorldButton(key, 'locked', false);
    } else if (isButtonLocked(event, key, false) && !world.leaderboard.isOpened()) {
        setWorldButton(key, 'locked', true);
    }
}


// jsdoc
function startNewGame(event) {
    if (isNewGame(event)) {
        setWorldButton('newGameButton', 'locked', true);
    }
}


// jsdoc
function isNewGame(event) {
    let clicked = isMouseEvent(event, world.newGameButton);
    let leaderboardOpened = world.leaderboard.isOpened();
    let questRollOpened = world.questRoll.isOpened();
    return clicked && !(leaderboardOpened || questRollOpened);
}


// jsdoc
function executeMouseUp() {
    enableMainButtons();
}


// jsdoc
function enableMainButtons() {
    if (isMainRevealed()) {
        world.mainRevealed = true;
        setMainButtonsReachable();
    }
}


// jsdoc
function isMainRevealed() {
    let startWorld = isMatch(currentWorld, 'start');
    let interacted = isTrue(world.interacted);
    return startWorld && interacted && !world.mainRevealed;
}


// jsdoc
function setMainButtonsReachable() {
    let keys = ['newGameButton', 'questButton', 'cupButton', 'settingsButton'];
    keys.forEach((key) => {
        setWorldButton(key, 'reachable', true);
    });
}