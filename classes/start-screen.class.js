class StartScreen extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartScreen();    // rename
        this.draw();
    }


    // to edit
    setStartScreen() {
        this.setDisplayed(true);
        this.setDrawableObject('background', 0, 0);
        this.setButton('cupButton', 32, 32);
        this.setDrawableObject('leaderboard', canvas.width / 2 - 191, canvas.height / 2 - 220.5);
        this.setXButton();
        this.setButton('settingsButton', canvas.width - 98, 32);    // own method?
        this.setArrowButton('lowMusicButton', 'arrowLeft', 25, 145.5);
        this.setArrowButton('highMusicButton', 'arrowRight', 125, 145.5);
        this.setArrowButton('lowSoundButton', 'arrowLeft', 25, 193.5);
        this.setArrowButton('highSoundButton', 'arrowRight', 125, 193.5);
        this.setDrawableObject('storyBg', canvas.width / 2 - 138, 540 - canvas.height / 2 - 166.5);
    }


    setDrawableObject(name, x, y) {
        this[name] = new DrawableObject(SOURCE.image[name], x, y);
    }


    setButton(name, x, y) {
        this[name] = new Button(SOURCE.image[name], x, y);
    }


    setXButton() {
        let x = this.leaderboard.xRight - 35;
        let y = canvas.height - this.leaderboard.yTop - 64;
        this.setButton('xButton', x, y);
    }


    setArrowButton(name, key, a, b) {
        let x = this.leaderboard.xLeft + this.leaderboard.width / 2 + a;
        let y = canvas.height - this.leaderboard.yTop - b;
        this[name] = new Button(SOURCE.image[key], x, y);
        this[name].indent = - 4;
    }


    draw() {
        this.clearCanvas();

        if (this.isDisplayed()) {
            this.drawObject(this.background);
            this.drawMainText('80px Arial', 'Raising Fantasy', canvas.height / 2);
            this.drawMainText('24px Arial', 'New game', canvas.height / 4 * 3 - 36);
            this.drawMainText('24px Arial', 'Story', canvas.height / 4 * 3 + 36);
            this.drawExtraButton(this.cupButton);
            this.drawExtraButton(this.settingsButton);
            this.drawLeaderboard();
            this.drawHighScore();
            this.drawSettingsButtons();
            this.drawSettingsText();


            this.newGameButton = {
                'xLeft': this.canvas.width / 2 - 64,
                'xRight': this.canvas.width / 2 + 64,
                'yTop': 344,
                'yBottom': 80
            }


            this.storyButton = {
                'xLeft': this.canvas.width / 2 - 64,
                'xRight': this.canvas.width / 2 + 64,
                'yTop': 416,
                'yBottom': 452
            }


            this.ctx.beginPath();
            this.ctx.lineWidth = '1';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(canvas.width / 2 - 64, 344, 128, 36);
            this.ctx.rect(canvas.width / 2 - 64, 344 + 72, 132, 36);
            this.ctx.stroke();


            // this.drawObject(this.storyBg);
            // this.setFontTextAlign('bold 28px Arial', 'center');
            // super.drawText('Story', this.storyBg.x + this.storyBg.width / 2, 160);
            // this.setFontTextAlign('20px Arial', 'left');
            // super.drawText('Play as a knight and', this.storyBg.x + 40, 208);
            // super.drawText('explore a new world.', this.storyBg.x + 40, 238);

            // this.setFont('bold 20px Arial');
            // super.drawText('Quests', this.storyBg.x + 40, 298);
            // this.setFont('20px Arial');
            // super.drawText('1. Collect all coins.', this.storyBg.x + 40, 333);
            // super.drawText('2. Collect all leaves.', this.storyBg.x + 40, 363);
            // super.drawText('3. Defeat the endboss.', this.storyBg.x + 40, 393);
        }

        this.redraw();
    }


    drawMainText(font, text, y) {
        this.setFont(font);
        this.setTextAlign('center');
        super.drawText(text, canvas.width / 2, y);
    }


    drawExtraButton(button) {
        this.drawButtonShadow(button, 'yellow', 16);
        this.drawObject(button);
        this.drawButtonShadow(button);
    }


    drawButtonShadow(button, color, blur) {
        if (button.isActivated()) {
            this.setShadow(color, blur);
        }
    }


    drawLeaderboard() {
        if (this.isLeaderboardOpened()) {
            this.drawObject(this.leaderboard);
            this.drawExtraButton(this.xButton);
        }
    }


    isLeaderboardOpened() {
        return this.cupButton.isLocked() || this.settingsButton.isLocked();
    }


    drawHighScore() {
        if (this.isHighScoreOpened()) {
            this.drawHeadline('gold', 'Best Result', 96);
            this.drawResult('best', 144);
            this.drawHeadline('white', 'Last Result', 272);
            this.drawResult('last', 320);
            this.setFillStyle();
        }
    }


    isHighScoreOpened() {
        return this.cupButton.isLocked();
    }


    drawHeadline(color, text, y) {
        this.setFontTextAlign('28px Arial', 'center');
        this.setFillStyle(color);
        this.setHeadline(text, y);
    }


    setHeadline(text, b) {
        let x = this.leaderboard.xLeft + this.leaderboard.width / 2;
        let y = this.leaderboard.yTop + b;
        super.drawText(text, x, y);
    }


    drawResult(key, y) {
        this.setFont('20px Arial');
        this.drawResultText('Coins:', y, result[key].coins + ' / 20');
        this.drawResultText('Leaves:', y + 36, result[key].leaves + ' / 18');
        this.drawResultText('Time:', y + 72, result[key].time);
    }


    drawResultText(name, y, result) {
        this.setTextAlign('left');
        this.drawText(name, 64, y);    // rename!!!
        this.setTextAlign('center');
        this.drawText(result, 80 + this.leaderboard.width / 2, y);
    }


    drawSettingsButtons() {
        if (this.AreSettingsOpened()) {
            let keys = ['x', 'lowMusic', 'highMusic', 'lowSound', 'highSound'];
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i] + 'Button';
                this.drawExtraButton(this[key]);
            }
        }
    }


    drawSettingsText() {
        if (this.AreSettingsOpened()) {
            this.setFontTextAlign('28px Arial', 'center');
            this.drawHeadline('white', 'Volume', 96);
            this.drawVolumeText('Music', 144, music);
            this.drawVolumeText('Sound', 192, sound);
            this.setFillStyle();
        }
    }


    AreSettingsOpened() {
        return this.settingsButton.isLocked();
    }


    drawVolumeText(text, y, type) {
        this.setFontTextAlign('20px Arial', 'left');
        this.drawText(text, 64, y);
        this.setTextAlign('center');
        this.drawText(`${type}`, 80 + this.leaderboard.width / 2, y);
    }


    drawText(text, a, b) {
        let x = this.leaderboard.xLeft + a;
        let y = this.leaderboard.yTop + b;
        super.drawText(text, x, y);
    }
}