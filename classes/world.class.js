class World {
    alpha = 1;
    darkSpeed = 0.025;
    cameraX = 0;
    currentSounds = [];


    // jsdoc
    constructor(canvas, keyboard) {
        this.init(canvas, keyboard);
    }


    // jsdoc
    get time() {
        return new Date().getTime();
    }


    // jsdoc
    init(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
    }


    // jsdoc
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    // jsdoc
    redraw() {
        if (isUndefined(this.stopped)) {
            requestAnimationFrame(() => {
                this.draw();
            });
        }
    }


    // jsdoc
    drawObject(o) {
        this.flip(o, () => this.flipImage(o));
        o.draw(this.ctx);
        this.flip(o, () => this.flipImageBack(o));
    }


    // jsdoc
    flip(o, subfunction) {
        if (o.otherDirection) {
            subfunction(o);
        }
    }


    // jsdoc
    flipImage(o) {
        this.ctx.save();
        this.ctx.translate(o.radDispl, 0);
        this.ctx.scale(-1, 1);
        o.x *= -1;
    }


    // jsdoc
    flipImageBack(o) {
        o.x *= -1;
        this.ctx.restore();
    }


    // jsdoc
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


    // jsdoc
    setTextAlign(value) {
        this.ctx.textAlign = value;
    }


    // jsdoc
    drawText(text, x, y) {
        this.ctx.fillText(text, x, y);
    }


    // jsdoc
    setShadow(color, blur) {
        this.ctx.shadowColor = (color) ? color : 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = (blur) ? blur : 0;
    }


    // jsdoc
    setFilter(value) {
        this.ctx.filter = value;
    }


    // jsdoc
    setGlobalAlpha() {
        this.ctx.globalAlpha = this.alpha;
    }


    // jsdoc
    darken() {
        if (!isMatch(this.alpha, 0)) {
            let diff = getSum(this.alpha, -this.darkSpeed);
            this.setAlpha(diff);
        }
    }


    // jsdoc
    setAlpha(value) {
        if (isGreater(value, 0)) {
            this.alpha = 0;
        } else {
            this.alpha -= this.darkSpeed;
        }
    }


    // jsdoc
    translateCamera(x, y) {
        this.ctx.translate(x, y);
    }


    removeSound() {
        this.currentSounds.forEach((sound) => {
            if (sound.ended || isMatch(sound.src, '')) {
                let id = this.currentSounds.indexOf(sound);
                this.currentSounds.splice(id, 1);
                console.log('removed audio', this.currentSounds.length);
            }
        });
    }


    pauseSound(logical) {
        this.currentSounds.forEach((sound) => {
            if (isTrue(logical)) {
                sound.pause();
                console.log('paused sounds: ', sound.currentTime);
            } else {
                sound.play();
                console.log('continuing sounds: ', sound.currentTime);
            }
        });
    }


    getCenteredCoord(key, value) {
        return this.canvas[key] / 2 - value / 2;
    }
}