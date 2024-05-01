class World {
    // only for testing!!!



    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        // only for testing!!!
        this.setButtons();

        this.draw();


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


    addToMap(drawableObject) {
        drawableObject.draw(this.ctx);
        drawableObject.drawFrame(this.ctx);
        // if (this.CUP_BUTTON.isTargeted()) {
        //     this.CUP_BUTTON.drawHover(this.ctx);
        // }

        // console.log(drawableObject);
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
        this.addToMap(this.BACKGROUND);
        this.addToMap(this.CUP_BUTTON);
        this.addToMap(this.SETTINGS_BUTTON);
    }
}