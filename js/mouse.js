let targeted = false;


executeEvent('mousemove', (event) => executeMouseMove(event));
executeEvent('mousedown', (event) => executeMouseDown(event));
executeEvent('mouseup', (event) => executeMouseUp(event));


/**
 * Executes the mouse move.
 * @param {event} event - The event of the mouse move.
 */
function executeMouseMove(event) {
    targeted = false;
    if (isMatch(currentWorld, 'start')) {
        applyHover(event);
        setCursorInitial();
    }
}


/**
 * Applies the hover.
 * @param {event} event - The event of the mouse move.
 */
function applyHover(event) {
    if (event) {
        let buttons = getButtonRegister();
        buttons.forEach((button) => {
            hover(event, button);
        });
    }
}


/**
 * Provides the registered buttons.
 * @returns {array} - The registered buttons.
 */
function getButtonRegister() {
    return [
        'xButton', 'lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton',
        'coinButton', 'cupButton', 'settingsButton', 'questButton', 'newGameButton'
    ];
}


/**
 * Executes the hover.
 * @param {event} event - The event of mouse move.
 * @param {string} key - The key of the button.
 */
function hover(event, key) {
    if (isMouseEvent(event, world[key])) {
        setGlobalTargeted(key);
    } else {
        setWorldButton(key, 'targeted', false);
    }
}


/**
 * Verifies the mouse event.
 * @param {event} mouse - The mouse event to match.
 * @param {object} object - The object to match.
 * @returns {boolean} - A boolean value.
 */
function isMouseEvent(mouse, object) {
    if (mouse && object) {
        mouse = getMouseXY(mouse);
        return isIncluded2D(mouse, object);
    }
}


/**
 * Provides the coordinates of the mouse.
 * @param {object} mouse - The mouse object.
 * @returns {object} - The coordinates of the mouse.
 */
function getMouseXY(mouse) {
    let offsetX = getMouseCoord(mouse.offsetX, 'offsetWidth', NATIVE_WIDTH);
    let offsetY = getMouseCoord(mouse.offsetY, 'offsetHeight', NATIVE_HEIGHT);
    return { x: offsetX, y: offsetY };
}


/**
 * Provides a coordinate of the mouse.
 * @param {object} mouse - The mouse object.
 * @param {string} key - The key of the mouse value.
 * @param {number} size - The size value of the canvas.
 * @returns {number} - The coordinate of the mouse.
 */
function getMouseCoord(mouse, key, size) {
    return mouse / canvas[key] * size;
}


/**
 * Sets the global targeted value.
 * @param {string} key - The key of the button.
 */
function setGlobalTargeted(key) {
    setWorldButton(key, 'targeted', true);
    if (!isTrue(targeted)) {
        targeted = true;
    }
}


/**
 * Sets the cursor to initial.
 */
function setCursorInitial() {
    if (!isTrue(targeted)) {
        setCursor('initial');
    }
}


/**
 * Sets the cursor.
 * @param {string} value - The type of cursor.
 */
function setCursor(value) {
    canvas.style.cursor = value;
}


/**
 * Executes the mouse down.
 * @param {event} event - The event of the mouse down.
 */
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


/**
 * Verifies the world event.
 * @param {event} event - The event to verify.
 * @param {string} name - The name of the world.
 * @returns {boolean} - A boolean value.
 */
function isWorldEvent(event, name) {
    return event && isMatch(currentWorld, name);
}


/**
 * Sets the interacted value of the world.
 * @param {event} event - The event to verify.
 */
function interactFirst(event) {
    if (event) {
        world.interacted = true;
    }
}


/**
 * Sets the leaderboard.
 * @param {event} event - The event of the mouse down.
 */
function setLeaderboard(event) {
    closeByMouseClick(event, 'xButton');
    openLeaderboard(event, 'cupButton');
    openLeaderboard(event, 'settingsButton');
    setVolumeButtonGroup(event);
}


/**
 * Closes the board by mouse click.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The name of the button.
 */
function closeByMouseClick(event, key) {
    if (isButtonReachable(event, key)) {
        setWorldButton(key, 'locked', true);
    }
}


