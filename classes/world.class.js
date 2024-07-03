/**
 * Represents a world.
 */
class World {
    alpha = 1;
    darkSpeed = 0.025;
    cameraX = 0;
    currentSounds = [];


    /**
     * Creates a world.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to use.
     */
    constructor(canvas, keyboard) {
        this.init(canvas, keyboard);
    }


    /**
     * Provides the time of the world.
     */
    get time() {
        return new Date().getTime();
    }


    /**
     * Initializes the world.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to use.
     */
    init(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
    }


    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Redraws the world.
     */
    redraw() {
        if (isUndefined(this.stopped)) {
            requestAnimationFrame(() => {
                this.draw();
            });
        }
    }


    /**
     * Draws an object.
     * @param {object} o - The object to draw.
     */
    drawObject(o) {
        this.flip(o, () => this.flipImage(o));
        o.draw(this.ctx);
        this.flip(o, () => this.flipImageBack(o));
    }


    /**
     * Flips the object.
     * @param {object} o - The object to flip.
     * @param {method} subfunction - The subfunction to apply.
     */
    flip(o, subfunction) {
        if (o.otherDirection) {
            subfunction(o);
        }
    }


    /**
     * Flips the object to the left.
     * @param {object} o - The object to flip.
     */
    flipImage(o) {
        this.ctx.save();
        this.ctx.translate(o.radDispl, 0);
        this.ctx.scale(-1, 1);
        o.x *= -1;
    }


    /**
     * Flips the object to the right.
     * @param {object} o - The object to flip.
     */
    flipImageBack(o) {
        o.x *= -1;
        this.ctx.restore();
    }


    /**
     * Draws a group of objects.
     * @param {array} group - The group of objects to draw.
     */
    drawObjectGroup(group) {
        group.forEach((o) => {
            this.drawObject(o);
        });
    }


    /**
     * Sets the text to draw.
     * @param {string} font - The font to apply.
     * @param {string} textAlign - The text alignment to apply.
     * @param {string} color - The color to apply.
     */
    setText(font, textAlign, color) {
        this.ctx.font = font;
        this.ctx.textAlign = textAlign;
        this.ctx.fillStyle = color;
    }


    /**
     * Sets the text alignment.
     * @param {string} value - The text alignment to apply.
     */
    setTextAlign(value) {
        this.ctx.textAlign = value;
    }


    /**
     * Draws the text.
     * @param {string} text - The text to draw.
     * @param {number} x - The x value of the text.
     * @param {number} y - The y value of the text.
     */
    drawText(text, x, y) {
        this.ctx.fillText(text, x, y);
    }


    /**
     * Sets the shadow.
     * @param {string} color - The shadow color to set.
     * @param {number} blur - The shadow blur to set.
     */
    setShadow(color, blur) {
        this.ctx.shadowColor = (color) ? color : 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = (blur) ? blur : 0;
    }


    /**
     * Sets the filter.
     * @param {string} value - The filter to set.
     */
    setFilter(value) {
        this.ctx.filter = value;
    }


    /**
     * Sets the global alpha.
     */
    setGlobalAlpha() {
        this.ctx.globalAlpha = this.alpha;
    }


    /**
     * Darkens the screen.
     */
    darken() {
        if (!isMatch(this.alpha, 0)) {
            let diff = getSum(this.alpha, -this.darkSpeed);
            this.setAlpha(diff);
        }
    }


    /**
     * Sets the alpha value.
     * @param {number} next - The next alpha value.
     */
    setAlpha(next) {
        if (isGreater(next, 0)) {
            this.alpha = 0;
        } else {
            this.alpha -= this.darkSpeed;
        }
    }


    /**
     * Provides a centered coordinate.
     * @param {string} key - The key of the canvas size value.
     * @param {number} value - The size value of the object to draw.
     * @returns {number} - The centered coordinate.
     */
    getCenteredCoord(key, value) {
        return this.canvas[key] / 2 - value / 2;
    }


    /**
     * Translates the camera.
     * @param {number} x - The x value of the camera.
     * @param {number} y - The y value of the camera.
     */
    translateCamera(x, y) {
        this.ctx.translate(x, y);
    }


    /**
     * Removes ended sounds.
     */
    removeSound() {
        this.currentSounds.forEach((sound) => {
            if (sound.ended || isMatch(sound.src, '')) {
                let id = this.currentSounds.indexOf(sound);
                this.currentSounds.splice(id, 1);
            }
        });
    }


    /**
     * Pauses the current sounds.
     * @param {boolean} logical - A boolean value.
     */
    pauseSound(logical) {
        this.currentSounds.forEach((sound) => {
            (isTrue(logical)) ? sound.pause() : sound.play();
        });
    }


    /**
     * Sets the exit button of the full screen mode.
     * @param {string} method - The method to apply.
     */
    setExitButton(method) {
        let header = document.getElementById('header');
        let classValue = header.classList.value;
        if (classValue.includes('display-none')) {
            setClass('exit-full-screen-btn', method, 'hide');
        }
    }
}