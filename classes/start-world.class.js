class StartWorld extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartWorld();    // rename
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


    draw() {
        this.clearCanvas();

        this.drawObject(this.background);
        this.drawButtonWithShadow('cupButton', 'yellow', 16);
        this.drawButtonWithShadow('settingsButton', 'yellow', 16);
        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButtonWithShadow('xButton', 'lightcyan', 16);
        }


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


    drawButtonFrame(button) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();
    }
}