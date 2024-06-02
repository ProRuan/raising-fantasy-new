class HighSoundButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'lowMusicButton';
    next = 'lowSoundButton';    // set right / down!!!


    constructor(leaderboard) {
        super(source.arrowRight, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 125, 540 - leaderboard.yTop - 193.5);
        this.close();
    }


    close() {    //  to edit!!!
        setInterval(() => {
            this.setCursor();
            this.setVolume('sound', true);
        }, 1000 / 60);
    }


    // workd with next button!!!
}