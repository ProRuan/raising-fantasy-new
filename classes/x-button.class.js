class XButton extends Button {
    indent = 2;
    reachable = false;
    previous = 'settingsButton';


    constructor(leaderboard) {
        super(source.xButton, leaderboard.xRight - 35, 540 - leaderboard.yTop - 64);
        this.close();
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


    close() {
        setInterval(() => {
            this.setCursor();
            if (this.isLocked()) {
                this.reachable = false;
                this.locked = false;
                world.cupButton.locked = false;
                world.settingsButton.locked = false;

                setCursor('initial');    // move?
            }
        }, 1000 / 60);
    }


    // work with reachable!!!

    // workd with next button!!!
}