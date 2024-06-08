let intervalIds = [];    // necessary?


// jsdoc
function setStoppableInterval(subfunction, interval) {
    let id = setInterval(subfunction, interval);
    intervalIds.push(id);
}


// jsdoc
function stopIntervals() {
    intervalIds.forEach((id) => {
        clearInterval(id);
    });
}


// to delete later?




// on testing ...

let drawableObjects = [];

function pauseGame(logical) {
    clearInterval(world.hero.moveId);
    clearInterval(world.hero.playId);
    drawableObjects.forEach((o) => {
        if (o.interval) {
            pauseThrowableObject(o, 'magic', logical);
            pauseThrowableObject(o, 'web', logical);
            pauseThrowableObject(o, 'bomb', logical);    // set pauseable interval for class Knight!
            o.stop(logical);
        }
    });
}


function pauseThrowableObject(o, key, logical) {
    if (o[key]) {
        o[key].stop(logical);
        console.log('stopped throwable item: ', o[key]);
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