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


/**
 * Executes the touch start.
 * @param {event} event - The event of the touch start.
 */
function executeTouchStart(event) {
    if (isWorldEvent(event, 'level')) {
        setTouchZones();
        let touch = getChangedTouch(event);
        startTouchEvent(touch);
    }
}


/**
 * Sets the touch zones.
 */
function setTouchZones() {
    touchedZone = '';
    setTouchZoneSize();
    setPauseZoneSize();
}


/**
 * Sets the sizes of the touch zones.
 */
function setTouchZoneSize() {
    touchZoneWidth = getZoneSize('offsetWidth', 3, 1);
    touchZoneHeight = getZoneSize('offsetHeight', 3, 2);
}


/**
 * Provides a size value of the touch zone.
 * @param {string} key - The size value of the body.
 * @param {number} a - The basic quantity.
 * @param {number} b - The proportion.
 * @returns {number} - The size value of the touch zone.
 */
function getZoneSize(key, a, b) {
    return body[key] / a * b;
}


/**
 * Sets the size of the pause zone.
 */
function setPauseZoneSize() {
    pauseZoneWidth = getZoneSize('offsetWidth', 16, 3);
    pauseZoneHeight = getZoneSize('offsetHeight', 9, 2);
}


/**
 * Starts the touch event.
 * @param {touch} touch - The touch object.
 */
function startTouchEvent(touch) {
    if (isExitZone(touch)) {
        executeZoneEvent('exit', 'exitLevel');
    } else if (isPauseZone(touch)) {
        executeZoneEvent('pause', 'pauseLevel');
    } else if (isControlZone(touch)) {
        executeZoneEvent('control', 'setControl', touch);
    } else if (isActionZone(touch)) {
        executeZoneEvent('action', 'setAction', touch);
    }
}


/**
 * Provides the changed touch.
 * @param {event} event - The event of the touch start.
 * @returns {object} - The changed touch.
 */
function getChangedTouch(event) {
    return event.changedTouches[0];
}


/**
 * Verifies the exit zone.
 * @param {object} touch - The touch object.
 * @returns {boolean} - A boolean value.
 */
function isExitZone(touch) {
    let inZone = isZoneX(touch) && isGreater(touch.clientY, pauseZoneHeight);
    return inZone && isTrue(fullScreenEnabled);
}


/**
 * Verifies the x value of the touch zone.
 * @param {object} touch - The touch object.
 * @returns {boolean} - The boolean value.
 */
function isZoneX(touch) {
    let xLeft = getZoneValue('offsetWidth', -pauseZoneWidth);
    let xRight = getZoneValue('offsetWidth', pauseZoneWidth);
    return isIncluded(xLeft, touch.clientX, xRight);
}


/**
 * Provides a value of the touch zone.
 * @param {string} key - The size value of the body.
 * @param {number} value - The size value of the touch zone.
 * @returns {number} - A value of the touch zone.
 */
function getZoneValue(key, value) {
    let halfBodySize = body[key] / 2;
    let halfZoneSize = value / 2;
    return getSum(halfBodySize, halfZoneSize);
}


/**
 * Executes the zone event.
 * @param {string} id - The id of the touch zone.
 * @param {string} method - The method to apply.
 * @param {object} touch - The touch object.
 */
function executeZoneEvent(id, method, touch) {
    touchedZone = id;
    (!touch) ? this[method]() : this[method](touch);
}


/**
 * Verifies the pause zone.
 * @param {object} touch - The touch object.
 * @returns {boolean} - A boolean value.
 */
function isPauseZone(touch) {
    let inZone = isZoneX(touch) && isZoneY(touch, -pauseZoneHeight);
    return inZone && isTrue(fullScreenEnabled);
}


/**
 * Verifies the y value of the touch zone.
 * @param {object} touch - The touch object.
 * @param {number} height - The height of the touch zone.
 * @returns {number} - The y value of the touch zone.
 */
function isZoneY(touch, height) {
    let deltaY = getSum(body.offsetHeight, height);
    return isGreater(deltaY, touch.clientY);
}


/**
 * Verifies the control zone.
 * @param {object} touch - The touch object.
 * @returns {boolean} - A boolean value.
 */
function isControlZone(touch) {
    return isGreater(touch.clientX, touchZoneWidth) && isZoneY(touch, -touchZoneHeight);
}


/**
 * Sets the control.
 * @param {object} touch - The touch object.
 */
function setControl(touch) {
    currentX = touch.clientX;
    currentY = touch.clientY;
    lastTime = currentTime;
    currentTime = getTime();
    enableRun();
}


/**
 * Enables the run.
 */
function enableRun() {
    let timeDiff = getSum(currentTime, -lastTime);
    if (isGreater(timeDiff, 500)) {
        doubleClick = true;
    }
}


/**
 * Verifies the action zone.
 * @param {object} touch - The touch object.
 * @returns {boolean} - A boolean value.
 */
function isActionZone(touch) {
    let deltaX = getSum(body.offsetWidth, -touchZoneWidth);
    let deltaY = getSum(body.offsetHeight, -touchZoneHeight);
    return isGreater(deltaX, touch.clientX) && isGreater(deltaY, touch.clientY);
}


/**
 * Sets the action.
 * @param {object} touch - The touch object.
 */
function setAction(touch) {
    if (isActionSubzone(touch, 2)) {
        setKey('space', 'keydown', true);
    } else if (isActionSubzone(touch, 1)) {
        setAttackKey();
    }
}


/**
 * Verifies the subzone of the action zone.
 * @param {object} touch - The touch object.
 * @param {number} n - The id of the subzone.
 * @returns {boolean} - A boolean value.
 */
function isActionSubzone(touch, n) {
    let startY = getTouchZoneStartY(n);
    return isGreater(startY, touch.clientY);
}


/**
 * Provides the start y value of the touch zone.
 * @param {number} n - The id of the touch zone.
 * @returns {number} - The start y value.
 */
function getTouchZoneStartY(n) {
    return body.offsetHeight - touchZoneHeight / n;
}


/**
 * Sets the attack key.
 */
function setAttackKey() {
    if (!world.hero.bombUnlocked) {
        setKey('keyA', 'keydown', true);
    } else {
        setKey('keyF', 'keydown', true);
    }
}