class World {
    startScreen = new StartScreen();


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setStartScreen();

        this.draw();
        this.control();

    }


    setStartScreen() {
        this.loadObjectValues(this.startScreen);
    }


    loadObjectValues(object) {
        for (const [key, value] of Object.entries(object)) {
            this[key] = value;
        }
    }


    draw() {
        this.clearCanvas();

        // only for testing!!!
        this.addButtonsToMap();

        this.redraw();
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    redraw() {
        requestAnimationFrame(() => {
            this.draw();
        });
    }


    drawObject(o) {
        o.draw(this.ctx);
        o.drawFrame(this.ctx);    // only for testing!!!
    }


    addButtonsToMap() {
        this.drawObject(this.background);


        this.drawHeadline();
        this.drawNewGameButton();
        this.drawStoryButton();

        this.drawExtraButton(this.cupButton);
        this.drawExtraButton(this.settingsButton);


        // this.drawObject(this.leaderboard);    // condition + class


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


    setFont(value) {
        this.ctx.font = value;
    }


    setTextAlign(value) {
        this.ctx.textAlign = value;
    }


    drawText(text, x, y) {
        this.ctx.fillText(text, x, y);
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


    setShadow(color, blur) {
        this.ctx.shadowColor = (color) ? color : 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = (blur) ? blur : 0;
    }


    control() {
        setInterval(() => {

        }, 1000 / 60);
    }
}