class StartScreen extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartScreen();    // rename
        this.draw();
    }


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
            this.drawHeadline();
            this.drawNewGameButton();
            this.drawStoryButton();
            this.drawExtraButton(this.cupButton);
            this.drawExtraButton(this.settingsButton);
            this.drawLeaderboard();
            this.drawHighScore();
            this.drawSettingsButtons();
            this.drawSettingsText();
        }

        this.redraw();
    }


    drawHeadline() {
        this.setFont('80px Arial');
        this.setTextAlign('center');
        this.drawText('Raising Fantasy', canvas.width / 2, canvas.height / 2);
    }


    drawNewGameButton() {
        this.setFont('24px Arial');
        this.setTextAlign('center');
        this.drawText('New game', canvas.width / 2, canvas.height / 4 * 3 - 36);
    }


    drawStoryButton() {
        this.setFont('24px Arial');
        this.setTextAlign('center');
        this.drawText('Story', canvas.width / 2, canvas.height / 4 * 3 + 36);
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
            this.drawLeaderboardHeadline('gold', 'Best Result', 96);
            this.drawResult('best', 144);
            this.drawLeaderboardHeadline('white', 'Last Result', 272);
            this.drawResult('last', 320);
            this.setFillStyle();
        }
    }


    isHighScoreOpened() {
        return this.cupButton.isLocked();
    }


    drawLeaderboardHeadline(color, text, y) {
        this.setFontTextAlign('28px Arial', 'center');
        this.setFillStyle(color);
        this.setLeaderboardHeadline(text, y);
    }


    setLeaderboardHeadline(text, b) {
        let x = this.leaderboard.xLeft + this.leaderboard.width / 2;
        let y = this.leaderboard.yTop + b;
        this.drawText(text, x, y);
    }


    // to edit
    drawResult(key, y) {
        this.setFont('20px Arial');
        this.drawHighScoreText('Coins:', y, result[key].coins);
        this.drawHighScoreText('Leaves:', y + 36, result[key].leaves);
        this.drawHighScoreText('Time:', y + 72, result[key].time);    // to edit
    }


    drawHighScoreText(name, y, result) {
        this.setTextAlign('left');
        this.drawLeaderboardText(name, 64, y);
        this.setTextAlign('center');

        // to edit (var one method up)
        // mouse cursor:pointer
        this.drawLeaderboardText(`${result} / 20`, 80 + this.leaderboard.width / 2, y);
    }


    drawSettingsButtons() {
        if (this.AreSettingsOpened()) {
            this.drawExtraButton(this.xButton);
            this.drawExtraButton(this.lowMusicButton);
            this.drawExtraButton(this.highMusicButton);
            this.drawExtraButton(this.lowSoundButton);
            this.drawExtraButton(this.highSoundButton);
        }
    }


    drawSettingsText() {
        if (this.AreSettingsOpened()) {
            this.setFontTextAlign('28px Arial', 'center');
            this.drawLeaderboardHeadline('white', 'Volume', 96);
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
        this.drawLeaderboardText(text, 64, y);
        this.setTextAlign('center');
        this.drawLeaderboardText(`${type}`, 80 + this.leaderboard.width / 2, y);
    }


    drawLeaderboardText(text, a, b) {
        let x = this.leaderboard.xLeft + a;
        let y = this.leaderboard.yTop + b;
        this.drawText(text, x, y);
    }
}