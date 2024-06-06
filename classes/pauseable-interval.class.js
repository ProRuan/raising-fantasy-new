class PauseableInterval {


    // jsdoc
    constructor(subfunction, ms) {
        this.setStoppableInterval(subfunction, ms);
        this.setSubfunction(subfunction);
        this.setMs(ms);
    }


    // jsdoc
    setStoppableInterval(subfunction, ms) {
        this.id = setInterval(subfunction, ms);
    }


    // jsdoc
    setSubfunction(subfunction) {
        this.subfunction = subfunction;
    }


    // jsdoc
    setMs(ms) {
        this.ms = ms;
    }


    // jsdoc
    play() {
        this.setStoppableInterval(this.subfunction, this.ms);
    }


    // jsdoc
    stop() {
        clearInterval(this.id);
    }
}