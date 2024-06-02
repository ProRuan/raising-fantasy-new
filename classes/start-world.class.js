class StartWorld extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        // this.setButtonCoordinates();
        this.setStartWorld();    // rename
        this.setCurrentButton('cupButton');    // newGameButton!!!
        this.draw();
    }


    // setButtonCoordinates() {

    // }


    setStartWorld() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);

        // this.setMainButton('newGameButton', 68, 340);    // to add!!!
        // this.setMainButton('storyButton', 40, 412);    // to add!!!

        this.setExtraButtons();
        // this.storyBg = this.getDrawableObject(source.storyBg, canvas.width / 2 - 138, 540 - canvas.height / 2 - 166.5);
        // this.coinButton = this.getButton(source.coinButton, this.storyBg.xRight - 48, 540 - this.storyBg.yTop - 48);

        this.setLeaderboard();
        this.setVolumeButtons();
    }


    // jsdoc
    getDrawableObject(source, x, y) {
        return new DrawableObject(source, x, y);
    }


    // jsdoc
    setExtraButtons() {
        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
    }


    // jsdoc
    setLeaderboard() {
        this.leaderboard = new Leaderboard(this.ctx);
        this.xButton = new XButton(this.leaderboard.xRight, this.leaderboard.yTop);
    }


    // jsdoc
    setVolumeButtons() {
        this.setVolBtnCoord();
        this.lowMusicButton = new LowMusicButton(this.volBtnX, this.volBtnY);
        this.highMusicButton = new HighMusicButton(this.volBtnX, this.volBtnY);
        this.lowSoundButton = new LowSoundButton(this.volBtnX, this.volBtnY);
        this.highSoundButton = new HighSoundButton(this.volBtnX, this.volBtnY);
    }


    // jsdoc
    setVolBtnCoord() {
        this.volBtnX = this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2;
        this.volBtnY = canvas.height - this.leaderboard.yTop;
    }


    // jsdoc
    setCurrentButton(key) {
        this.currentButton = this[key];
        this.currentButton.selected = true;
    }


    draw() {
        this.clearCanvas();

        this.lockButton();
        this.selectButton();

        this.drawObject(this.background);
        this.drawButtonWithShadow('cupButton', 'yellow', 16);
        this.drawButtonWithShadow('settingsButton', 'yellow', 16);
        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButtonWithShadow('xButton', 'lightcyan', 16);
            this.drawVolumeButtons();
        }


        // only for testing!!!
        this.drawButtonFrame(this.cupButton);

        this.redraw();
    }


    lockButton() {
        if (isKey('enter') && keyboard.enter.locked != true && this.currentButton.selected) {
            let locked = this.currentButton.locked;
            this.currentButton.locked = (!locked) ? true : false;     // two different leaderboards / leaderboard.isOpened() !?!
            keyboard.enter.locked = true;
        }
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
        world.currentButton.selected = false;
        world.currentButton = world[nextButton];
        world.currentButton.selected = true;
    }


    // jsdoc
    drawButtonWithShadow(key, color, blur) {
        if (this[key].isHighlighted()) {
            this.setShadow(color, blur);
            this.drawObject(this[key]);
            this.setShadow();
        } else {
            this.drawObject(this[key]);
        }
    }


    // jsdoc
    drawVolumeButtons() {
        if (this.settingsButton.isLocked()) {
            this.drawButtonWithShadow('lowMusicButton', 'white', 16);
            this.drawButtonWithShadow('highMusicButton', 'white', 16);
            this.drawButtonWithShadow('lowSoundButton', 'white', 16);
            this.drawButtonWithShadow('highSoundButton', 'white', 16);
        }
    }


    drawButtonFrame(button) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();
    }
}