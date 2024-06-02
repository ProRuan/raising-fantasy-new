class HighMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'lowMusicButton';
    next = 'lowSoundButton';


    constructor(leaderboard) {
        super(source.arrowRight, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 125, 540 - leaderboard.yTop - 145.5);
        this.close();
    }


    close() {
        setInterval(() => {
            this.setCursor();
            this.setVolume('music', true);
        }, 1000 / 60);
    }
}