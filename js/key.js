let buttonSelected = false;


executeEvent('keydown', (event) => executeKeyDown(event));
executeEvent('keyup', (event) => executeKeyUp(event));


// jsdoc
function executeKeyDown(event) {
    if (!world.interacted) {
        interactFirst(event);
    } else {
        selectCurrentButton();
        setKeyProperties(event);
        closeBoard();
        setPause();
    }
}


// jsdoc
function selectCurrentButton() {
    if (isMatch(currentWorld, 'start')) {
        setWorldButton('currentButton', 'selected', true);
    }
}


// jsdoc
function setWorldButton(key, subkey, value) {
    world[key][subkey] = value;
}


// jsdoc
function setKeyProperties(event) {
    let code = formatInitial(event.code, 'toLowerCase');
    let type = event.type;
    if (isKeyEvent(code, type, 'keydown')) {
        setKeyDown(code);
    } else if (isKeyEvent(code, type, 'keyup')) {
        setKeyUp(code);
    }
}


// jsdoc
function isKeyEvent(code, type, keyEvent) {
    return world.keyboard[code] && isMatch(type, keyEvent);
}


// jsdoc
function setKeyDown(code) {
    setKey(code, 'keydown', true);
    setKey(code, 'timeStamp', getTime());
    verifyDoubleClick(code);
}


// jsdoc
function setKey(key, subkey, value) {
    world.keyboard[key][subkey] = value;
}


// jsdoc
function verifyDoubleClick(code) {
    if (isDoubleClick(code) && !getKey(code, 'doubleClick')) {
        setKey(code, 'doubleClick', true);
    }
}


// jsdoc
function isDoubleClick(code) {
    let timeStamp = getKey(code, 'timeStamp');
    let lastKeyUp = getKey(code, 'lastKeyUp');
    let timeDiff = getSum(timeStamp, -lastKeyUp);
    return isGreater(timeDiff, 250);
}


// jsdoc
function getKey(key, subkey) {
    return world.keyboard[key][subkey];
}


// jsdoc
function setKeyUp(code) {
    setKey(code, 'keydown', false);
    setKey(code, 'doubleClick', false);
    setKey(code, 'lastKeyUp', getTime());
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
function isKey(key, subkey) {
    return (subkey) ? keyboard[key][subkey] : keyboard[key].keydown;
}


// jsdoc
function executeKeyUp(event) {
    buttonSelected = false;
    keyboard.enter.locked = false;
    enableMainButtons();
    setKeyProperties(event);
}