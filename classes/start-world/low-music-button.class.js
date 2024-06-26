/**
 * Represents a low music button.
 * @extends Button
 */
class LowMusicButton extends Button {
    indent = -6;
    previous = 'xButton';
    next = 'highMusicButton';
    shadowColor = 'white';
    shadowBlur = 16;


    /**
     * Creates a low music button.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.arrowLeft, x + 25, y - 145.5);
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.setVolume('music', false);
    }
}