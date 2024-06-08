class Star extends AnimatedObject {


    constructor(x, y) {
        super(source.star, x, y);
    }


    triggerEffect() {    // to edit
        this.setScore(true, 'last');
        this.setScore(this.isHighScore(), 'best');
        save('score');
        pauseGame(true);


        this.id = setInterval(() => {
            world.darken();
            if (isMatch(world.alpha, 0)) {
                if (!this.worldChanged) {
                    this.worldChanged = true;

                    setTimeout(() => {
                        clearInterval(this.id);
                        drawableObjects = [];
                        world.stopped = true;
                        world = new StartWorld(canvas, keyboard);
                        world.alpha = 1;
                        currentWorld = 'start';
                        world.cupButton.locked = true;

                        world.leaderboard.score = tempScore;

                        // stopp ambience sound!
                    }, 500);
                }
            }
        }, 1000 / 60);

        console.log('Let us go back to the start world ...');
    }


    // jsdoc
    setScore(condition, key) {
        if (condition) {
            this.setScoreValue(key, 'coins', this.getCollectedItems('coins'));
            this.setScoreValue(key, 'leaves', this.getCollectedItems('leaves'));
            this.setScoreValue(key, 'time', this.getPlaytime());
        }
    }


    // jsdoc
    setScoreValue(key, subkey, method) {
        score[key][subkey] = method;
    }


    // jsdoc
    getCollectedItems(key) {
        return world.hero[key];
    }


    // jsdoc
    getPlaytime() {
        world.hero.endTime = getTime();
        return getSum(world.hero.endTime, -world.hero.startTime);
    }


    // jsdoc
    isHighScore() {
        let moreItems = this.isMore('coins') && this.isMore('leaves');
        let moreCoins = this.isMore('coins') && this.isEqual('leaves');
        let moreLeaves = this.isEqual('coins') && this.isMore('leaves');
        let lessTime = this.isScoreMatch() && this.isFaster();
        return moreItems || moreCoins || moreLeaves || lessTime;
    }


    // jsdoc
    isMore(key) {
        return isGreater(score.best[key], score.last[key]);
    }


    // jsdoc
    isEqual(key) {
        return isMatch(score.best[key], score.last[key]);
    }


    // jsdoc
    isScoreMatch() {
        return this.isEqual('coins') && this.isEqual('leaves');
    }


    // jsdoc
    isFaster() {
        return !isGreater(score.best.time, score.last.time, 'tolerant');
    }



    // missing task!!!
    // ----------------
    // work for time, if game is paused!
    // knight moveId and animateId ...
    // press any key message ...
}