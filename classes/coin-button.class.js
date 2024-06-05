class CoinButton extends Button {
    indent = 2;
    reachable = false;
    previous = 'settingsButton';
    next = 'cupButton';


    // jsdoc
    constructor(x, y) {
        super(source.coinButton, x - 48, canvas.height - y - 48);
    }


    // jsdoc
    execute() {
        this.closeQuestRoll();
    }


    // jsdoc
    closeQuestRoll() {
        if (this.isLocked()) {
            this.reset();
            this.unlock('questButton');
            setCursor('initial');
        }
    }


    reset() {
        this.reachable = false;
        this.locked = false;
        console.log('reset', world.coinButton.reachable);
    }


    unlock(key) {    // double code!!!
        if (world[key].isLocked()) {
            world[key].locked = false;
        }
    }
}