class TextButton extends Button {
    indent = -8;    // to set!
    shadowColor = 'lightcyan';
    shadowBlur = '12';
    font = '24px Arial';
    textAlign = 'left';
    color = 'black';
    sound = source.newGame;


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setText(source);
    }


    // jsdoc
    get offsetY() {
        return this.y + 20;
    }


    // jsdoc
    get previous() {
        return this.getPrevious();
    }


    // jsdoc
    get next() {
        return this.getNext();
    }


    // jsdoc
    setText(source) {
        this.text = source.text;
    }


    // jsdoc
    getPrevious() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'newGameButton';
        } else {
            return 'settingsButton';
        }
    }


    // jsdoc
    getNext() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'cupButton';
        } else {
            return 'questButton';
        }
    }


    // jsdoc
    execute() {
        this.startNewGame();
        this.openQuestRoll();
    }


    // jsdoc
    openQuestRoll() {
        this.open(world.questButton, world.questRoll);
    }


    startNewGame() {
        if (this.time && isGreater(this.time, world.time)) {
            // for (const [key] of Object.entries(world)) {
            //     if (world[key] instanceof Button && key != 'currentButton') {
            //         clearInterval(world[key].id);
            //         console.log(key, world[key].id);
            //     }
            // }

            setCursor('initial');

            world.music.pause();
            world.stopped = true;
            setLevelWorld();

            // this.transit();
        } else if (world.newGameButton.isLocked()) {
            this.unlock('newGameButton');
            this.playSound(this.sound);

            this.time = world.time + 750;
        }
    }


    // move to game.js?
    transit() {
        setInterval(() => {
            this.blackout();
            this.setLevelWorld();
        }, 1000 / 60);
    }


    blackout() {
        let tSpeed = 0.01;

        if (world.ctx.globalAlpha != 0 && isMatch(currentWorld, 'start')) {
            if (world.ctx.globalAlpha - tSpeed < 0) {
                world.ctx.globalAlpha = 0;
            } else {
                world.ctx.globalAlpha -= tSpeed;
            }
        }
    }


    setLevelWorld() {
        if (isMatch(world.ctx.globalAlpha, 0) && !isMatch(currentWorld, 'level')) {
            world = new LevelWorld(canvas, keyboard);
            currentWorld = 'level';
            world.ctx.globalAlpha = 1;
        }
    }
}