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
            this.setCursor();
            this.setVolume('sound', false);
        }, 1000 / 60);
    }


    // workd with next button!!!
}