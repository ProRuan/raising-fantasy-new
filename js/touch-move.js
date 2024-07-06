/**
 * Executes the touch move.
 * @param {event} event - The event of the touch move.
 */
function executeTouchMove(event) {
    if (isWorldEvent(event, 'level')) {
        let touch = getChangedTouch(event);
        updateTouchEvent(touch);
    }
}


/**
 * Updates the touch event.
 * @param {object} touch - The touch object.
 */
function updateTouchEvent(touch) {
    if (isControlZone(touch)) {
        applyControl(touch);
    }
}


/**
 * Applies the control.
 * @param {object} touch - The touch object.
 */
function applyControl(touch) {
    calculateTouchMove(touch);
    calculateMoveDirection();
    setMoveDirection();
    setMove();
}


/**
 * Calculates the touch move.
 * @param {object} touch - The touch object.
 */
function calculateTouchMove(touch) {
    calculateDeltaΧ(touch);
    calculateDeltaY(touch);
}


/**
 * Calculates the delta x value of the touch move.
 * @param {object} touch - The touch object.
 */
function calculateDeltaΧ(touch) {
    lastX = currentX;
    currentX = touch.clientX;
    deltaX = getSum(currentX, -lastX);
}


/**
 * Calculates the delta y value of the touch move.
 * @param {object} touch - The touch object.
 */
function calculateDeltaY(touch) {
    lastY = currentY;
    currentY = touch.clientY;
    deltaY = getSum(lastY, -currentY);
}


/**
 * Calculates the direction of the touch move.
 */
function calculateMoveDirection() {
    absDeltaX = getAbsoluteValue(deltaX);
    absDeltaY = getAbsoluteValue(deltaY);
}


/**
 * Provides the absoulte value.
 * @param {number} value - The input value.
 * @returns {number} - The absolute value.
 */
function getAbsoluteValue(value) {
    if (isGreater(value, 0)) {
        return value * value / (value * -1);
    } else {
        return value;
    }
}


/**
 * Sets the direction of the move.
 */
function setMoveDirection() {
    if (isDirection(absDeltaX, absDeltaY)) {
        move = false;
        climb = true;
    } else if (isDirection(absDeltaY, absDeltaX)) {
        climb = false;
        move = true;
    }
}


/**
 * Verifies the direction of the touch move.
 * @param {number} valueA - The value a to compare.
 * @param {number} valueB - The value b to compare.
 * @returns {boolean} - A boolean value.
 */
function isDirection(valueA, valueB) {
    return isGreater(valueA, valueB) && isGreater(4, valueB);
}


/**
 * Sets the move of the hero.
 */
function setMove() {
    if (isTrue(climb)) {
        setClimb();
    } else if (isTrue(move)) {
        setRun();
        setWalk();
    }
}


/**
 * Sets the climb.
 */
function setClimb() {
    setHorizArrow('keydown', false, false);
    if (isGreater(currentY, lastY)) {
        setVertArrow('keydown', true, false);
    } else if (isGreater(lastY, currentY)) {
        setVertArrow('keydown', false, true);
    }
}


/**
 * Sets the horizontal arrow keys.
 * @param {string} subkey - The property of the key.
 * @param {any} valueA - The value a to set.
 * @param {any} valueB - The value b to set.
 */
function setHorizArrow(subkey, valueA, valueB) {
    setKey('arrowLeft', subkey, valueA);
    setKey('arrowRight', subkey, valueB);
}


/**
 * Sets the vertical arrow keys.
 * @param {string} subkey - The property of the key.
 * @param {any} valueA - The value a to set.
 * @param {any} valueB - The value b to set.
 */
function setVertArrow(subkey, valueA, valueB) {
    setKey('arrowUp', subkey, valueA);
    setKey('arrowDown', subkey, valueB);
}


/**
 * Sets the run.
 */
function setRun() {
    if (isGreater(currentX, lastX) && isTrue(doubleClick)) {
        setHorizArrow('doubleClick', true, false);
    } else if (isGreater(lastX, currentX) && isTrue(doubleClick)) {
        setHorizArrow('doubleClick', false, true);
    }
}


/**
 * Sets the walk.
 */
function setWalk() {
    if (isGreater(currentX, lastX)) {
        setHorizArrow('keydown', true, false);
    } else if (isGreater(lastX, currentX)) {
        setHorizArrow('keydown', false, true);
    }
}


/**
 * Executes the touch end.
 * @param {event} event - The event of the touch end.
 */
function executeTouchEnd(event) {
    if (event && isMatch(currentWorld, 'level')) {
        let touch = getChangedTouch(event);
        endTouchEvent(touch);
    }
}


/**
 * Ends the touch event.
 * @param {object} touch - The touch object.
 */
function endTouchEvent(touch) {
    if (isControlZone(touch) || isMatch(touchedZone, 'control')) {
        resetTouch();
        resetControlKeys();
    }
    if (isActionZone(touch) || isMatch(touchedZone, 'action')) {
        resetActionKeys();
    }
}


/**
 * Resets the parameters of the touch.
 */
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


/**
 * Resets the control keys.
 */
function resetControlKeys() {
    setVertArrow('keydown', false, false);
    setHorizArrow('doubleClick', false, false);
    setHorizArrow('keydown', false, false);
}


/**
 * Resets the action keys.
 */
function resetActionKeys() {
    setKey('space', 'keydown', false);
    setKey('keyA', 'keydown', false);
    setKey('keyF', 'keydown', false);
}


/**
 * Executes the touch cancel event.
 * @param {event} event - The event of the touch cancel.
 */
function executeTouchCancel(event) {
    if (isWorldEvent(event, 'level')) {
        resetTouch();
        resetControlKeys();
        resetActionKeys();
    }
}