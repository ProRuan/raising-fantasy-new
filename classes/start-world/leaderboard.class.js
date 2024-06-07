class Leaderboard extends DrawableObject {
    opened = false;
    xText = { left: 64, right: 80 };
    yHeadline = { a: 100, b: 276 };
    yScore = { best: 136, last: 312 };
    yItem = { coins: 0, leaves: 36, time: 72 };
    yVolume = { music: 144, sound: 192 };
    volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];

    score = {
        best: { coins: 19, leaves: 17, time: '7 min 13 s' },
        last: { coins: 17, leaves: 15, time: '9 min 31 s' }
    };


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
            this.loadScore();
            this.drawHeadline('gold', 'Best Score', this.yHeadline.a);
            this.drawChapter('gold', 'best', this.yTop + this.yScore.best);
            this.drawHeadline('white', 'Last Score', this.yHeadline.b);
            this.drawChapter('white', 'last', this.yTop + this.yScore.last);
            world.setFillStyle();
        }
    }


    // jsdoc
    isScore() {
        return world.cupButton.isLocked();
    }


    // jsdoc
    loadScore() {    // double code!
        load('score');
        score = storableItems.score;
        this.score = storableItems.score;
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
        let score = this.score[key].coins + ' / 20';
        this.drawResultText('Coins:', y, score);
    }


    // jsdoc
    drawLeaves(key, y) {
        y += this.yItem.leaves;
        let score = this.score[key].leaves + ' / 18';
        this.drawResultText('Leaves:', y, score);
    }


    // jsdoc
    drawTime(key, y) {
        y += this.yItem.time;
        let score = this.score[key].time;
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
            this.loadVolume();
            this.drawHeadline('white', 'Volume', this.yHeadline.a);
            this.drawVolumeText('Music', this.yTop + this.yVolume.music, volume.music);
            this.drawVolumeText('Sound', this.yTop + this.yVolume.sound, volume.sound);
            world.setFillStyle();
        }
    }


    // jsdoc
    isVolume() {
        return world.settingsButton.isLocked();
    }


    // jsdoc
    loadVolume() {
        load('volume');
        volume = storableItems.volume;
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