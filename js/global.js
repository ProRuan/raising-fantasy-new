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
    drawableObjects.forEach((o) => {
        if (o.interval) {
            o.stop(logical);
            pauseThrowableObject(o, 'magic', logical);
            pauseThrowableObject(o, 'web', logical);
            pauseThrowableObject(o, 'bomb', logical);    // set pauseable interval for class Knight!
        }
    });
}


function pauseThrowableObject(o, key, logical) {
    if (o[key]) {
        o[key].stop(logical);
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