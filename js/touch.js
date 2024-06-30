let currentX = 0;
let lastX = 0;
let deltaX = 0;
let absDeltaX = 0;
let currentY = 0;
let lastY = 0;
let deltaY = 0;
let absDeltaY = 0;
let currentTime = 0;
let lastTime = 0;
let doubleClick = false;
let climb = false;
let move = false;
let touchedZone;
let touchZoneWidth;
let touchZoneHeight;
let pauseZoneWidth;
let pauseZoneHeight;


executeEvent('touchstart', (event) => executeTouchStart(event));
executeEvent('touchmove', (event) => executeTouchMove(event));
executeEvent('touchend', (event) => executeTouchEnd(event));
executeEvent('touchcancel', (event) => executeTouchCancel(event));


// jsdoc
function executeTouchStart(event) {
    if (isWorldEvent(event, 'level')) {
        touchedZone = '';
        let touch = getChangedTouch(event);
        startTouchEvent(touch);
    }
}


// jsdoc
function startTouchEvent(touch) {
    if (isExitZone(touch)) {
        executeZoneEvent('exit', exitLevel());
    } else if (isPauseZone(touch)) {
        executeZoneEvent('pause', pauseLevel());
    } else if (isControlZone(touch)) {
        executeZoneEvent('control', setControl(touch));
    } else if (isActionZone(touch)) {
        executeZoneEvent('action', setAction(touch));
    }
}


// jsdoc
function getChangedTouch(event) {
    return event.changedTouches[0];
}


// jsdoc
function isExitZone(touch) {
    return isZoneX(touch) && isGreater(touch.clientY, pauseZoneHeight);
}


// jsdoc
function isZoneX(touch) {
    let xLeft = getZoneValue('offsetWidth', -pauseZoneWidth);
    let xRight = getZoneValue('offsetWidth', pauseZoneWidth);
    return isIncluded(xLeft, touch.clientX, xRight);
}


// jsdoc
function getZoneValue(key, value) {
    let halfBodySize = body[key] / 2;
    let halfZoneSize = value / 2;
    return getSum(halfBodySize, halfZoneSize);
}


function executeZoneEvent(id) {
    touchedZone = id;
}


// jsdoc
function isPauseZone(touch) {
    return isZoneX(touch) && isZoneY(touch, -pauseZoneHeight);
}


// jsdoc
function isZoneY(touch, value) {
    let deltaY = getSum(body.offsetHeight, value);
    return isGreater(deltaY, touch.clientY);
}


// jsdoc
function isControlZone(touch) {
    return isGreater(touch.clientX, touchZoneWidth) && isZoneY(touch, -touchZoneHeight);
}


// jsdoc
function setControl(touch) {
    currentX = touch.clientX;
    currentY = touch.clientY;
    lastTime = currentTime;
    currentTime = getTime();
    enableRun();
}


// jsdoc
function enableRun() {
    let timeDiff = getSum(currentTime, -lastTime);
    if (isGreater(timeDiff, 500)) {
        doubleClick = true;
    }
}


// jsdoc
function isActionZone(touch) {
    let deltaX = getSum(body.offsetWidth, -touchZoneWidth);
    let deltaY = getSum(body.offsetHeight, -touchZoneHeight);
    return isGreater(deltaX, touch.clientX) && isGreater(deltaY, touch.clientY);
}


// jsdoc
function setAction(touch) {
    if (isActionSubzone(touch, 2)) {
        setKey('space', 'keydown', true);
    } else if (isActionSubzone(touch, 1)) {
        setAttackKey();
    }
}


// jsdoc
function isActionSubzone(touch, n) {
    let startY = getTouchZoneStartY(n);
    return isGreater(startY, touch.clientY);
}


// jsdoc
function getTouchZoneStartY(n) {
    return body.offsetHeight - touchZoneHeight / n;
}


// jsdoc
function setAttackKey() {
    if (!world.hero.bombUnlocked) {
        setKey('keyA', 'keydown', true);
    } else {
        setKey('keyF', 'keydown', true);
    }
}


// jsdoc
function executeTouchMove(event) {
    if (isWorldEvent(event, 'level')) {
        let touch = getChangedTouch(event);
        updateTouchEvent(touch);
    }
}


