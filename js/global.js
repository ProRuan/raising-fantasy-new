let intervalIds = [];


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
        }
    });
}