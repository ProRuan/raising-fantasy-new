class QuestRoll extends DrawableObject {
    opened = false;    // necessary???


    xText = { left: 64, right: 80 };
    yHeadline = { a: 100, b: 276 };
    yScore = { best: 136, last: 312 };
    yItem = { coins: 0, leaves: 36, time: 72 };
    yVolume = { music: 144, sound: 192 };
    volumeButtons = ['lowMusicButton', 'highMusicButton', 'lowSoundButton', 'highSoundButton'];


    // jsdoc
    constructor(x, y) {
        super(source.questRoll, x, y);
        this.show();
    }


    // jsdoc
    show() {
        setInterval(() => {
            this.showButtons();
        }, 1000 / 60);
    }


    // jsdoc
    showButtons() {
        (this.isOpened()) ? this.setButtons(false) : this.setButtons(true);
    }


    isOpened() {    // double code?
        return world.questButton.isLocked();
    }


    setButtons(logical) {
        this.setReachable('newGameButton', logical);
        this.setReachable('questButton', logical);
        // this.setReachable('xButton', true);    // coin button!
    }


    // jsdoc
    setReachable(key, value) {    // double code!!! (move)
        world[key].reachable = value;
    }


    drawQuest() {
        // world.setText('bold 28px Arial', 'center', 'black');
        // console.log('quest roll content');
    }
}