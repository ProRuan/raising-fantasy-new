/**
 * Represents a star.
 * @extends AnimatedObject
 */
class Star extends AnimatedObject {


    /**
     * Creates a star.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.star, x, y);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        this.updateScore();
        pauseGame(true);
        pauseDisabled = true;
        this.setPauseableInterval(() => this.transit(), 1000 / 60);
    }


    /**
     * Updates the score.
     */
    updateScore() {
        this.setScore(true, 'last');
        this.setScore(this.isHighScore(), 'best');
        save('score');
    }


    /**
     * Sets the score.
     * @param {boolean} condition - The score condition.
     * @param {string} key - The score key,
     */
    setScore(condition, key) {
        if (condition) {
            this.setScoreValue(key, 'coins', this.getCollectedItems('coins'));
            this.setScoreValue(key, 'leaves', this.getCollectedItems('leaves'));
            this.setScoreValue(key, 'time', this.getPlaytime());
        }
    }


    /**
     * Sets a score value.
     * @param {string} key - The score key.
     * @param {string} subkey - The score subkey.
     * @param {function} method - The score method.
     */
    setScoreValue(key, subkey, method) {
        score[key][subkey] = method;
    }


    /**
     * Provides collected items.
     * @param {string} key - The item key.
     * @returns {array} - Collected items.
     */
    getCollectedItems(key) {
        return world.hero[key];
    }


    /**
     * Provides the play time.
     * @returns {number} - The play time.
     */
    getPlaytime() {
        world.hero.endTime = getTime();
        let time = getSum(world.hero.endTime, -world.hero.startTime);
        return time - pauseTime;
    }


    /**
     * Verifies the high score.
     * @returns {boolean} - A boolean value.
     */
    isHighScore() {
        let moreItems = this.isMore('coins') && this.isMore('leaves');
        let moreCoins = this.isMore('coins') && this.isEqual('leaves');
        let moreLeaves = this.isEqual('coins') && this.isMore('leaves');
        let lessTime = this.isScoreMatch() && this.isFaster();
        return moreItems || moreCoins || moreLeaves || lessTime;
    }


    /**
     * Verifies the improvement of amount.
     * @param {string} key - The item key.
     * @returns {boolean} - A boolean value.
     */
    isMore(key) {
        return isGreater(score.best[key], score.last[key]);
    }


    /**
     * Verifies the equality.
     * @param {string} key - The item key.
     * @returns {boolean} - A boolean value.
     */
    isEqual(key) {
        return isMatch(score.best[key], score.last[key]);
    }


    /**
     * Verifies the score match.
     * @returns {boolean} - A boolean value.
     */
    isScoreMatch() {
        return this.isEqual('coins') && this.isEqual('leaves');
    }


    /**
     * Verifies the improvement of speed.
     * @returns {boolean} - A boolean value.
     */
    isFaster() {
        return !isGreater(score.best.time, score.last.time, 'tolerant');
    }


    /**
     * Performs the world transit.
     */
    transit() {
        world.darken();
        this.shiftWorld();
    }


    /**
     * Shifts the world.
     */
    shiftWorld() {
        this.setWorldShiftTime();
        this.goHome();
    }


    /**
     * Sets the world shift time.
     */
    setWorldShiftTime() {
        if (isMatch(world.alpha, 0) && !this.worldShifted) {
            this.worldShifted = true;
            this.worldShiftTime = getSum(world.time, 500);
        }
    }


    /**
     * Performs the world shift.
     */
    goHome() {
        if (isTimeout(this.worldShiftTime, world.time)) {
            this.leaveWorld();
            this.showScore();
        }
    }


    /**
     * Leaves the level world.
     */
    leaveWorld() {
        this.stop(true);
        world.hero.music.pause();
        world.endboss.music.pause();
        world.stopped = true;
        pauseDisabled = false;
    }


    /**
     * Shows the score.
     */
    showScore() {
        setStartWorld();
        world.interacted = true;
        world.cupButton.locked = true;
        world.setCurrentButton('cupButton');
        enableMainButtons();
    }
}