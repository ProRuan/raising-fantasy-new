/**
 * Represents a cup button.
 * @extends Button
 */
class CupButton extends Button {
    indent = 6;
    next = 'settingsButton';
    shadowColor = 'yellow';
    shadowBlur = 16;


    /**
     * Creates a cup button.
     */
    constructor() {
        super(source.cupButton, 32, 32);
    }


    /**
     * Provides the previous button.
     */
    get previous() {
        return this.getPrevious();
    }


    /**
     * Provides the key of the previous button.
     * @returns {string} - The key of the previous button.
     */
    getPrevious() {
        if (world.settingsButton.isLocked()) {
            return 'highSoundButton';
        } else if (world.cupButton.isLocked()) {
            return 'xButton';
        } else if (world.questButton.isLocked()) {
            return 'coinButton';
        } else {
            return 'questButton';
        }
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.open(this, world.leaderboard, world.settingsButton);
    }
}