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


    // drawStory() {
    //     if (this.isStoryOpened()) {
    //         this.drawObject(this.story);
    //     }
    // }


    // isStoryOpened() {
    //     return this.storyButton.isLocked();
    // }
}