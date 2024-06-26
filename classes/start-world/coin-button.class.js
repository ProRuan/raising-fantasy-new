/**
 * Represents a coin button.
 * @extends Button
 */
class CoinButton extends Button {
    indent = 2;
    previous = 'settingsButton';
    next = 'cupButton';
    shadowColor = 'olive';
    shadowBlur = 16;


    /**
     * Creates a coin button.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.coinButton, x - 48, canvas.height - y - 48);
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.closeQuestRoll();
    }


    /**
     * Closes the quest roll.
     */
    closeQuestRoll() {
        if (this.isLocked()) {
            this.reset();
            this.unlock('questButton');
            setCursor('initial');
        }
    }
}