// jsdoc
function isTimeout(timeout, time) {
    return timeout && isGreater(timeout, time);
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
function formatInitial(word, method) {
    let initial = word[0];
    return word.replace(initial, initial[method]());
}


// jsdoc
function isMatch(a, b) {
    return a == b;
}


// jsdoc
function getTime() {
    return new Date().getTime();
}


// jsdoc
function pauseGame(logical) {
    if (!isTrue(pauseDisabled)) {
        pauseHero(logical);
        pauseStateBars(logical);
        pauseLevelComponents(logical);
        world.pauseSound(logical);
    }
}


// jsdoc
function pauseHero(logical) {
    let hero = world.hero;
    pauseLevelObject(hero, 'bomb', logical);
    pauseLevelObject(hero, 'interval', logical);
}


// jsdoc
function pauseLevelObject(object, key, logical) {
    if (isMatch(key, 'interval') && object[key]) {
        object.stop(logical);
    } else if (object[key]) {
        object[key].stop(logical);
    }
}


// jsdoc
function pauseStateBars(logical) {
    let keys = ['hpBar', 'energyBar', 'staminaBar'];
    keys.forEach((key) => {
        let stateBar = world[key];
        pauseLevelObject(stateBar, 'interval', logical);
    });
}


// jsdoc
function pauseLevelComponents(logical) {
    for (const [key] of Object.entries(world.level)) {
        let objectGroup = world.level[key];
        objectGroup.forEach((object) => {
            pauseLevelObject(object, 'magic', logical);
            pauseLevelObject(object, 'web', logical);
            pauseLevelObject(object, 'interval', logical);
        });
    }
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




// screen size not exactly (background gap!) ...
// white line below game screen (depends on phone size) ...
// buttons / touch events ...
// await loading of images (progress bar?) ...
// answers and questions ...