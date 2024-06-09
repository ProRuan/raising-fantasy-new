class StartWorld extends World {
    interacted = false;


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
        let x = canvas.width / 2 - width / 2;
        let y = canvas.height - b - height;
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
        let x = canvas.width / 2 - source[key].width / 2;
        let y = canvas.height / 2 - source[key].height / 2;
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
        let y = canvas.height - this.leaderboard.yTop;
        return [x, y];
    }


    // jsdoc
    setMusic() {
        this.sound = source.newWorld;
        this.music = new Audio(this.sound);
    }


    draw() {
        this.clearCanvas();
        this.ctx.globalAlpha = this.alpha;



        this.lockButton();
        this.selectButton();

        this.drawObject(this.background);

        this.drawGameTitle('80px Arial', 'Raising Fantasy');

        this.drawFlashText();

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
        this.startMusic();
        this.updateVolume();
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


    drawFlashText() {
        let time = getTime();
        let delta = time % 1000;
        if (delta < 500 && this.interacted == false) {
            this.setText('24px Arial', 'center', 'black');
            let x = canvas.width / 2;
            let a = 36;
            let y = canvas.height / 2 + 90 + a;
            this.drawText('Press any key', x, y);
        }
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