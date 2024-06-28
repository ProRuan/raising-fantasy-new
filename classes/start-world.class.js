class StartWorld extends World {
    interacted = false;
    title = { font: '80px Trade Winds', text: 'Raising Fantasy' };


    // jsdoc
    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartWorld();
        this.setMusic();
        this.draw();
    }


    // jsdoc
    setStartWorld() {
        this.setBackground();
        this.setTextButtons();
        this.setQuestRoll();
        this.setExtraButtons();
        this.setLeaderboard();
        this.setVolumeButtons();
    }


    // jsdoc
    setBackground() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);
    }


    // jsdoc
    getDrawableObject(source, x, y) {
        return new DrawableObject(source, x, y);
    }


    // jsdoc
    setTextButtons() {
        this.newGameButton = this.getTextButton('New Game', 340);
        this.questButton = this.getTextButton('Quest', 412);
        this.setCurrentButton('newGameButton');
    }


    // jsdoc
    setCurrentButton(key) {
        this.currentButton = this[key];
        this.currentButton.selected = true;
    }


    // jsdoc
    getTextButton(text, b) {
        let width = this.getTextWidth(text);
        let [x, y] = this.getTextCoord(width, 24, b);
        let textSource = this.getTextSource(text, width, 24);
        return new TextButton(textSource, x, y);
    }


    // jsdoc
    getTextWidth(text) {
        this.setText('24px Arial', 'left', 'black');
        let width = this.ctx.measureText(text).width;
        return Math.round(width);
    }


    // jsdoc
    getTextCoord(width, height, b) {
        let x = this.getCenteredCoord('width', width);
        let y = this.canvas.height - b - height;
        return [x, y];
    }


    // jsdoc
    getTextSource(text, width, height) {
        return { text: text, width: width, height: height };
    }


    // jsdoc
    setQuestRoll() {
        let [x, y] = this.getBgCoord('questRoll');
        this.questRoll = new QuestRoll(x, y);
        this.setCoinButton();
    }


    // jsdoc
    getBgCoord(key) {
        let x = this.getCenteredCoord('width', source[key].width);
        let y = this.getCenteredCoord('height', source[key].height);
        return [x, y];
    }


    // jsdoc
    setCoinButton() {
        let [x, y] = this.getObjectCoord('questRoll');
        this.coinButton = new CoinButton(x, y);
    }


    // jsdoc
    getObjectCoord(key) {
        let x = this[key].xRight;
        let y = this[key].yTop;
        return [x, y];
    }


    // jsdoc
    setExtraButtons() {
        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
    }


    // jsdoc
    setLeaderboard() {
        let [x, y] = this.getBgCoord('leaderboard');
        this.leaderboard = new Leaderboard(x, y);
        this.setXButton();
    }


    // jsdoc
    setXButton() {
        let [x, y] = this.getObjectCoord('leaderboard');
        this.xButton = new XButton(x, y);
    }


    // jsdoc
    setVolumeButtons() {
        let [x, y] = this.getVolBtnCoord();
        this.lowMusicButton = new LowMusicButton(x, y);
        this.highMusicButton = new HighMusicButton(x, y);
        this.lowSoundButton = new LowSoundButton(x, y);
        this.highSoundButton = new HighSoundButton(x, y);
    }


    // jsdoc
    getVolBtnCoord() {
        let x = this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2;
        let y = this.canvas.height - this.leaderboard.yTop;
        return [x, y];
    }


    // jsdoc
    setMusic() {
        this.sound = source.newWorld;
        this.music = new Audio(this.sound);
    }


    // jsdoc
    draw() {
        this.clearCanvas();
        this.setGlobalAlpha();
        this.applyKeyControl();
        this.drawMain();
        this.drawFlashText();
        this.drawLeaderboard();
        this.drawQuestRoll();
        this.redraw();
        this.startMusic();
        this.updateVolume();
    }


    // jsdoc
    applyKeyControl() {
        this.lockButton();
        this.selectButton();
    }


    // jsdoc
    lockButton() {
        if (this.isEnter()) {
            this.cleanLeaderboard();
            this.fillLeaderboard();
        }
    }


    // jsdoc
    isEnter() {
        let enter = isKey('enter');
        let unlocked = !isTrue(this.keyboard.enter.locked);
        let selected = isTrue(this.currentButton.selected);
        return enter && unlocked && selected;
    }


    // jsdoc
    cleanLeaderboard() {
        if (isMatch(this.currentButton, this.settingsButton)) {
            this.cupButton.locked = false;
        } else if (isMatch(this.currentButton, this.cupButton)) {
            this.settingsButton.locked = false;
        }
    }


    // jsdoc
    fillLeaderboard() {
        let locked = this.currentButton.locked;
        this.currentButton.locked = (!locked) ? true : false;
        keyboard.enter.locked = true;
    }


    // jsdoc
    selectButton() {
        this.selectNextButton('arrowUp', 'previous');
        this.selectNextButton('arrowDown', 'next');
    }


    // jsdoc
    selectNextButton(key, next) {
        if (isKey(key) && !isTrue(buttonSelected)) {
            let nextButton = world.currentButton[next];
            this.setNextButton(nextButton);
            buttonSelected = true;
        }
    }


    // jsdoc
    setNextButton(nextButton) {
        this.currentButton.selected = false;
        this.setCurrentButton(nextButton);
    }


    // jsdoc
    drawMain() {
        this.drawObject(this.background);
        this.drawTitle(this.title);
        this.drawMainButtons();
    }


    // jsdoc
    drawTitle(title) {
        let x = this.getCenteredCoord('width', 0);
        let y = this.getCenteredCoord('height', -16);
        this.setShadow('white', 16);
        this.setText(title.font, 'center', 'black');
        super.drawText(title.text, x, y);
        this.setShadow();
    }


    // jsdoc
    drawMainButtons() {
        if (this.interacted) {
            this.drawButton(this.newGameButton);
            this.drawButton(this.questButton);
            this.drawButton(this.cupButton);
            this.drawButton(this.settingsButton);
        }
    }


    // jsdoc
    drawButton(button) {
        if (button.isHighlighted()) {
            this.setButtonWithShadow(button);
        } else {
            this.setButton(button);
        }
    }


    // jsdoc
    setButtonWithShadow(button) {
        this.setShadow(button.shadowColor, button.shadowBlur);
        this.setButton(button);
        this.setShadow();
    }


    // jsdoc
    setButton(button) {
        (button.text) ? this.drawTextButton(button) : this.drawObject(button);
    }


    // jsdoc
    drawTextButton(button) {
        this.setText(button.font, button.textAlign, button.color);
        this.drawText(button.text, button.x, button.offsetY);
    }


    // jsdoc
    drawLeaderboard() {
        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButton(this.xButton);
            this.drawVolumeButtons();
            this.leaderboard.drawScore();
            this.leaderboard.drawVolume();
        }
    }


    // jsdoc
    drawVolumeButtons() {
        if (this.settingsButton.isLocked()) {
            this.drawButton(this.lowMusicButton);
            this.drawButton(this.highMusicButton);
            this.drawButton(this.lowSoundButton);
            this.drawButton(this.highSoundButton);
        }
    }


    // jsdoc
    drawQuestRoll() {
        if (this.questRoll.isOpened()) {
            this.drawObject(this.questRoll);
            this.drawButton(this.coinButton);
            this.questRoll.drawQuest();
        }
    }


    // jsdoc
    startMusic() {
        if (isUndefined(this.musicStarted) && isTrue(this.interacted)) {
            this.musicStarted = true;
            this.music.volume = volume.music / 10;
            this.music.play();
        }
    }


    // jsdoc
    updateVolume() {
        this.music.volume = volume.music / 10;
    }


    // jsdoc
    setReachable(key, value) {
        if (this.interacted) {
            this[key].reachable = value;
        }
    }


    // jsdoc
    drawFlashText() {
        let time = getTime();
        let ms = time % 1000;
        if (isGreater(ms, 500) && !isTrue(this.interacted)) {
            this.setText('28px Roboto', 'center', 'black');
            this.setFlashText();
        }
    }


    // jsdoc
    setFlashText() {
        let x = this.getCenteredCoord('width', 0);
        let y = this.getCenteredCoord('height', -252);
        this.drawText('Press any key', x, y);
    }
}