class CoinButton extends Button {
    indent = 2;
    previous = 'settingsButton';
    next = 'cupButton';
    shadowColor = 'olive';
    shadowBlur = 16;


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
}