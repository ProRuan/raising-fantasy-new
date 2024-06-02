class LowMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'xButton';
    next = 'highMusicButton';


    constructor(leaderboard) {
        super(source.arrowLeft, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 25, 540 - leaderboard.yTop - 145.5);
        this.close();
    }


    close() {
        setInterval(() => {
            this.setCursor();
            this.setVolume('music', false);
        }, 1000 / 60);
    }
}