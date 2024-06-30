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


// jsdoc
function setTouchZones() {
    setTouchZoneSize();
    setPauseZoneSize();
}


// jsdoc
function setTouchZoneSize() {
    touchZoneWidth = getZoneSize('offsetWidth', 3, 1);
    touchZoneHeight = getZoneSize('offsetHeight', 3, 2);
}


// jsdoc
function getZoneSize(key, a, b) {
    return body[key] / a * b
}


// jsdoc
function setPauseZoneSize() {
    pauseZoneWidth = getZoneSize('offsetWidth', 16, 3);
    pauseZoneHeight = getZoneSize('offsetHeight', 9, 2);
}


// jsdoc
function executeTouchStart(event) {
    if (isWorldEvent(event, 'level')) {
        touchedZone = '';
        selectZoneEvent(event);
    }
}


// jsdoc
function selectZoneEvent(event) {
    let touch = getChangedTouch(event);
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


function isExitZone(touch) {
    let pauseXLeft = getSum(body.offsetWidth / 2, -pauseZoneWidth / 2);
    let pauseXRight = getSum(body.offsetWidth / 2, pauseZoneWidth / 2);
    let pauseZoneTouched = isGreater(pauseXLeft, touch.clientX) && isGreater(touch.clientX, pauseXRight);
    return pauseZoneTouched && isGreater(touch.clientY, pauseZoneHeight);
}


function executeZoneEvent(id) {
    touchedZone = id;
}


function isPauseZone(touch) {
    let pauseXLeft = getSum(body.offsetWidth / 2, -pauseZoneWidth / 2);
    let pauseXRight = getSum(body.offsetWidth / 2, pauseZoneWidth / 2);
    let deltaY = getSum(body.offsetHeight, -pauseZoneHeight);
    let pauseZoneTouched = isGreater(pauseXLeft, touch.clientX) && isGreater(touch.clientX, pauseXRight);
    return pauseZoneTouched && isGreater(deltaY, touch.clientY);
}


function isControlZone(touch) {
    let deltaY = getSum(body.offsetHeight, -touchZoneHeight);
    return isGreater(touch.clientX, touchZoneWidth) && isGreater(deltaY, touch.clientY);
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


function isActionZone(touch) {
    let deltaX = getSum(body.offsetWidth, -touchZoneWidth);
    let deltaY = getSum(body.offsetHeight, -touchZoneHeight);
    return isGreater(deltaX, touch.clientX) && isGreater(deltaY, touch.clientY);
}


function setAction(touch) {
    if (isGreater(body.offsetHeight - touchZoneHeight / 2, touch.clientY)) {
        setKey('space', 'keydown', true);
    } else if (isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {
        setAttackKey();
    }
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
        if (isControlZone(touch)) {
            applyControl(touch);
        }
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


window.addEventListener("touchend", (event) => {
    if (event && isMatch(currentWorld, 'level')) {

        let touchZoneWidth = body.offsetWidth / 3;
        let touchZoneHeight = body.offsetHeight / 3 * 2;

        if (isGreater(touchZoneWidth, 192)) {
            touchZoneWidth = 192;
        }
        if (isGreater(touchZoneHeight, 192)) {
            touchZoneHeight = 192;
        }

        // console.log('touch zone: ', Math.floor(touchZoneWidth), Math.floor(touchZoneHeight));

        let pauseZoneWidth = body.offsetWidth / 16 * 2;
        let pauseZoneHeight = body.offsetHeight / 9 * 1;
        if (isGreater(pauseZoneWidth, 128)) {
            pauseZoneWidth = 128;
        }
        if (isGreater(pauseZoneHeight, 72)) {
            pauseZoneHeight = 72;
        }
        // console.log('pause zone: ', Math.floor(pauseZoneWidth), Math.floor(pauseZoneHeight));


        let touch = event.changedTouches[0];
        if (isGreater(touch.clientX, touchZoneWidth) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY) || isMatch(touchedZone, 'control')) {
            lastX = 0;
            currentX = 0;
            deltaX = 0;
            lastY = 0;
            currentY = 0;
            deltaY = 0;
            doubleClick = false;
            climb = false;
            move = false;
            setKey('arrowUp', 'keydown', false);
            setKey('arrowDown', 'keydown', false);
            setKey('arrowLeft', 'doubleClick', false);
            setKey('arrowRight', 'doubleClick', false);
            setKey('arrowLeft', 'keydown', false);
            setKey('arrowRight', 'keydown', false);
        } else if (isGreater(body.offsetWidth - touchZoneWidth, touch.clientX) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY) || isMatch(touchedZone, 'action')) {
            if (isGreater(body.offsetHeight - touchZoneHeight / 2, touch.clientY)) {
                setKey('space', 'keydown', false);
            } else {
                setKey('keyA', 'keydown', false);
                setKey('keyF', 'keydown', false);    // condition?
            }
        }
    }
});


window.addEventListener("touchcancel", (event) => {
    if (event && isMatch(currentWorld, 'level')) {

        lastX = 0;
        currentX = 0;
        deltaX = 0;
        lastY = 0;
        currentY = 0;
        deltaY = 0;
        doubleClick = false;
        climb = false;
        move = false;

        setKey('arrowUp', 'keydown', false);
        setKey('arrowDown', 'keydown', false);
        setKey('space', 'keydown', false);
        setKey('arrowLeft', 'doubleClick', false);
        setKey('arrowRight', 'doubleClick', false);
        setKey('arrowLeft', 'keydown', false);
        setKey('arrowRight', 'keydown', false);
        setKey('keyA', 'keydown', false);
        setKey('keyF', 'keydown', false);

        console.log('canceled all');
    }
});




// zone left, right, pause, touch zone switcher ...
// climb (reset x speed) ... ?


// touch events (5/7)
// ------------
// climb - check
// jump - check
// runAttack - check
// run - check
// walkAttack - check
// walk - check
// attack - check

// optimize touch control ... !!!
// make two or three touch zones ...
// make two or three touch arrays ...
// think about touch array reset ...
// make circles for touch zones ...
// set conditions for touch events (control, attack, jump) ...
// make (own) touchEvent (left/control and right/action) ...

// canvas - size dividable by 4, 8, 16, 64 ... ?