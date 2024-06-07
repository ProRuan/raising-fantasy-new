class Star extends AnimatedObject {


    constructor(x, y) {
        super(source.star, x, y);
    }


    triggerEffect() {    // to edit
        world.hero.gameEndTime = getTime();
        let delta = world.hero.gameEndTime - world.hero.gameStartTime;
        console.log('Time required: ', delta);
        delta = this.getTimeString(delta);
        console.log('Time required: ', delta);

        score.last.coins = world.hero.coins;
        score.last.leaves = world.hero.leaves;
        score.last.time = delta;
        console.log(score);

        tempScore = {
            'best': {
                'coins': 19,
                'leaves': 17,
                'time': '7 min 13 s'
            },
            'last': {
                'coins': world.hero.coins,
                'leaves': world.hero.leaves,
                'time': delta
            }
        };
        score = tempScore;
        save('score');


        intervalIds.forEach((id) => {
            clearInterval(id);
        });
        pauseGame(true);    // to edit
        clearInterval(world.hero.moveId);
        clearInterval(world.hero.playId);

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
}