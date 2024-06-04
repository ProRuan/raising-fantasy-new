class Leaderboard extends DrawableObject {
    opened = false;
    xLeftText = 64;
    xRightText = 80;
    yheadline1 = 100;
    yBestScore = 136;
    yCoins = 0;    // make an object?
    yLeaves = 36;
    yTime = 72;
    yheadline2 = 276;
    yLastScore = 312;
    yMusic = 144;
    ySound = 192;
    volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];


    constructor() {
        super(source.leaderboard, canvas.width / 2 - 191, canvas.height / 2 - 220.5);
        this.show();
    }


    show() {
        setInterval(() => {
            this.showButtons();
        }, 1000 / 60);
    }


    // jsdoc
    showButtons() {
        if (this.isOpened()) {
            this.setButtons();
        } else {
            this.setVolumeButtons(false);
        }
    }


    // jsdoc
    isOpened() {
        return this.opened == true;
    }


    // jsdoc
    setButtons() {
        this.setReachable('xButton', true);
        if (world.settingsButton.isLocked()) {
            this.setVolumeButtons(true);
        }
    }


    // jsdoc
    setReachable(key, value) {
        world[key].reachable = value;
    }


    // jsdoc
    setVolumeButtons(value) {
        this.volumeButtons.forEach((button) => {
            this.setReachable(button, value);
        });
    }


    // jsdoc
    drawScore() {
        if (this.isScore()) {
            this.drawHeadline('gold', 'Best Score', this.yheadline1);
            this.drawChapter('gold', 'best', this.yTop + this.yBestScore);
            this.drawHeadline('white', 'Last Score', this.yheadline2);
            this.drawChapter('white', 'last', this.yTop + this.yLastScore);
            world.setFillStyle();
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
        y += this.yCoins;;
        let score = result[key].coins + ' / 20';
        this.drawResultText('Coins:', y, score);
    }


    // jsdoc
    drawLeaves(key, y) {
        y += this.yLeaves;
        let score = result[key].leaves + ' / 18';
        this.drawResultText('Leaves:', y, score);
    }


    // jsdoc
    drawTime(key, y) {
        y += this.yTime;
        let score = result[key].time;
        this.drawResultText('Time:', y, score);
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
        return this.xLeft + this.xLeftText;
    }


    // jsdoc
    setRightText(y, result) {
        let x = this.getXRightText();
        world.setTextAlign('center');
        world.drawText(result, x, y);
    }


    // jsdoc
    getXRightText() {
        return this.xCenter + this.xRightText;
    }


    // jsdoc
    drawVolume() {
        if (this.isVolume()) {
            this.drawHeadline('white', 'Volume', this.yheadline1);
            this.drawVolumeText('Music', this.yTop + this.yMusic, volume.music);
            this.drawVolumeText('Sound', this.yTop + this.ySound, volume.sound);
            world.setFillStyle();
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