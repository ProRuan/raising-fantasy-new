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

        let touchZoneWidth = body.offsetWidth / 16 * 4;
        let touchZoneHeight = body.offsetHeight / 9 * 6;

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



        let touch = event.changedTouches[0];    // rename!!!

        if (isGreater(body.offsetWidth / 2 - pauseZoneWidth / 2, touch.clientX) && isGreater(touch.clientX, body.offsetWidth / 2 + pauseZoneWidth / 2) && isGreater(touch.clientY, pauseZoneHeight)) {
            // if (!paused) {
            //     paused = true;
            //     pauseGame(paused);
            // } else if (isTrue(paused)) {
            //     paused = false;
            //     pauseGame(paused);
            // }
            if (isTrue(paused)) {
                world.stopped = true;
                setStartWorld();    // compare with other functions!
                world.interacted = true;
                world.setCurrentButton('newGameButton');

                // reset touches (keys) or new keyboard!!!

                console.log('exit game');
            }
        }

        if (isGreater(body.offsetWidth / 2 - pauseZoneWidth / 2, touch.clientX) && isGreater(touch.clientX, body.offsetWidth / 2 + pauseZoneWidth / 2) && isGreater(body.offsetHeight - pauseZoneHeight, touch.clientY)) {
            if (!paused) {
                paused = true;
                pauseGame(paused);
            } else if (isTrue(paused)) {
                paused = false;
                pauseGame(paused);
            }
            console.log('pause zone');
        }

        if (isGreater(touch.clientX, touchZoneWidth) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {
            currentX = touch.clientX;
            currentY = touch.clientY;
            lastTime = currentTime;
            currentTime = getTime();

            if (isGreater(currentTime - lastTime, 500)) {
                doubleClick = true;
            }

            console.log('control zone');    // set height as well
        } else if (isGreater(body.offsetWidth - touchZoneWidth, touch.clientX) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {

            if (isGreater(body.offsetHeight - touchZoneHeight / 2, touch.clientY)) {
                setKey('space', 'keydown', true);
            } else {
                if (!world.hero.bombUnlocked) {
                    setKey('keyA', 'keydown', true);
                } else if (isTrue(world.hero.bombUnlocked)) {
                    setKey('keyF', 'keydown', true);
                }
            }

            console.log('action zone');    // set height as well

            console.log('body: ', body.offsetWidth, body.offsetHeight);
            console.log('touch: ', touch.clientX, touch.clientY);
        }
        console.log('touch zone size: ', touchZoneWidth, touchZoneHeight, pauseZoneWidth, pauseZoneHeight);
    }
});


window.addEventListener("touchmove", (event) => {
    if (event && isMatch(currentWorld, 'level')) {

        let touchZoneWidth = body.offsetWidth / 16 * 4;
        let touchZoneHeight = body.offsetHeight / 9 * 6;

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
        if (isGreater(touch.clientX, touchZoneWidth) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {    // set timeout for climb, run and walk (16-128px)!
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

        let touchZoneWidth = body.offsetWidth / 16 * 4;
        let touchZoneHeight = body.offsetHeight / 9 * 6;

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
        if (isGreater(touch.clientX, touchZoneWidth) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {
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
        } else if (isGreater(body.offsetWidth - touchZoneWidth, touch.clientX) && isGreater(body.offsetHeight - touchZoneHeight, touch.clientY)) {
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