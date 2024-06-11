class Star extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.star, x, y);
    }


    // jsdoc
    triggerEffect() {
        this.updateScore();
        pauseGame(true);
        this.setPauseableInterval(() => this.transit(), 1000 / 60);
    }


    // jsdoc
    updateScore() {
        this.setScore(true, 'last');
        this.setScore(this.isHighScore(), 'best');
        save('score');
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
        let time = getSum(world.hero.endTime, -world.hero.startTime);
        console.log(time - pauseTime, time, pauseTime);
        return time - pauseTime;
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


    // jsdoc
    transit() {
        world.darken();
        this.shiftWorld();
    }


    // jsdoc
    shiftWorld() {
        if (isMatch(world.alpha, 0) && !this.worldShifted) {
            this.worldShifted = true;
            setTimeout(() => { this.goHome() }, 500);
        }
    }


    // jsdoc
    goHome() {
        this.leaveWorld();
        this.showScore();
    }


    // jsdoc
    leaveWorld() {
        this.stop(true);
        world.hero.music.pause();
        world.stopped = true;
    }


    // jsdoc
    showScore() {
        setStartWorld();
        world.interacted = true;
        world.cupButton.locked = true;
        world.setCurrentButton('cupButton');
    }
}