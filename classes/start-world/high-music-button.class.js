class HighMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'lowMusicButton';
    next = 'lowSoundButton';
    shadowColor = 'white';
    shadowBlur = 16;


    // jsdoc
    constructor(x, y) {
        super(source.arrowRight, x + 125, y - 145.5);
    }


    // jsdoc
    execute() {
        this.setVolume('music', true);
    }
}