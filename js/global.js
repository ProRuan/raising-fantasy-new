// on testing ...

// set home button and play button ...
// set escape and keyP ...

function pauseGame(logical) {
    if (!isTrue(pauseDisabled)) {
        if (world.hero.bomb) {
            world.hero.bomb.stop(logical);
        }

        world.hero.stop(logical);
        if (isTrue(logical)) {
            world.hero.music.pause();
        } else if (!isTrue()) {
            world.hero.music.play();
        }

        world.hpBar.stop(logical);
        world.energyBar.stop(logical);
        world.staminaBar.stop(logical);

        for (const [key] of Object.entries(world.level)) {
            let objectGroup = world.level[key];
            objectGroup.forEach((object) => {
                if (object.web) {
                    object.web.stop(logical);
                }
                if (object.magic) {
                    object.magic.stop(logical);
                }
                if (object.interval) {
                    object.stop(logical);
                }
            });
        }

        world.pauseSound(logical);
    }
}


function pauseThrowableObject(o, key, logical) {
    if (o[key]) {
        o[key].stop(logical);
    }
}


// jsdoc
function loadScore() {
    load('score');
    if (storableItems.score) {
        score = storableItems.score;
    }
}


// jsdoc
function loadVolume() {
    load('volume');
    if (storableItems.volume) {
        volume = storableItems.volume;
    }
}


// jsdoc
function load(key) {
    let valueAsText = localStorage.getItem(key);
    if (valueAsText) {
        storableItems[key] = JSON.parse(valueAsText);
    }
}


// jsdoc
function save(key) {
    let value = storableItems[key];
    let valueAsText = JSON.stringify(value);
    localStorage.setItem(key, valueAsText);
}




// jsdoc
function setClass(id, method, className) {
    document.getElementById(id).classList[method](className);
}


function checkOrientation() {
    let orientation = screen.orientation.type;
    if (isMatch(orientation, 'landscape-primary')) {
        console.log(orientation);
    } else if (isMatch(orientation, 'portrait-primary')) {
        console.log(orientation);
    }
}


// jsdoc
function isTimeout(timeout, time) {
    return timeout && isGreater(timeout, time);
}




// screen size not exactly (background gap!) ...
// white line below game screen (depends on phone size) ...
// buttons / touch events ...
// await loading of images (progress bar?) ...
// answers and questions ...