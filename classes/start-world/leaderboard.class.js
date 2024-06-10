class Leaderboard extends DrawableObject {
    opened = false;
    xText = { left: 64, right: 80 };
    yHeadline = { a: 100, b: 276 };
    yScore = { best: 136, last: 312 };
    yItem = { coins: 0, leaves: 36, time: 72 };
    yVolume = { music: 144, sound: 192 };
    volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];


    // jsdoc
    constructor(x, y) {
        super(source.leaderboard, x, y);
        this.show();
    }


    // jsdoc
    show() {
        this.setPauseableInterval(() => this.showButtons(), 1000 / 60);
    }


    // jsdoc
    showButtons() {
        if (isMatch(currentWorld, 'start')) {
            (this.isOpened()) ? this.setButtons() : this.setVolumeButtons(false);
        } else {
            this.stop(true);
        }
    }


    // jsdoc
    setButtons() {
        world.setReachable('newGameButton', false);
        world.setReachable('questButton', false);
        world.setReachable('xButton', true);
        if (world.settingsButton.isLocked()) {
            this.setVolumeButtons(true);
        }
    }


    // jsdoc
    setVolumeButtons(value) {
        this.volumeButtons.forEach((button) => {
            world.setReachable(button, value);
        });
    }


    // jsdoc
    drawScore() {
        if (this.isScore()) {
            this.drawHeadline('gold', 'Best Score', this.yHeadline.a);
            this.drawChapter('gold', 'best', this.yTop + this.yScore.best);
            this.drawHeadline('white', 'Last Score', this.yHeadline.b);
            this.drawChapter('white', 'last', this.yTop + this.yScore.last);
        }
    }


    // jsdoc
    isScore() {
        return world.cupButton.isLocked();
    }


    // jsdoc
    drawHeadline(color, text, y) {
        world.setText('28px Arial', 'center', color);
        this.setHeadline(text, y);
    }


    // jsdoc
    setHeadline(text, b) {
        let y = this.yTop + b;
        world.drawText(text, this.xCenter, y);
    }


    // jsdoc
    drawChapter(color, key, y) {
        world.setText('20px Arial', 'center', color);
        this.drawCoins(key, y);
        this.drawLeaves(key, y);
        this.drawTime(key, y);
    }


    // jsdoc
    drawCoins(key, y) {
        y += this.yItem.coins;
        let coins = score[key].coins + ' / 20';
        this.drawResultText('Coins:', y, coins);
    }


    // jsdoc
    drawLeaves(key, y) {
        y += this.yItem.leaves;
        let leaves = score[key].leaves + ' / 18';
        this.drawResultText('Leaves:', y, leaves);
    }


    // jsdoc
    drawTime(key, y) {
        y += this.yItem.time;
        let value = score[key].time;
        let time = this.getTime(value);
        this.drawResultText('Time:', y, time);
    }


    // jsdoc
    getTime(value) {
        let min = this.getMin(value);
        let s = this.getSec(value, min);
        return (isGreater(0, min)) ? `${min} min ${s} s` : `${s} s`;
    }


    // jsdoc
    getMin(value) {
        return Math.floor(value / 1000 / 60);
    }


    // jsdoc
    getSec(value, min) {
        return Math.floor(value / 1000 - min * 60);
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
        world.setText('20px Arial', 'left', 'white');
        let x = this.getXLeftText();
        world.drawText(text, x, y);
    }


    // jsdoc
    drawVolumeValue(y, type) {
        world.setText('20px Arial', 'center', 'white');
        let x = this.getXRightText();
        world.drawText(type, x, y);
    }
}