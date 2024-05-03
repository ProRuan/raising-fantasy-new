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


    }


    setDrawableObject(name, x, y) {
        this[name] = new DrawableObject(SOURCE.image[name], x, y);
    }


    setButton(name, x, y) {
        this[name] = new Button(SOURCE.image[name], x, y);
    }


    setXButton() {
        let x = this.leaderboard.xRight - 35;
        let y = 540 - this.leaderboard.yTop - 64;
        this.setButton('xButton', x, y);
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
            this.drawXButton();
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
        }
    }


    isLeaderboardOpened() {
        return this.cupButton.isLocked() || this.settingsButton.isLocked();
    }


    drawXButton() {
        if (this.isLeaderboardOpened()) {
            this.drawExtraButton(this.xButton);
        }
    }


    drawSettingsText() {
        this.setFont('28px Arial');
        this.setTextAlign('center');
        this.setFillStyle('white');

        this.cupButton.locked = true;    // Please delete!!!

        this.setTextVolume();    // rename
        this.drawMusicText();
        this.setTextSound();    // rename

        this.setFillStyle();
    }


    setTextVolume() {
        let x = this.leaderboard.xLeft + this.leaderboard.width / 2;
        let y = this.leaderboard.yTop + 96;
        this.drawText('Volume', x, y);
    }


    drawMusicText() {
        this.setFont('20px Arial');
        this.setTextAlign('left');
        this.drawVolumeText('Music', 64, 144);
        this.drawVolumeText('4', 64 + this.leaderboard.width / 2, 144);
        this.drawVolumeText('Sound', 64, 192);
        this.drawVolumeText('7', 64 + this.leaderboard.width / 2, 192);
    }


    drawVolumeText(text, a, b) {
        let x = this.leaderboard.xLeft + a;
        let y = this.leaderboard.yTop + b;
        this.drawText(text, x, y);
    }


    setTextSound() {

    }
}