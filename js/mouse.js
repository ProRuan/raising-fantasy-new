function processMouseMove(event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        hover(event, button);
    }
}


function hover(event, name) {
    if (startScreen.displayed) {
        let targeted = (isMouseEvent(event, startScreen[name])) ? true : false;
        if (startScreen[name].isReachable()) {
            setstartScreenButtonValue(name, 'targeted', targeted);
        }
        updateCursor(event);
    }
}


function setstartScreenButtonValue(name, key, value) {
    startScreen[name][key] = value;
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
        if (startScreen[button].isReachable() && isMouseEvent(event, startScreen[button])) {
            return true;
        }
    }
}


function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Please sort the subsequent functions + rename!!!
function processMouseDown(event) {
    if (startScreen.displayed) {
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
}


function closeStoryBg(event) {
    if (isStoryBgToClose(event)) {
        setstartScreenButtonValue('storyButton', 'locked', false);
    }
}


function clickExtraButton(event, name) {
    if (isMouseEvent(event, startScreen[name])) {
        setstartScreenButtonValue(name, 'locked', true);
    } else if (isLeaderBoardToClose(event)) {
        setstartScreenButtonValue(name, 'locked', false);
    }
}


function isStoryBgToClose(event) {
    return !isMouseEvent(event, startScreen.storyBg) && startScreen.storyButton.isLocked() || isMouseEvent(event, startScreen.storyBg) && isMouseEvent(event, startScreen.coinButton);
}


// cupButton or settingsButton must be locked (condition)!!!
function isLeaderBoardToClose(event) {
    return !isMouseEvent(event, startScreen.leaderboard) || isMouseEvent(event, startScreen.leaderboard) && isMouseEvent(event, startScreen.xButton);
}


function clickArrowButton(event, name) {
    updateVolume(event, name);
}


function updateVolume(event, name) {
    if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'lowMusicButton') && isLarger(0, music)) {
        music--;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'highMusicButton') && isLarger(music, 9)) {
        music++;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'lowSoundButton') && isLarger(0, sound)) {
        sound--;
    } else if (isMouseEvent(event, startScreen[name]) && isMatch(name, 'highSoundButton') && isLarger(sound, 9)) {
        sound++;
    }
}


function processMouseUp() {
    mouseClick = null;
}