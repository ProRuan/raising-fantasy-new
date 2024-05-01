class World {
    // only for testing!!!



    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        // only for testing!!!
        this.setButtons();

        this.draw();
        this.control();

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


    // only for testing!!!
    setButtons() {
        this.PATH_BACKGROUND = './img/start_screen/background.png';
        this.BACKGROUND = new DrawableObject(this.PATH_BACKGROUND, 0, 0);
        this.PATH_CUP_BUTTON = './img/start_screen/cup_button.png';
        this.CUP_BUTTON = new Button(this.PATH_CUP_BUTTON, 32, 32);
        this.PATH_SETTINGS_BUTTON = './img/start_screen/settings_button.png';
        this.SETTINGS_BUTTON = new Button(this.PATH_SETTINGS_BUTTON, 960 - 66 - 32, 32);
    }


    addButtonsToMap() {
        this.drawObject(this.BACKGROUND);


        this.drawHeadline();
        this.drawNewGameButton();
        this.drawStoryButton();

        this.drawExtraButton(this.CUP_BUTTON);
        this.drawExtraButton(this.SETTINGS_BUTTON);


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