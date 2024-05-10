class World {


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        console.log('World: ', this);
    }


    // // to edit
    // draw(object) {
    //     this.clearCanvas();

    //     object;
    //     // only for testing!!!
    //     // this.drawObject(this.cupButton);
    //     // this.addButtonsToMap();

    //     this.redraw();
    // }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    redraw() {
        requestAnimationFrame(() => {
            this.draw();
        });
    }


    drawObject(o) {
        this.flipImageMaster(o, () => this.flipImage(o));
        o.draw(this.ctx);
        // o.drawFrame(this.ctx);    // only for testing!!!
        this.flipImageMaster(o, () => this.flipImageBack(o));
    }


    flipImageMaster(mo, subfunction) {
        if (mo.otherDirection) {
            subfunction(mo);
        }
    }


    // to edit
    flipImage(mo) {    // set mo.object!!!
        this.ctx.save();
        this.ctx.translate(mo.radDispl, 0);    // k + 24, d + 40
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }


    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
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