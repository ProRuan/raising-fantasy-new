class StartWorld extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        // this.setButtonCoordinates();
        this.setStartWorld();    // rename
        this.setCurrentButton('newGameButton');    // newGameButton!!!
        this.draw();
    }


    // setButtonCoordinates() {

    // }


    setStartWorld() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);

        this.newGameButton = this.getTextButton('New Game', 340);
        this.storyButton = this.getTextButton('Story', 412);

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


    getTextButton(text, b) {
        let width = this.getTextWidth(text);
        let [x, y] = this.getTextXY(width, 24, b);
        let textSource = this.getTextSource(text, width, 24);
        return new TextButton(textSource, x, y);
        // if (key == 'newGameButton') {
        //     this[key].selected = true;
        // }
    }


    setTextButton(text) {
        let width = this.getTextWidth(text);
        let [x, y] = this.getTextXY(width, 24, 340);
        this.newGameButton = new TextButton(text, x, y);
        // if (key == 'newGameButton') {
        //     this[key].selected = true;
        // }
    }


    // jsdoc
    getTextWidth(text) {
        this.setText('24px Arial', 'left', 'black');
        let width = this.ctx.measureText(text).width;

        console.log(Math.round(width));

        return Math.round(width);
    }


    // jsdoc
    getTextXY(width, height, b) {
        let x = canvas.width / 2 - width / 2;
        let y = canvas.height - b - height;
        return [x, y];
    }


    // jsdoc
    getTextSource(text, width, height) {
        return { text: text, width: width, height: height };
    }


    // jsdoc
    setExtraButtons() {
        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
    }


    // jsdoc
    setLeaderboard() {
        let x = canvas.width / 2 - source.leaderboard.width / 2;
        let y = canvas.height / 2 - source.leaderboard.height / 2;
        this.leaderboard = new Leaderboard(x, y);
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

        this.drawGameTitle('80px Arial', 'Raising Fantasy');

        this.drawTextButtonWidthShadow(this.newGameButton);
        this.drawTextButtonWidthShadow(this.storyButton);
        // this.setText(this.newGameButton.font, this.newGameButton.textAlign, this.newGameButton.color);
        // this.drawText(this.newGameButton.text, this.newGameButton.xCenter, this.newGameButton.yCenter + 10);

        this.drawButtonWithShadow('cupButton', 'yellow', 16);
        this.drawButtonWithShadow('settingsButton', 'yellow', 16);

        // this.settingsButton.locked = true;    // to delete!

        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButtonWithShadow('xButton', 'lightcyan', 16);


            this.leaderboard.drawScore();
            this.leaderboard.drawVolume();

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


    drawGameTitle(font, text) {
        this.setText(font, 'center', 'black');
        super.drawText(text, canvas.width / 2, canvas.height / 2 + 8);
    }


    drawTextButtonWidthShadow(button) {    // double code!?!
        if (button.isHighlighted()) {
            this.setShadow(button.shadowColor, button.shadowBlur);
            this.drawTextButton(button);
            this.setShadow();
        } else {
            this.drawTextButton(button);
        }
    }


    drawTextButton(button) {
        this.setText(button.font, button.textAlign, button.color);
        this.drawText(button.text, button.x, button.y + 20);

        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();


        // this.drawText('new game button', this.newGameButton.x, this.newGameButton.y);
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