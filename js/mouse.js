function processMouseMove(event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] + 'Button';
        hover(event, button);
    }
}


function hover(event, name) {
    if (screen.displayed) {
        let targeted = (isMouseEvent(event, screen[name])) ? true : false;
        if (screen[name].isReachable()) {
            setstartScreenButtonValue(name, 'targeted', targeted);
        }
        updateCursor(event);
    }
}


function setstartScreenButtonValue(name, key, value) {
    screen[name][key] = value;
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
        if (screen[button].isReachable() && isMouseEvent(event, screen[button])) {
            return true;
        }
    }
}


function setCursor(value) {
    document.getElementById('canvas').style.cursor = value;
}


// Please sort the subsequent functions + rename!!!
function processMouseDown(event) {
    if (screen.displayed) {
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

        screen[mainButtons[mainButtonCounter]].selected = false;
        mainButtonCounter = 1;
        screen[mainButtons[mainButtonCounter]].selected = true;
    }
}


function clickExtraButton(event, name) {
    if (isMouseEvent(event, screen[name])) {
        setstartScreenButtonValue(name, 'locked', true);
        // setstartScreenButtonValue(name, 'selected', true);
    } else if (isLeaderBoardToClose(event)) {
        setstartScreenButtonValue(name, 'locked', false);
        // setstartScreenButtonValue(name, 'selected', false);

        // double code!!!
        screen[volumeButtons[volumeButtonsId]].selected = false;
        volumeButtonsId = 0;
        musicButtons = true;
    }
}


function isStoryBgToClose(event) {
    return !isMouseEvent(event, screen.storyBg) && screen.storyButton.isLocked() || isMouseEvent(event, screen.storyBg) && isMouseEvent(event, screen.coinButton);
}


// cupButton or settingsButton must be locked (condition)!!!
function isLeaderBoardToClose(event) {
    return !isMouseEvent(event, screen.leaderboard) || isMouseEvent(event, screen.leaderboard) && isMouseEvent(event, screen.xButton);
}


function clickArrowButton(event, name) {
    updateVolume(event, name);
}


function updateVolume(event, name) {
    if (isMouseEvent(event, screen[name]) && isMatch(name, 'lowMusicButton') && isLarger(0, music)) {
        music--;
    } else if (isMouseEvent(event, screen[name]) && isMatch(name, 'highMusicButton') && isLarger(music, 9)) {
        music++;
    } else if (isMouseEvent(event, screen[name]) && isMatch(name, 'lowSoundButton') && isLarger(0, sound)) {
        sound--;
    } else if (isMouseEvent(event, screen[name]) && isMatch(name, 'highSoundButton') && isLarger(sound, 9)) {
        sound++;
    }
}


function processMouseUp() {
    if (screen.displayed) {
        mouseClick = null;
    }
}