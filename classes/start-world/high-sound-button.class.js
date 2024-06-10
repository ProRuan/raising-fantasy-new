class HighSoundButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'lowSoundButton';
    next = 'cupButton';
    shadowColor = 'white';
    shadowBlur = 16;


    // jsdoc
    constructor(x, y) {
        super(source.arrowRight, x + 125, y - 193.5);
    }


    // jsdoc
    execute() {
        this.setVolume('sound', true);
    }
}