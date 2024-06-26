/**
 * Represents a high music button.
 * @extends Button
 */
class HighMusicButton extends Button {
    indent = -6;
    previous = 'lowMusicButton';
    next = 'lowSoundButton';
    shadowColor = 'white';
    shadowBlur = 16;


    /**
     * Creates a high music butotn.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.arrowRight, x + 125, y - 145.5);
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.setVolume('music', true);
    }
}