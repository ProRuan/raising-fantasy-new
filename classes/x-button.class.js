class XButton extends Button {
    reachable = false;
    previous = 'settingsButton';
    next = 'cupButton';


    constructor(leaderboard) {
        super(source.xButton, leaderboard.xRight - 35, 540 - leaderboard.yTop - 64);
        this.close();
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