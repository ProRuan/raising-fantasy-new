class Button extends DrawableObject {
    reachable = true;
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
        setInterval(() => this.trigger(), 1000 / 60);
    }


    // jsdoc
    trigger() {
        this.setCursor();
        this.execute();
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
    openLeaderboard(buttonA, buttonB) {
        if (buttonA.isLocked()) {
            world.leaderboard.opened = true;
        } else if (!buttonB.isLocked()) {
            world.leaderboard.opened = false;
        }
    }


    // jsdoc
    setVolume(key, logical) {
        if (this.isLocked()) {
            this.locked = false;
            this.setVolumeValue(key, logical);
        }
    }


    // jsdoc
    setVolumeValue(key, logical) {
        if (isTrue(logical) && isGreater(volume[key], 10)) {
            volume[key]++;
        } else if (!isTrue(logical) && isGreater(0, volume[key])) {
            volume[key]--;
        }
    }
}