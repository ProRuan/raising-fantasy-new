class Star extends AnimatedObject {


    constructor(x, y) {
        super(source.star, x, y);
    }


    triggerEffect() {    // to edit
        this.setLastScore();
        this.setBestScore();
        save('score');

        clearInterval(world.hero.moveId);    // to delete!!!
        clearInterval(world.hero.playId);    // to delete!!!
        pauseGame(true);


        this.id = setInterval(() => {
            let tSpeed = 0.025;
            if (world.alpha != 0) {
                if (world.alpha - tSpeed < 0) {
                    world.alpha = 0;
                } else {
                    world.alpha -= tSpeed;
                }
            }
            if (world.alpha == 0) {
                if (!this.changeSet) {
                    this.changeSet = true;

                    setTimeout(() => {
                        clearInterval(this.id);
                        world = new StartWorld(canvas, keyboard);
                        world.alpha = 1;
                        currentWorld = 'start';
                        world.cupButton.locked = true;

                        world.leaderboard.score = tempScore;

                        // stopp ambience sound!
                    }, 500);
                }
            }

            console.log(world.alpha);
        }, 1000 / 60);

        // world = new StartWorld(canvas, keyboard);
        // currentWorld = 'start';

        // knight moveId and animateId ...

        console.log('Let us go back to the start world ...');
    }


    // jsdoc
    setLastScore() {
        this.setScore('coins', this.getCollectedItems('coins'));
        this.setScore('leaves', this.getCollectedItems('leaves'));
        this.setScore('time', this.getPlaytime());
    }


    // jsdoc
    setScore(key, method) {
        score.last[key] = method;
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
    setBestScore() {
        if (this.isBetter()) {
            score.best = {
                coins: score.last.coins,
                leaves: score.last.leaves,
                time: score.last.time
            }
        }
    }


    // jsdoc
    isBetter() {
        return this.isMore('coins') && this.isMore('leaves') && this.isFaster();
    }


    // jsdoc
    isMore(key) {
        return isGreater(score.best[key], score.last[key]);
    }


    // jsdoc
    isFaster() {
        return !isGreater(score.best.time, score.last.time, false);
    }


    getTimeString(delta) {
        let s = delta / 1000;
        let min = Math.floor(s / 60);
        s = Math.ceil(s % 60);

        if (min >= 1) {
            return `${min} min ${s} sec`;
        } else {
            return `${s} s`;
        }


        // return delta / 1000;
    }




    // work for time, if game is paused!
}