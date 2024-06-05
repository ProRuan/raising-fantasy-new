class XButton extends Button {
    indent = 2;
    reachable = false;
    previous = 'settingsButton';


    // jsdoc
    constructor(x, y) {
        super(source.xButton, x - 35, canvas.height - y - 64);
    }


    // jsdoc
    get next() {
        return this.getNext();
    }


    // jsdoc
    getNext() {
        if (world.settingsButton.isLocked()) {
            return 'lowMusicButton';
        } else if (world.cupButton.isLocked()) {
            return 'cupButton';
        }
    }


    // jsdoc
    execute() {
        this.closeLeaderboard();
    }


    // jsdoc
    closeLeaderboard() {
        if (this.isLocked()) {
            this.reset();
            this.unlock('cupButton');
            this.unlock('settingsButton');
            setCursor('initial');
        }
    }
}