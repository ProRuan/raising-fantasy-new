function processMouseMove(event) {
    hovered = false;
    if (event && currentWorld == 'start') {
        hover(event, 'xButton');
        hover(event, 'cupButton');
        hover(event, 'settingsButton');
    }
    if (!isTrue(hovered)) {
        setCursor('initial');
    }
}


function hover(event, key) {
    if (isMouseEvent(event, world[key])) {
        world[key].targeted = true;
        if (!isTrue(hovered)) {
            hovered = true;
        }
    } else {
        world[key].targeted = false;
    }
}


function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Please sort the subsequent functions + rename!!!
function processMouseDown(event) {
    if (event && currentWorld == 'start') {
        world.currentButton.selected = false;

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