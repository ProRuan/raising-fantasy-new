class LowSoundButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'highMusicButton';
    next = 'highSoundButton';
    shadowColor = 'white';
    shadowBlur = 16;


    // jsdoc
    constructor(x, y) {
        super(source.arrowLeft, x + 25, y - 193.5);
    }


    // jsdoc
    execute() {
        this.setVolume('sound', false);
    }
}