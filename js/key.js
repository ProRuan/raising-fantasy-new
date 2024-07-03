let buttonSelected = false;


executeEvent('keydown', (event) => executeKeyDown(event));
executeEvent('keyup', (event) => executeKeyUp(event));


/**
 * Execute the key down.
 * @param {event} event - The event of the key down.
 */
function executeKeyDown(event) {
    if (!world.interacted) {
        interactFirst(event);
    } else {
        selectCurrentButton();
        setKeyProperties(event);
        closeBoard();
        setPause();
        adjustFullScreen(event);
    }
}


/**
 * Selects the current button.
 */
function selectCurrentButton() {
    if (isMatch(currentWorld, 'start')) {
        setWorldButton('currentButton', 'selected', true);
    }
}


/**
 * Sets a button of the world.
 * @param {string} key - The key of the button.
 * @param {string} subkey - The subkey of the button.
 * @param {boolean} value - A boolean value.
 */
function setWorldButton(key, subkey, value) {
    world[key][subkey] = value;
}


/**
 * Sets the properties of the key.
 * @param {event} event - The key event.
 */
function setKeyProperties(event) {
    let code = formatInitial(event.code, 'toLowerCase');
    let type = event.type;
    if (isKeyEvent(code, type, 'keydown')) {
        setKeyDown(code);
    } else if (isKeyEvent(code, type, 'keyup')) {
        setKeyUp(code);
    }
}


/**
 * Verifies the key event.
 * @param {string} code - The code of the key.
 * @param {string} type - The type of the event.
 * @param {string} keyEvent - The key event to match.
 * @returns {boolean} - A boolean value.
 */
function isKeyEvent(code, type, keyEvent) {
    return world.keyboard[code] && isMatch(type, keyEvent);
}


/**
 * Sets the keydown value of the key.
 * @param {string} code - The code of the key.
 */
function setKeyDown(code) {
    setKey(code, 'keydown', true);
    setKey(code, 'timeStamp', getTime());
    verifyDoubleClick(code);
}


/**
 * Sets the key.
 * @param {string} key - The name of the key.
 * @param {string} subkey - The property of the key.
 * @param {any} value - The value to set.
 */
function setKey(key, subkey, value) {
    world.keyboard[key][subkey] = value;
}


/**
 * Verifies the double click.
 * @param {string} code - The code of the key.
 */
function verifyDoubleClick(code) {
    if (isDoubleClick(code) && !getKey(code, 'doubleClick')) {
        setKey(code, 'doubleClick', true);
    }
}


/**
 * Verifies the double click by calculation.
 * @param {string} code - The code of the key.
 * @returns {boolean} - A boolean value.
 */
function isDoubleClick(code) {
    let timeStamp = getKey(code, 'timeStamp');
    let lastKeyUp = getKey(code, 'lastKeyUp');
    let timeDiff = getSum(timeStamp, -lastKeyUp);
    return isGreater(timeDiff, 250);
}


/**
 * Provides the property of a key.
 * @param {string} key - The name of the key.
 * @param {string} subkey - The property of the key.
 * @returns {any} - The property value of the key.
 */
function getKey(key, subkey) {
    return world.keyboard[key][subkey];
}


/**
 * Sets the key up.
 * @param {code} code - The code of the key.
 */
function setKeyUp(code) {
    setKey(code, 'keydown', false);
    setKey(code, 'doubleClick', false);
    setKey(code, 'lastKeyUp', getTime());
}


/**
 * Closes the board.
 */
function closeBoard() {
    if (isMatch(currentWorld, 'start')) {
        let keys = ['backspace', 'space', 'keyX'];
        keys.forEach((key) => {
            closeWithKey(key, 'leaderboard', 'xButton');
            closeWithKey(key, 'questRoll', 'coinButton');
        });
    }
}


/**
 * Closes the board by key.
 * @param {string} key - The name of the key.
 * @param {string} board - The name of the board.
 * @param {Button} button - The button to lock.
 */
function closeWithKey(key, board, button) {
    if (isKey(key) && world[board].isOpened()) {
        world[button].locked = true;
    }
}


/**
 * Verifies the key.
 * @param {string} key - The name of the key.
 * @param {string} subkey - The property of the key.
 * @returns {boolean} - A boolean value.
 */
function isKey(key, subkey) {
    return (subkey) ? keyboard[key][subkey] : keyboard[key].keydown;
}


/**
 * Adjust full screen mode.
 * @param {event} event - The event of the key down.
 */
function adjustFullScreen(event) {
    let orientation = screen.orientation.type;
    if (orientation.includes('landscape') && isGreater(body.offsetHeight, body.offsetWidth)) {
        setFullScreen(event);
    }
}


/**
 * Sets the full screen mode.
 * @param {event} event - The event of the key down.
 */
function setFullScreen(event) {
    if (isMatch(event.code, 'Digit2')) {
        exitFullScreen();
    } else if (isMatch(event.code, 'Digit1')) {
        enterFullScreen();
    }
}


/**
 * Exits the full screen mode.
 */
function exitFullScreen() {
    fullScreenEnabled = false;
    setClass('body', 'remove', 'jc-center');
    setClass('header', 'remove', 'display-none');
    setClass('footer', 'remove', 'display-none');
    setClass('exit-full-screen-btn', 'add', 'hide');
    enableFullscreen(false);
}


/**
 * Enters the full screen mode.
 */
function enterFullScreen() {
    fullScreenEnabled = true;
    setClass('body', 'add', 'jc-center');
    setClass('header', 'add', 'display-none');
    setClass('footer', 'add', 'display-none');
    setClass('exit-full-screen-btn', 'remove', 'hide');
    enableFullscreen(true);
}


/**
 * Executes the key up.
 * @param {event} event - The event of the key up.
 */
function executeKeyUp(event) {
    buttonSelected = false;
    keyboard.enter.locked = false;
    enableMainButtons();
    setKeyProperties(event);
}