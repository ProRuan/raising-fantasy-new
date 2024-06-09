class World {
    alpha = 1;
    darkSpeed = 0.025;


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
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
        if (isUndefined(this.stopped)) {
            requestAnimationFrame(() => {
                this.draw();
            });
        }
    }


    drawObject(o) {
        this.flipImageMaster(o, () => this.flipImage(o));
        o.draw(this.ctx);
        o.drawFrame(this.ctx);    // only for testing!!!
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


    // jsdoc
    setText(font, textAlign, color) {
        this.ctx.font = font;
        this.ctx.textAlign = textAlign;
        this.ctx.fillStyle = color;
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


    // jsdoc
    darken() {
        if (!isMatch(this.alpha, 0)) {
            let diff = getSum(this.alpha, -this.darkSpeed);
            this.setAlpha(diff);
        }
    }


    // jsdoc
    setGlobalAlpha() {
        this.ctx.globalAlpha = this.alpha;
    }


    // jsdoc
    setAlpha(diff) {
        if (isGreater(diff, 0)) {
            this.alpha = 0;
        } else {
            this.alpha -= this.darkSpeed;
        }
    }



    // only for testing!!!
    drawRect(button) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(button.xLeft, button.yTop, button.xRight - button.xLeft, button.yBottom - button.yTop);
        this.ctx.stroke();
    }




    // missing task!!!
    // ----------------
    // work for time, if game is paused!
    // pause key + pause text ...
    // knight moveId and animateId ...
    // press any key message ...
    // stop ambient sound ...
    // stop / remove web, magic, bomb ...

    // remove drawable object (enemy, coins and so on) ...
    // remove web, magic, bomb ...
    // favicon
    // prevent default ...
}