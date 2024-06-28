let buttonSelected = false;


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
function isKey(key, subkey) {
    return (subkey) ? keyboard[key][subkey] : keyboard[key].keydown;
}