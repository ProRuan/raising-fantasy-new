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
            }
        }, 1000 / 60);
    }


    // jsdoc
    isOpened() {
        return this.opened == true;
    }
}