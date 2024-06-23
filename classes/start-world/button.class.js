class Button extends DrawableObject {
    reachable = false;
    targeted = false;
    selected = false;
    locked = false;


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.init();
    }


    // jsdoc
    init() {
        this.setPauseableInterval(() => this.trigger(), 1000 / 60);
    }


    // jsdoc
    trigger() {
        if (isMatch(currentWorld, 'start')) {
            this.setCursor();
            this.execute();
        } else {
            this.stop(true);
        }
    }


    // jsdoc
    setCursor() {
        if (this.isTargeted()) {
            setCursor('pointer');
        }
    }


    // jsdoc
    isHighlighted() {
        return this.isTargeted() || this.isLocked() || this.isSelected();
    }


    // jsdoc
    isTargeted() {
        return this.reachable == true && this.targeted == true;
    }


    // jsoc
    isLocked() {
        return this.locked == true;
    }


    // jsoc
    isSelected() {
        return this.selected == true;
    }


    // jsdoc
    open(buttonA, board, buttonB) {
        if (isMatch(currentWorld, 'start')) {
            if (buttonA.isLocked()) {
                board.opened = true;
            } else if (this.isButtonB(buttonB)) {
                board.opened = false;
            }
        }
    }


    // jsdoc
    isButtonB(button) {
        return (button) ? !button.isLocked() : true;
    }


    // jsdoc
    setVolume(key, logical) {
        if (this.isLocked()) {
            this.locked = false;
            this.setVolumeValue(key, logical);
            save('volume');
        }
    }


    setVolumeValue(key, logical) {
        if (isTrue(logical) && isGreater(volume[key], 10)) {
            volume[key]++;
            if (isMatch(key, 'sound')) {    // global function!!!
                let audio = new Audio(source.swordDraw);
                audio.volume = volume.sound / 10;
                audio.play();
            }
        } else if (!isTrue(logical) && isGreater(0, volume[key])) {
            volume[key]--;
            if (isMatch(key, 'sound')) {    // global function!!!
                let audio = new Audio(source.swordDraw);
                audio.volume = volume.sound / 10;
                audio.play();
            }
        }
    }


    // jsdoc
    reset() {
        this.reachable = false;
        this.selected = false;
        this.locked = false;
    }


    // jsdoc
    unlock(key) {
        if (world[key].isLocked()) {
            world[key].locked = false;
            world.setCurrentButton(key);
        }
    }
}