class StartWorld extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartWorld();    // rename
        this.setCurrentButton('cupButton');    // newGameButton!!!
        this.draw();
    }


    setStartWorld() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);

        // this.setMainButton('newGameButton', 68, 340);    // to add!!!
        // this.setMainButton('storyButton', 40, 412);    // to add!!!

        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
        // this.storyBg = this.getDrawableObject(source.storyBg, canvas.width / 2 - 138, 540 - canvas.height / 2 - 166.5);
        // this.coinButton = this.getButton(source.coinButton, this.storyBg.xRight - 48, 540 - this.storyBg.yTop - 48);
        this.leaderboard = new Leaderboard(this.ctx);
        this.xButton = new XButton(this.leaderboard);
        this.lowMusicButton = new LowMusicButton(this.leaderboard);
        this.highMusicButton = new HighMusicButton(this.leaderboard);
        this.lowSoundButton = new LowSoundButton(this.leaderboard);
        this.highSoundButton = new HighSoundButton(this.leaderboard);
        // this.lowMusicButton = this.getButton(source.arrowLeft, this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2 + 25, 540 - this.leaderboard.yTop - 145.5);
        // this.highMusicButton = this.getButton(source.arrowRight, this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2 + 125, 540 - this.leaderboard.yTop - 145.5);
        // this.lowSoundButton = this.getButton(source.arrowLeft, this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2 + 25, 540 - this.leaderboard.yTop - 193.5);
        // this.highSoundButton = this.getButton(source.arrowRight, this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2 + 125, 540 - this.leaderboard.yTop - 193.5);
    }


    // jsdoc
    getDrawableObject(source, x, y) {
        return new DrawableObject(source, x, y);
    }


    // jsdoc
    getButton(source, x, y) {
        return new Button(source, x, y);
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
        if (this.leaderboard.isOpened()) {    // I. show high score or volume ...
            this.drawObject(this.leaderboard);
            this.drawButtonWithShadow('xButton', 'lightcyan', 16);

            // II. set button classes!!!
            this.drawButtonWithShadow('lowMusicButton', 'white', 16);
            this.drawButtonWithShadow('highMusicButton', 'white', 16);
            this.drawButtonWithShadow('lowSoundButton', 'white', 16);
            this.drawButtonWithShadow('highSoundButton', 'white', 16);
        }


        // only for testing!!!
        this.drawButtonFrame(this.cupButton);

        this.redraw();
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


    lockButton() {
        if (isKey('enter') && keyboard.enter.locked != true && this.currentButton.selected) {
            let locked = this.currentButton.locked;
            this.currentButton.locked = (!locked) ? true : false;     // two different leaderboards / leaderboard.isOpened() !?!
            keyboard.enter.locked = true;
        }
    }


    // jsdoc
    selectButton() {
        this.selectNextButton('arrowLeft', 'previous');
        this.selectNextButton('arrowUp', 'previous');
        this.selectNextButton('arrowRight', 'next');
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


    drawButtonFrame(button) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();
    }
}