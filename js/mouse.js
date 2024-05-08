function processMouseMove(event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        hover(event, button);
    }
}


function hover(event, name) {
    let targeted = (isMouseEvent(event, world[name])) ? true : false;
    if (world[name].isReachable()) {
        setstartWorldButtonValue(name, 'targeted', targeted);
    }
    updateCursor(event);
}


function setstartWorldButtonValue(name, key, value) {
    world[name][key] = value;
}


function updateCursor(event) {
    pointer = getPointer(event);
    (pointer) ? setCursor('pointer') : setCursor('default');
}


function getPointer(event) {
    return (isBottonTargeted(event)) ? true : false;
}


function isBottonTargeted(event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        if (world[button].isReachable() && isMouseEvent(event, world[button])) {
            return true;
        }
    }
}


function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Please sort the subsequent functions + rename!!!
function processMouseDown(event) {
    clickArrowButton(event, 'lowMusicButton');
    clickArrowButton(event, 'highMusicButton');
    clickArrowButton(event, 'lowSoundButton');
    clickArrowButton(event, 'highSoundButton');
    closeStoryBg(event);
    clickExtraButton(event, 'cupButton');
    clickExtraButton(event, 'settingsButton');
    clickExtraButton(event, 'storyButton');
    // newGameButton still missing ...
}


function closeStoryBg(event) {
    if (isStoryBgToClose(event)) {
        setstartWorldButtonValue('storyButton', 'locked', false);

        world[mainButtons[mainButtonCounter]].selected = false;
        mainButtonCounter = 1;
        world[mainButtons[mainButtonCounter]].selected = true;
    }
}


function clickExtraButton(event, name) {
    if (isMouseEvent(event, world[name])) {
        setstartWorldButtonValue(name, 'locked', true);
        // setstartWorldButtonValue(name, 'selected', true);
    } else if (isLeaderBoardToClose(event)) {
        setstartWorldButtonValue(name, 'locked', false);
        // setstartWorldButtonValue(name, 'selected', false);

        // double code!!!
        world[volumeButtons[volumeButtonsId]].selected = false;
        volumeButtonsId = 0;
        musicButtons = true;
    }
}


function isStoryBgToClose(event) {
    return !isMouseEvent(event, world.storyBg) && world.storyButton.isLocked() || isMouseEvent(event, world.storyBg) && isMouseEvent(event, world.coinButton);
}


// cupButton or settingsButton must be locked (condition)!!!
function isLeaderBoardToClose(event) {
    return !isMouseEvent(event, world.leaderboard) || isMouseEvent(event, world.leaderboard) && isMouseEvent(event, world.xButton);
}


function clickArrowButton(event, name) {
    updateVolume(event, name);
}


function updateVolume(event, name) {
    if (isMouseEvent(event, world[name]) && isMatch(name, 'lowMusicButton') && isLarger(0, music)) {
        music--;
    } else if (isMouseEvent(event, world[name]) && isMatch(name, 'highMusicButton') && isLarger(music, 9)) {
        music++;
    } else if (isMouseEvent(event, world[name]) && isMatch(name, 'lowSoundButton') && isLarger(0, sound)) {
        sound--;
    } else if (isMouseEvent(event, world[name]) && isMatch(name, 'highSoundButton') && isLarger(sound, 9)) {
        sound++;
    }
}


function processMouseUp() {
    mouseClick = null;
}