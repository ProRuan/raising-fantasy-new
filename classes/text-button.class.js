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
        this.open(world.questButton, world.questRoll);
    }


    // jsdoc
    startNewGame() {
        if (world.newGameButton.isLocked()) {
            this.playSound(this.sound);
            this.unlock('newGameButton');

            // this.transit();
            // world.ctx.globalAlpha = 0;
        }
    }


    transit() {
        setInterval(() => {
            let tSpeed = 0.01;

            if (world.ctx.globalAlpha != 0) {
                if (world.ctx.globalAlpha - tSpeed < 0) {
                    world.ctx.globalAlpha = 0;
                } else {
                    world.ctx.globalAlpha -= tSpeed;
                }
            }

            if (isMatch(world.ctx.globalAlpha, 0) && !isMatch(currentWorld, 'level')) {
                world = new LevelWorld(canvas, keyboard);
                currentWorld = 'level';

                world.ctx.globalAlpha = 1;
            }

            // if (isMatch(currentWorld, 'level') && !world.darkAlpha) {
            //     world.darkAlpha = true;
            //     world.ctx.globalAlpha = 0;
            // }

            // if (world.ctx.globalAlpha != 1 && world.darkAlpha) {
            //     if (world.ctx.globalAlpha + tSpeed > 1) {
            //         world.ctx.globalAlpha = 1;
            //     } else {
            //         world.ctx.globalAlpha += tSpeed;
            //     }
            // }

        }, 1000 / 60);
    }
}