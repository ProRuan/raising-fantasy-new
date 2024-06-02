class LowSoundButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'highMusicButton';
    next = 'highSoundButton';


    constructor(leaderboard) {
        super(source.arrowLeft, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 25, 540 - leaderboard.yTop - 193.5);
        this.close();
    }


    close() {
        setInterval(() => {
            this.setCursor();
            this.setVolume('sound', false);
        }, 1000 / 60);
    }
}