/**
 * Verifies, if the button is reachable.
 * @param {event} event - The event of mouse down.
 * @param {string} key - The key of the button.
 * @returns {boolean} - A boolean value.
 */
function isButtonReachable(event, key) {
    return isMouseEvent(event, world[key]) && world[key].reachable;
}


/**
 * Opens the leaderboard.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The key of the button.
 */
function openLeaderboard(event, key) {
    if (isNotBoard(event, key, 'leaderboard') || isButtonLocked(event, key, true)) {
        setWorldButton(key, 'locked', false);
    } else if (isButtonLocked(event, key, false)) {
        setWorldButton(key, 'locked', true);
    }
}


/**
 * Verifies a click beside the board.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The key of the button.
 * @param {string} board - The board to verify.
 * @returns {boolean} - A boolean value.
 */
function isNotBoard(event, key, board) {
    let buttonClicked = isMouseEvent(event, world[key]);
    let boardClicked = isMouseEvent(event, world[board]);
    return !buttonClicked && !boardClicked;
}


/**
 * Verifies, if the button is locked.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The key of the button.
 * @param {boolean} logical - A boolean value.
 * @returns {boolean} - A boolean value.
 */
function isButtonLocked(event, key, logical) {
    let mouseEvent = isMouseEvent(event, world[key]);
    if (logical) {
        return mouseEvent && world[key].isLocked();
    } else {
        return mouseEvent && !world[key].isLocked();
    }
}


/**
 * Sets the volume button group.
 * @param {event} event - The event of the mouse down.
 */
function setVolumeButtonGroup(event) {
    setVolumeButton(event, 'lowMusicButton');
    setVolumeButton(event, 'highMusicButton');
    setVolumeButton(event, 'lowSoundButton');
    setVolumeButton(event, 'highSoundButton');
}


/**
 * Sets the volume button.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The key of the button.
 */
function setVolumeButton(event, key) {
    if (isButtonReachable(event, key)) {
        setWorldButton(key, 'locked', true);
    }
}


/**
 * Sets the quest roll.
 * @param {event} event - The event of the mouse down.
 */
function setQuestRoll(event) {
    closeByMouseClick(event, 'coinButton');
    openQuestRoll(event, 'questButton');
}


/**
 * Opens the quest roll.
 * @param {event} event - The event of the mouse down.
 * @param {string} key - The key of the button.
 */
function openQuestRoll(event, key) {
    if (isNotBoard(event, key, 'questRoll')) {
        setWorldButton(key, 'locked', false);
    } else if (isButtonLocked(event, key, false) && !world.leaderboard.isOpened()) {
        setWorldButton(key, 'locked', true);
    }
}


/**
 * Starts the new game.
 * @param {event} event - The event of the mouse down.
 */
function startNewGame(event) {
    if (isNewGame(event)) {
        setWorldButton('newGameButton', 'locked', true);
    }
}


/**
 * Verifies the new game.
 * @param {event} event - The event of the mouse down.
 * @returns {boolean} - A boolean value.
 */
function isNewGame(event) {
    let clicked = isMouseEvent(event, world.newGameButton);
    let leaderboardOpened = world.leaderboard.isOpened();
    let questRollOpened = world.questRoll.isOpened();
    return clicked && !(leaderboardOpened || questRollOpened);
}


/**
 * Executes the mouse up.
 */
function executeMouseUp() {
    enableMainButtons();
}


/**
 * Enables the main buttons.
 */
function enableMainButtons() {
    if (isMainRevealed()) {
        world.mainRevealed = true;
        setMainButtonsReachable();
    }
}


/**
 * Verifies, if the start screen is revealed.
 * @returns {boolean} - A boolean value.
 */
function isMainRevealed() {
    let startWorld = isMatch(currentWorld, 'start');
    let interacted = isTrue(world.interacted);
    return startWorld && interacted && !world.mainRevealed;
}


/**
 * Sets the main buttons reachable.
 */
function setMainButtonsReachable() {
    let keys = ['newGameButton', 'questButton', 'cupButton', 'settingsButton'];
    keys.forEach((key) => {
        setWorldButton(key, 'reachable', true);
    });
}