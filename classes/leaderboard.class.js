class Leaderboard extends DrawableObject {
    opened = false;


    constructor(ctx) {
        super(source.leaderboard, canvas.width / 2 - 191, canvas.height / 2 - 220.5);
        this.ctx = ctx;
        this.show();
    }


    show() {
        setInterval(() => {
            if (this.isOpened()) {
                world.xButton.reachable = true;
                world.lowMusicButton.reachable = true;
                world.highMusicButton.reachable = true;
                world.lowSoundButton.reachable = true;
                world.highSoundButton.reachable = true;
            } else {
                world.lowMusicButton.reachable = false;
                world.highMusicButton.reachable = false;
                world.lowSoundButton.reachable = false;
                world.highSoundButton.reachable = false;
            }
        }, 1000 / 60);
    }


    // jsdoc
    isOpened() {
        return this.opened == true;
    }
}