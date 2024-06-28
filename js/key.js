let buttonSelected = false;


// jsdoc
function getCode(code) {
    return code.replace(code[0], code[0].toLowerCase());
}


// jsdoc
function getKey(key, subkey) {
    return world.keyboard[key][subkey];
}


// jsdoc
function setKey(key, subkey, value) {
    world.keyboard[key][subkey] = value;
}


// jsdoc
function isKey(key, subkey) {
    return (subkey) ? keyboard[key][subkey] : keyboard[key].keydown;
}


// jsdoc
function verifyDoubleClick(code) {
    if (isDoubleClick(code) && !getKey(code, 'doubleClick')) {
        setKey(code, 'doubleClick', true);
    }
}


// jsdoc
function isDoubleClick(code) {
    return getKey(code, 'timeStamp') - getKey(code, 'lastKeyUp') < 250;
}



// set all keys (x, a, ...) ...