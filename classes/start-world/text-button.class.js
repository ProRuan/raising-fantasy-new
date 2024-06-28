/**
 * Represents a text button.
 * @extends Button
 */
class TextButton extends Button {
    indent = -8;
    shadowColor = 'lightcyan';
    shadowBlur = '12';
    font = '28px Roboto';
    textAlign = 'left';
    color = 'black';
    sound = source.newGame;


    /**
     * Creates a text button.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
        this.setText(source);
    }


    /**
     * Provides the offset y value.
     */
    get offsetY() {
        return this.y + 20;
    }


    /**
     * Provides the previous button.
     */
    get previous() {
        return this.getPrevious();
    }


    /**
     * Provides the next button.
     */
    get next() {
        return this.getNext();
    }


    /**
     * Sets the text of the button.
     * @param {object} source - The source object.
     */
    setText(source) {
        this.text = source.text;
    }


    /**
     * Provides the key of the previous button.
     * @returns {string} - The key of the previous button.
     */
    getPrevious() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'newGameButton';
        } else {
            return 'settingsButton';
        }
    }


    /**
     * Provides the key of the next button.
     * @returns {string} - Provides the key of the next button.
     */
    getNext() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'cupButton';
        } else {
            return 'questButton';
        }
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.startNewGame();
        this.openQuestRoll();
    }


    /**
     * Opens the quest roll.
     */
    openQuestRoll() {
        this.open(world.questButton, world.questRoll);
    }


    /**
     * Starts a new game.
     */
    startNewGame() {
        if (isTimeout(this.time, world.time)) {
            setCursor('initial');
            this.setLevelWorld();
        } else if (world.newGameButton.isLocked()) {
            this.setNewGameTimeout();
        }
    }


    /**
     * Sets the level world.
     */
    setLevelWorld() {
        world.music.pause();
        world.stopped = true;
        setLevelWorld();
    }


    /**
     * Sets the timeout of the new game sound.
     */
    setNewGameTimeout() {
        this.unlock('newGameButton');
        this.playSound(this.sound);
        this.time = getSum(world.time, 750);
    }
}