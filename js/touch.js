let currentX = 0;
let lastX = 0;
let deltaX = 0;
let currentY = 0;
let lastY = 0;
let deltaY = 0;
let currentTime = 0;
let lastTime = 0;
let doubleClick = false;    // rename to run?
let climb = false;
let move = false;


window.addEventListener("touchstart", (event) => {
    if (event && isMatch(currentWorld, 'level')) {

        let touch = event.changedTouches[0];    // rename!!!

        if (isGreater(touch.clientX, body.offsetWidth / 2)) {
            currentX = touch.clientX;
            currentY = touch.clientY;
            lastTime = currentTime;
            currentTime = getTime();

            if (isGreater(currentTime - lastTime, 500)) {
                doubleClick = true;
            }

        } else if (isGreater(body.offsetWidth / 2, touch.clientX)) {

            if (isGreater(body.offsetHeight / 2, touch.clientY)) {
                if (!world.hero.bombUnlocked) {
                    setKey('keyA', 'keydown', true);
                } else if (isTrue(world.hero.bombUnlocked)) {
                    setKey('keyF', 'keydown', true);
                }
            } else {
                setKey('space', 'keydown', true);
            }
        }
    }
});


window.addEventListener("touchmove", (event) => {
    if (event && isMatch(currentWorld, 'level')) {


        let touch = event.changedTouches[0];
        if (isGreater(touch.clientX, body.offsetWidth / 2)) {    // set timeout for climb, run and walk (16-128px)!
            lastX = currentX;
            currentX = touch.clientX;
            deltaX = currentX - lastX;
            lastY = currentY;
            currentY = touch.clientY;
            deltaY = lastY - currentY;


            let absDeltaX;
            let absDeltaY;
            if (deltaX < 0) {
                absDeltaX = deltaX * deltaX / (deltaX * -1);
            } else {
                absDeltaX = deltaX;
            }
            if (deltaY < 0) {
                absDeltaY = deltaY * deltaY / (deltaY * -1);
            } else {
                absDeltaY = deltaY;
            }


            if (isGreater(absDeltaX, absDeltaY) && isGreater(4, absDeltaY)) {
                move = false;
                climb = true;
            } else if (isGreater(absDeltaY, absDeltaX) && isGreater(4, absDeltaX)) {
                climb = false;
                move = true;
            }

            if (isTrue(climb)) {
                setKey('arrowRight', 'keydown', false);
                setKey('arrowLeft', 'keydown', false);
                if (isGreater(currentY, lastY)) {
                    setKey('arrowDown', 'keydown', false);
                    setKey('arrowUp', 'keydown', true);
                } else if (isGreater(lastY, currentY)) {
                    setKey('arrowUp', 'keydown', false);
                    setKey('arrowDown', 'keydown', true);
                }
                console.log('delta sky start');
            } else if (isTrue(move)) {
                if (isGreater(currentX, lastX) && isTrue(doubleClick)) {
                    setKey('arrowRight', 'doubleClick', false);
                    setKey('arrowLeft', 'doubleClick', true);
                } else if (isGreater(lastX, currentX) && isTrue(doubleClick)) {
                    setKey('arrowLeft', 'doubleClick', false);
                    setKey('arrowRight', 'doubleClick', true);
                }
                if (isGreater(currentX, lastX)) {
                    setKey('arrowRight', 'keydown', false);
                    setKey('arrowLeft', 'keydown', true);
                } else if (isGreater(lastX, currentX)) {
                    setKey('arrowLeft', 'keydown', false);
                    setKey('arrowRight', 'keydown', true);
                }
                console.log('delta earth start');
            }
            console.log('delta move: ', deltaX, deltaY, isGreater(deltaX, deltaY));
        }
    }
});


window.addEventListener("touchend", (event) => {
    if (event && isMatch(currentWorld, 'level')) {


        let touch = event.changedTouches[0];
        if (isGreater(touch.clientX, body.offsetWidth / 2)) {
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
        } else if (isGreater(body.offsetWidth / 2, touch.clientX)) {
            if (isGreater(body.offsetHeight / 2, touch.clientY)) {
                setKey('keyA', 'keydown', false);
                setKey('keyF', 'keydown', false);    // condition?
            } else {
                setKey('space', 'keydown', false);
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