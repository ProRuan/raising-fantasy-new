/**
 * Represents an x button.
 * @extends Button
 */
class XButton extends Button {
    indent = 2;
    previous = 'settingsButton';
    shadowColor = 'lightcyan';
    shadowBlur = 16;


    /**
     * Creates an x button.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.xButton, x - 35, canvas.height - y - 64);
    }


    /**
     * Provides the next button.
     */
    get next() {
        return this.getNext();
    }


    /**
     * Provides the key of the next button.
     * @returns {string} - The key of the next button.
     */
    getNext() {
        if (world.settingsButton.isLocked()) {
            return 'lowMusicButton';
        } else if (world.cupButton.isLocked()) {
            return 'cupButton';
        }
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.closeLeaderboard();
    }


    /**
     * Closes the leaderboard.
     */
    closeLeaderboard() {
        if (this.isLocked()) {
            this.reset();
            this.unlock('cupButton');
            this.unlock('settingsButton');
            setCursor('initial');
        }
    }
}