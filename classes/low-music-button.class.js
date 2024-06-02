class LowMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'xButton';
    next = 'highMusicButton';


    // jsdoc
    constructor(x, y) {
        super(source.arrowLeft, x + 25, y - 145.5);
    }


    // jsdoc
    execute() {
        this.setVolume('music', false);
    }
}