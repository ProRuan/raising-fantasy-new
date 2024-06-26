/**
 * Represents a leaderboard.
 * @extends DrawableObject
 */
class Leaderboard extends DrawableObject {
    opened = false;
    xText = { left: 64, right: 80 };
    yHeadline = { a: 100, b: 276 };
    yScore = { best: 136, last: 312 };
    yItem = { coins: 0, leaves: 36, time: 72 };
    yVolume = { music: 144, sound: 192 };
    volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];


    /**
     * Creates a leaderboard.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.leaderboard, x, y);
        this.show();
    }


    /**
     * Shows the leaderboard.
     */
    show() {
        this.setPauseableInterval(() => this.showButtons(), 1000 / 60);
    }


    /**
     * Shows the buttons of the leaderboard.
     */
    showButtons() {
        if (isMatch(currentWorld, 'start')) {
            (this.isOpened()) ? this.setButtons() : this.setVolumeButtons(false);
        } else {
            this.stop(true);
        }
    }


    /**
     * Sets the buttons.
     */
    setButtons() {
        world.setReachable('newGameButton', false);
        world.setReachable('questButton', false);
        world.setReachable('xButton', true);
        if (world.settingsButton.isLocked()) {
            this.setVolumeButtons(true);
        }
    }


    /**
     * Sets the volume buttons.
     * @param {boolean} value - A boolean value.
     */
    setVolumeButtons(value) {
        this.volumeButtons.forEach((button) => {
            world.setReachable(button, value);
        });
    }


    /**
     * Draws the score.
     */
    drawScore() {
        if (this.isScore()) {
            this.drawHeadline('gold', 'Best Score', this.yHeadline.a);
            this.drawChapter('gold', 'best', this.yTop + this.yScore.best);
            this.drawHeadline('white', 'Last Score', this.yHeadline.b);
            this.drawChapter('white', 'last', this.yTop + this.yScore.last);
        }
    }


    /**
     * Verifies, if the score is to draw.
     * @returns {boolean} - A boolean value.
     */
    isScore() {
        return world.cupButton.isLocked();
    }


    /**
     * Draws the headline.
     * @param {string} color - The color of the text.
     * @param {string} text - The text to draw.
     * @param {number} y - The y value of the text.
     */
    drawHeadline(color, text, y) {
        world.setText('28px Roboto', 'center', color);
        this.setHeadline(text, y);
    }


    /**
     * Sets the headline.
     * @param {string} text - The text to draw.
     * @param {number} b - A parameter of the y-axis.
     */
    setHeadline(text, b) {
        let y = this.yTop + b;
        world.drawText(text, this.xCenter, y);
    }


    /**
     * Draws the chapter.
     * @param {string} color - The color of the text.
     * @param {string} key - The key of the score type.
     * @param {number} y - The y value of the text.
     */
    drawChapter(color, key, y) {
        world.setText('20px Roboto', 'center', color);
        this.drawCoins(key, y);
        this.drawLeaves(key, y);
        this.drawTime(key, y);
    }


    /**
     * Draws the score of the coins.
     * @param {string} key - The key of the score type.
     * @param {number} y - The y value of the text.
     */
    drawCoins(key, y) {
        y += this.yItem.coins;
        let coins = score[key].coins + ' / 20';
        this.drawResultText('Coins:', y, coins);
    }


    /**
     * Draws the score of the leaves.
     * @param {string} key - The key of the score type.
     * @param {number} y - The y value of the text.
     */
    drawLeaves(key, y) {
        y += this.yItem.leaves;
        let leaves = score[key].leaves + ' / 18';
        this.drawResultText('Leaves:', y, leaves);
    }


    /**
     * Draws the required time.
     * @param {string} key - The key of the score type.
     * @param {number} y - The y value of the text.
     */
    drawTime(key, y) {
        y += this.yItem.time;
        let value = score[key].time;
        let time = this.getTime(value);
        this.drawResultText('Time:', y, time);
    }


    /**
     * Provides the required time as formatted string.
     * @param {number} time - The time as a number.
     * @returns {string} - The time as a formatted string.
     */
    getTime(time) {
        let min = this.getMin(time);
        let s = this.getSec(time, min);
        return this.formatTime(min, s);
    }


    /**
     * Provides the required minutes.
     * @param {number} time - The time as a number.
     * @returns {number} - The required minutes.
     */
    getMin(time) {
        return Math.floor(time / 1000 / 60);
    }


    /**
     * Provides the required seconds.
     * @param {number} time - The time as a number.
     * @param {number} min - The required minutes.
     * @returns {number} - The required seconds.
     */
    getSec(time, min) {
        return Math.floor(time / 1000 - min * 60);
    }


    /**
     * Formats the required time.
     * @param {number} min - The required minutes.
     * @param {number} s - The required seconds.
     * @returns {string} - The required time as formatted string.
     */
    formatTime(min, s) {
        if (isGreater(0, min) && isGreater(0, s)) {
            return `${min} min ${s} s`;
        } else if (isGreater(0, min)) {
            return `${min} min`;
        } else if (isGreater(0, s)) {
            return `${s} s`;
        }
    }


    // jsdoc
    drawResultText(name, y, result) {
        this.setLeftText(name, y);
        this.setRightText(y, result);
    }


    // jsdoc
    setLeftText(name, y) {
        let x = this.getXLeftText();
        world.setTextAlign('left');
        world.drawText(name, x, y);
    }


    // jsdoc
    getXLeftText() {
        return this.xLeft + this.xText.left;
    }


    // jsdoc
    setRightText(y, result) {
        let x = this.getXRightText();
        world.setTextAlign('center');
        world.drawText(result, x, y);
    }


    // jsdoc
    getXRightText() {
        return this.xCenter + this.xText.right;
    }


    // jsdoc
    drawVolume() {
        if (this.isVolume()) {
            this.drawHeadline('white', 'Volume', this.yHeadline.a);
            this.drawVolumeText('Music', this.yTop + this.yVolume.music, volume.music);
            this.drawVolumeText('Sound', this.yTop + this.yVolume.sound, volume.sound);
        }
    }


    // jsdoc
    isVolume() {
        return world.settingsButton.isLocked();
    }


    // jsdoc
    drawVolumeText(text, y, type) {
        this.drawVolumeName(text, y);
        this.drawVolumeValue(y, type);
    }


    // jsdoc
    drawVolumeName(text, y) {
        world.setText('20px Roboto', 'left', 'white');
        let x = this.getXLeftText();
        world.drawText(text, x, y);
    }


    // jsdoc
    drawVolumeValue(y, type) {
        world.setText('20px Roboto', 'center', 'white');
        let x = this.getXRightText();
        world.drawText(type, x, y);
    }
}