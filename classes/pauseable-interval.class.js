/**
 * Represents a pauseable interval.
 */
class PauseableInterval {
    stopped = false;


    /**
     * Creates a pauseable interval.
     * @param {function} subfunction - The function to apply.
     * @param {number} ms - The milliseconds to apply.
     */
    constructor(subfunction, ms) {
        this.setStoppableInterval(subfunction, ms);
        this.setSubfunction(subfunction);
        this.setMs(ms);
    }


    /**
     * Sets the stoppable interval.
     * @param {function} subfunction - The function to apply.
     * @param {number} ms - The milliseconds to apply.
     */
    setStoppableInterval(subfunction, ms) {
        this.id = setInterval(subfunction, ms);
    }


    /**
     * Sets the function to apply.
     * @param {function} subfunction - The function to apply.
     */
    setSubfunction(subfunction) {
        this.subfunction = subfunction;
    }


    /**
     * Sets the milliseconds to apply.
     * @param {number} ms - The milliseconds to apply.
     */
    setMs(ms) {
        this.ms = ms;
    }


    /**
     * Plays the interval.
     */
    play() {
        this.stopped = false;
        this.setStoppableInterval(this.subfunction, this.ms);
    }


    /**
     * Stops the interval.
     */
    stop() {
        this.stopped = true;
        clearInterval(this.id);
    }
}