/**
 * Represents a settings button.
 * @extends Button
 */
class SettingsButton extends Button {
    indent = 6;
    previous = 'cupButton';
    shadowColor = 'yellow';
    shadowBlur = 16;


    /**
     * Creates a settings button.
     */
    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
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
        if (world.leaderboard.isOpened()) {
            return 'xButton';
        } else if (world.questRoll.isOpened()) {
            return 'coinButton';
        } else {
            return 'newGameButton';
        }
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.open(this, world.leaderboard, world.cupButton);
    }
}