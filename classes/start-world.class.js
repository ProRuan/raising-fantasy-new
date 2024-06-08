class StartWorld extends World {
    alpha = 1;
    sound = source.newWorld;
    // newGameSound
    // swordSound (selection)

    // set button triggers ...
    // set button mouse events ...
    // set button key events and key sequences ...
    // set sound ...

    // set questRoll and leaderboard interval (or stop interval)...
    // move transit method ...


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        // this.setButtonCoordinates();
        this.setStartWorld();    // rename
        this.setCurrentButton('newGameButton');    // newGameButton!!!
        // { currentButton: cb, keySelection: logical }
        this.draw();
    }


    // setButtonCoordinates() {

    // }


    setStartWorld() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);

        this.newGameButton = this.getTextButton('New Game', 340);
        this.questButton = this.getTextButton('Quest', 412);

        this.setExtraButtons();

        this.sestQuestRoll();

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


    // jsdoc
    getTextWidth(text) {
        this.setText('24px Arial', 'left', 'black');
        let width = this.ctx.measureText(text).width;
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


    sestQuestRoll() {
        let [x, y] = this.getBgCoord('questRoll');
        this.questRoll = new QuestRoll(x, y);

        this.coinButton = new CoinButton(this.questRoll.xRight, this.questRoll.yTop);
    }


    // jsdoc
    getBgCoord(key) {
        let x = canvas.width / 2 - source[key].width / 2;
        let y = canvas.height / 2 - source[key].height / 2;
        return [x, y];
    }


    // jsdoc
    setExtraButtons() {
        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
    }


    setLeaderboard() {
        let [x, y] = this.getBgCoord('leaderboard');
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
        this.ctx.globalAlpha = this.alpha;

        this.lockButton();
        this.selectButton();

        this.drawObject(this.background);

        this.drawGameTitle('80px Arial', 'Raising Fantasy');

        this.drawTextButtonWidthShadow(this.newGameButton);
        this.drawTextButtonWidthShadow(this.questButton);
        // this.setText(this.newGameButton.font, this.newGameButton.textAlign, this.newGameButton.color);
        // this.drawText(this.newGameButton.text, this.newGameButton.xCenter, this.newGameButton.yCenter + 10);

        this.drawButtonWithShadow('cupButton', 'yellow', 16);
        this.drawButtonWithShadow('settingsButton', 'yellow', 16);

        // this.questButton.locked = true;    // to delete!

        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButtonWithShadow('xButton', 'lightcyan', 16);

            this.leaderboard.drawScore();
            this.leaderboard.drawVolume();

            this.drawVolumeButtons();
        } else if (this.questRoll.isOpened()) {    // set if rang and values!!!
            this.drawObject(this.questRoll);
            this.drawButtonWithShadow('coinButton', 'olive', 16);    // set values!

            this.questRoll.drawQuest();
        }


        // only for testing!!!
        // this.drawButtonFrame(this.questRoll);

        this.redraw();
    }


    // jsdoc
    setReachable(key, value) {
        this[key].reachable = value;
    }


    lockButton() {
        if (isKey('enter') && keyboard.enter.locked != true && this.currentButton.selected) {
            let locked = this.currentButton.locked;
            this.currentButton.locked = (!locked) ? true : false;     // two different leaderboards / leaderboard.isOpened() !?!
            keyboard.enter.locked = true;
            if (this.currentButton == this.settingsButton) {
                this.cupButton.locked = false;
            } else if (this.currentButton == this.cupButton) {
                this.settingsButton.locked = false;
            }
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


    showIntervalId() {
        intervalIds.forEach((id) => {
            console.log(id);
        })
        // for (const [key] of Object.entries(this)) {
        //     if (this[key] instanceof Button && key != 'currentButton') {
        //         console.log(key, this[key].id);
        //     }
        // }
        return 'stopped buttons';
    }


    drawButtonFrame(button) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();
    }
}