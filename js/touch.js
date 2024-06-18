let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let lastTouchStartTime = 0;

let leftTouches = [];
let rightTouches = [];


window.addEventListener("touchstart", (event) => {
    if (event && isMatch(currentWorld, 'level')) {
        // make it variable!!! (set currentWorld!)
        let cupButton = world.cupButton;
        let settingsButton = world.settingsButton;

        let touch = event.changedTouches[0];
        let x = touch.clientX / world.canvas.offsetWidth * NATIVE_WIDTH;
        let canvasX = world.canvas.offsetLeft / world.canvas.offsetWidth * NATIVE_WIDTH;
        x = x - canvasX;
        x = Math.round(x);
        let y = touch.clientY / world.canvas.offsetHeight * NATIVE_HEIGHT;
        y = Math.round(y);

        // console.log('x: ', x, x);
        // console.log(cupButton.xLeft, x, cupButton.xRight);
        // console.log(cupButton.yTop, y, cupButton.yBottom);

        // console.log(settingsButton.xLeft, x, settingsButton.xRight);
        // console.log(settingsButton.yTop, y, settingsButton.yBottom);


        let hero = world.hero.body;
        // console.log(hero.xLeft, x, hero.xRight);
        // console.log(hero.yTop, y, hero.yBottom);

        let heroX = hero.xCenter - (hero.xCenter - world.heroX);

        // if (isGreater(x, heroX)) {
        //     setKey('arrowLeft', 'keydown', true);
        // }
        // if (isGreater(heroX, x)) {
        //     setKey('arrowRight', 'keydown', true);
        // }


        // touchStartX = x;
        // touchStartY = y;
        // lastTouchStartTime = touchStartTime;
        // touchStartTime = getTime();


        if (isGreater(event.changedTouches[0].clientX, body.offsetWidth / 2)) {
            touchStartX = x;
            touchStartY = y;
            lastTouchStartTime = touchStartTime;
            touchStartTime = getTime();
            console.log('left touch zone');

            if (isGreater(touchStartTime - lastTouchStartTime, 500)) {
                setKey('arrowRight', 'doubleClick', true);
                setKey('arrowLeft', 'doubleClick', true);
            }
        }

        if (isGreater(body.offsetWidth / 2, event.changedTouches[0].clientX)) {
            if (isGreater(event.changedTouches[0].clientY, body.offsetHeight - 100)) {
                setKey('keyA', 'keydown', true);
            } else if (isGreater(event.changedTouches[0].clientY, body.offsetHeight - 0)) {
                setKey('space', 'keydown', true);
            }
            console.log('right touch zone');
        }

        // console.log(event);
    }
});


window.addEventListener("touchmove", (event) => {
    if (event && isMatch(currentWorld, 'level')) {
        let touch = event.changedTouches[0];
        let x = touch.clientX / world.canvas.offsetWidth * NATIVE_WIDTH;
        let canvasX = world.canvas.offsetLeft / world.canvas.offsetWidth * NATIVE_WIDTH;
        x = x - canvasX;
        x = Math.round(x);
        let y = touch.clientY / world.canvas.offsetHeight * NATIVE_HEIGHT;
        y = Math.round(y);

        if (isGreater(event.changedTouches[0].clientX, body.offsetWidth / 2)) {
            if (isGreater(y, touchStartY)) {
                setKey('arrowDown', 'keydown', false);
                setKey('arrowUp', 'keydown', true);
            }
            if (isGreater(touchStartY, y)) {
                setKey('arrowUp', 'keydown', false);
                setKey('arrowDown', 'keydown', true);
            }
            // if (isGreater(touchStartTime - lastTouchStartTime, 500) && isGreater(x, touchStartX) && isGreater(32, touchStartX - x)) {
            //     setKey('arrowRight', 'doubleClick', false);
            //     setKey('arrowLeft', 'doubleClick', true);
            // }
            // if (isGreater(touchStartTime - lastTouchStartTime, 500) && isGreater(touchStartX, x) && isGreater(32, x - touchStartX)) {
            //     setKey('arrowLeft', 'doubleClick', false);
            //     setKey('arrowRight', 'doubleClick', true);
            // }
            if (isGreater(x, touchStartX) && isGreater(32, touchStartX - x)) {
                setKey('arrowRight', 'keydown', false);
                setKey('arrowLeft', 'keydown', true);
            }
            if (isGreater(touchStartX, x) && isGreater(32, x - touchStartX)) {
                setKey('arrowLeft', 'keydown', false);
                setKey('arrowRight', 'keydown', true);
            }
            console.log('left touch zone');
        }

        // if (isGreater(body.offsetWidth / 2, event.touches[0].clientX)) {

        // }
    }
});


window.addEventListener("touchend", (event) => {
    if (event && isMatch(currentWorld, 'level')) {


        if (isGreater(event.changedTouches[0].clientX, body.offsetWidth / 2)) {
            setKey('arrowUp', 'keydown', false);
            setKey('arrowDown', 'keydown', false);
            setKey('arrowLeft', 'keydown', false);
            setKey('arrowRight', 'keydown', false);
            setKey('arrowLeft', 'doubleClick', false);
            setKey('arrowRight', 'doubleClick', false);
            console.log('left touch zone');
        }


        if (isGreater(body.offsetWidth / 2, event.changedTouches[0].clientX)) {
            if (isGreater(event.changedTouches[0].clientY, body.offsetHeight - 100)) {
                setKey('keyA', 'keydown', false);
            } else if (isGreater(event.changedTouches[0].clientY, body.offsetHeight - 0)) {
                setKey('space', 'keydown', false);
            }
            console.log('right touch zone');
            // setKey('keyA', 'keydown', false);
            // setKey('space', 'keydown', false);
        }

        // if (event.touches.length > 0) {
        //     setKey('space', 'keydown', false);
        // } else {
        //     setKey('arrowUp', 'keydown', false);
        //     setKey('arrowDown', 'keydown', false);
        //     setKey('space', 'keydown', false);
        //     setKey('arrowLeft', 'keydown', false);
        //     setKey('arrowRight', 'keydown', false);
        //     setKey('arrowLeft', 'doubleClick', false);
        //     setKey('arrowRight', 'doubleClick', false);
        //     setKey('keyA', 'keydown', false);
        // }


        // console.log(event);
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