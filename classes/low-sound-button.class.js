class LowSoundButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'xButton';
    next = 'highMusicButton';    // set right / down!!!


    constructor(leaderboard) {
        super(source.arrowLeft, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 25, 540 - leaderboard.yTop - 193.5);
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


            this.setSoundVolume();
        }, 1000 / 60);
    }


    setSoundVolume() {
        if (this.isLocked()) {
            this.locked = false;
            // music--;
            console.log('low sound volume', sound);
        }
    }


    // work with reachable!!!

    // workd with next button!!!
}