// jsdoc
function updateTouchEvent(touch) {
    if (isControlZone(touch)) {
        applyControl(touch);
    }
}


// jsdoc
function applyControl(touch) {
    calculateTouchMove(touch);
    calculateMoveDirection();
    setMoveDirection();
    setMove();
}


// jsdoc
function calculateTouchMove(touch) {
    calculateDeltaΧ(touch);
    calculateDeltaY(touch);
}


// jsdoc
function calculateDeltaΧ(touch) {
    lastX = currentX;
    currentX = touch.clientX;
    deltaX = getSum(currentX, -lastX);
}


// jsdoc
function calculateDeltaY(touch) {
    lastY = currentY;
    currentY = touch.clientY;
    deltaY = getSum(lastY, -currentY);
}


// jsdoc
function calculateMoveDirection() {
    absDeltaX = getAbsoluteValue(deltaX);
    absDeltaY = getAbsoluteValue(deltaY);
}


// jsdoc
function getAbsoluteValue(value) {
    if (isGreater(value, 0)) {
        return value * value / (value * -1);
    } else {
        return value;
    }
}


// jsdoc
function setMoveDirection() {
    if (isDirection(absDeltaX, absDeltaY)) {
        move = false;
        climb = true;
    } else if (isDirection(absDeltaY, absDeltaX)) {
        climb = false;
        move = true;
    }
}


// jsdoc
function isDirection(valueA, valueB) {
    return isGreater(valueA, valueB) && isGreater(4, valueB);
}


// jsdoc
function setMove() {
    if (isTrue(climb)) {
        setClimb();
    } else if (isTrue(move)) {
        setRun();
        setWalk();
    }
}


// jsdoc
function setClimb() {
    setHorizArrow('keydown', false, false);
    if (isGreater(currentY, lastY)) {
        setVertArrow('keydown', true, false);
    } else if (isGreater(lastY, currentY)) {
        setVertArrow('keydown', false, true);
    }
}


// jsdoc
function setHorizArrow(subkey, valueA, valueB) {
    setKey('arrowLeft', subkey, valueA);
    setKey('arrowRight', subkey, valueB);
}


// jsdoc
function setVertArrow(subkey, valueA, valueB) {
    setKey('arrowUp', subkey, valueA);
    setKey('arrowDown', subkey, valueB);
}


// jsdoc
function setRun() {
    if (isGreater(currentX, lastX) && isTrue(doubleClick)) {
        setHorizArrow('doubleClick', true, false);
    } else if (isGreater(lastX, currentX) && isTrue(doubleClick)) {
        setHorizArrow('doubleClick', false, true);
    }
}


// jsdoc
function setWalk() {
    if (isGreater(currentX, lastX)) {
        setHorizArrow('keydown', true, false);
    } else if (isGreater(lastX, currentX)) {
        setHorizArrow('keydown', false, true);
    }
}


// jsdoc
function executeTouchEnd(event) {
    if (event && isMatch(currentWorld, 'level')) {
        let touch = getChangedTouch(event);
        endTouchEvent(touch);
    }
}


// jsdoc
function endTouchEvent(touch) {
    if (isControlZone(touch) || isMatch(touchedZone, 'control')) {
        resetTouch();
        resetControlKeys();
    } else if (isActionZone(touch) || isMatch(touchedZone, 'action')) {
        resetActionKeys();
    }
}


// jsdoc
function resetTouch() {
    lastX = 0;
    currentX = 0;
    deltaX = 0;
    lastY = 0;
    currentY = 0;
    deltaY = 0;
    doubleClick = false;
    climb = false;
    move = false;
}


// jsdoc
function resetControlKeys() {
    setVertArrow('keydown', false, false);
    setHorizArrow('doubleClick', false, false);
    setHorizArrow('keydown', false, false);
}


// jsdoc
function resetActionKeys() {
    setKey('space', 'keydown', false);
    setKey('keyA', 'keydown', false);
    setKey('keyF', 'keydown', false);
}


// jsdoc
function executeTouchCancel(event) {
    if (isWorldEvent(event, 'level')) {
        resetTouch();
        resetControlKeys();
        resetActionKeys();
    }
}