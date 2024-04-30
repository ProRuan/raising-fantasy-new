class World {
    // only for testing!!!
    PATH_BACKGROUND = './img/start_screen/background.png';
    BACKGROUND = new DrawableObject(this.PATH_BACKGROUND, 0, 0);
    PATH_CUP_BUTTON = './img/start_screen/cup_button.png';
    CUP_BUTTON = new Button(this.PATH_CUP_BUTTON, 32, 32);


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
    }


    draw() {
        this.clearCanvas();

        // only for testing!!!
        this.addToMap(this.BACKGROUND);
        this.addToMap(this.CUP_BUTTON);

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


    addToMap(drawableObject) {
        drawableObject.draw(this.ctx);
    }
}