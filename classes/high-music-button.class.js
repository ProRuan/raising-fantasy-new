class HighMusicButton extends Button {
    indent = -6;
    reachable = false;
    previous = 'lowMusicButton';
    next = 'lowSoundButton';    // set right / down!!!


    constructor(leaderboard) {
        super(source.arrowRight, leaderboard.xLeft + (leaderboard.xRight - leaderboard.xLeft) / 2 + 125, 540 - leaderboard.yTop - 145.5);
        this.close();
    }


    close() {    //  to edit!!!
        setInterval(() => {
            this.setCursor();
            this.setMusicVolume();
        }, 1000 / 60);
    }


    setMusicVolume() {
        if (this.isLocked() && this.isInRange()) {
            this.locked = false;
            music++;
            console.log('high music volume', music);
        }
    }


    isInRange() {
        return isGreater(0, music, false) && isGreater(music, 10, false);
    }


    // work with reachable!!!

    // workd with next button!!!
}