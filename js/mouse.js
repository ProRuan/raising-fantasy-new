function processMouseMove(event) {

}


// Please sort the subsequent functions + rename!!!
function processMouseDown(event) {
    if (event && currentWorld == 'start') {
        closeLeaderboard(event);
        openLeaderboard(event, 'cupButton');
        openLeaderboard(event, 'settingsButton');
    }
}


function closeLeaderboard(event) {
    if (isMouseEvent(event, world.xButton) && world.xButton.reachable) {
        world.xButton.locked = true;
        console.log('xButton');
    }
}


// jsdoc
function openLeaderboard(event, key) {
    if (isNotLeaderBoard(event, key)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, true)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, false)) {
        world[key].locked = true;
    }
}


// jsdoc
function isNotLeaderBoard(event, key) {
    return !isMouseEvent(event, world[key]) && !isMouseEvent(event, world.leaderboard);
}


// jsdoc
function isButtonLocked(event, key, logical) {
    if (logical) {
        return isMouseEvent(event, world[key]) && world[key].isLocked();
    } else {
        return isMouseEvent(event, world[key]) && !world[key].isLocked();
    }
}


function processMouseUp() {
    if (currentWorld == 'start') {

    }
}