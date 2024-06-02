class LowMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'xButton';
    next = 'highMusicButton';    // set right / down!!!


    constructor(leaderboard) {
        super(source.arrowLeft, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 25, 540 - leaderboard.yTop - 145.5);
        this.close();
    }


    close() {    //  to edit!!!
        setInterval(() => {
            // this.setCursor();
            // if (this.isLocked()) {
            //     this.reachable = false;
            //     this.locked = false;
            //     world.cupButton.locked = false;
            //     world.settingsButton.locked = false;

            //     setCursor('initial');    // move?
            // }


            this.setMusicVolume();
        }, 1000 / 60);
    }


    setMusicVolume() {
        if (this.isLocked()) {
            this.locked = false;
            // music--;
            console.log('low music volume', music);
        }
    }


    // work with reachable!!!

    // workd with next button!!!
}