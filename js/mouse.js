function processMouseMove(event) {
    hovered = false;
    if (event && currentWorld == 'start') {
        hover(event, 'xButton');
        hover(event, 'lowMusicButton');
        hover(event, 'highMusicButton');
        hover(event, 'lowSoundButton');
        hover(event, 'highSoundButton');
        hover(event, 'coinButton');
        hover(event, 'cupButton');
        hover(event, 'settingsButton');
        hover(event, 'questButton');
        hover(event, 'newGameButton');
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
        setVolume(event, 'lowMusicButton');
        setVolume(event, 'highMusicButton');
        setVolume(event, 'lowSoundButton');
        setVolume(event, 'highSoundButton');
        openLeaderboard(event, 'cupButton');
        openLeaderboard(event, 'settingsButton');

        closeQuestRoll(event);
        openQuestRoll(event, 'questButton');
        startNewGame(event);
    }
}


function closeLeaderboard(event) {
    if (isMouseEvent(event, world.xButton) && world.xButton.reachable) {
        world.xButton.locked = true;
        console.log('xButton');
    }
}


function setVolume(event, key) {
    if (isMouseEvent(event, world[key]) && world[key].reachable) {
        world[key].locked = true;
        console.log(world[key]);
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


function closeQuestRoll(event) {    // double code?
    if (isMouseEvent(event, world.coinButton) && world.coinButton.reachable) {
        world.coinButton.locked = true;
        console.log('coinButton');
    }
}


function openQuestRoll(event, key) {    // double code?
    if (isNotQuestRoll(event, key)) {
        world[key].locked = false;
    } else if (isButtonLocked(event, key, false)) {
        world[key].locked = true;
    }
}


function isNotQuestRoll(event, key) {    // double code?
    return !isMouseEvent(event, world[key]) && !isMouseEvent(event, world.questRoll);
}


function startNewGame(event) {
    if (isMouseEvent(event, world.newGameButton)) {
        world.newGameButton.locked = true;
    }
}


function processMouseUp() {
    if (currentWorld == 'start') {

    }
}