class World {


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        // this.draw();

    }


    // to edit
    draw(object) {
        this.clearCanvas();

        object;
        // only for testing!!!
        // this.drawObject(this.cupButton);
        // this.addButtonsToMap();

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
        // o.drawFrame(this.ctx);    // only for testing!!!
    }


    drawObjectGroup(group) {
        group.forEach((o) => {
            this.drawObject(o);
        });
    }


    setFontTextAlign(font, value) {
        this.setFont(font);
        this.setTextAlign(value);
    }


    setFont(font) {
        this.ctx.font = font;
    }


    setTextAlign(value) {
        this.ctx.textAlign = value;
    }


    setFillStyle(value) {
        this.ctx.fillStyle = (value) ? value : '#000000';
    }


    drawText(text, x, y) {
        this.ctx.fillText(text, x, y);
    }


    setShadow(color, blur) {
        this.ctx.shadowColor = (color) ? color : 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = (blur) ? blur : 0;
    }


    setDisplayed(logical) {
        this.displayed = logical;
    }


    isDisplayed() {
        return this.displayed == true;
    }


    getBoolean(key) {
        return this[key];
    }


    setBoolean(key, value) {
        this[key] = value;
    }
}