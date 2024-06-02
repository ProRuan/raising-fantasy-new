class Button extends DrawableObject {
    indent = 4;    // necessary???

    reachable = true;
    targeted = false;
    selected = false;
    locked = false;


    constructor(source, x, y) {
        super(source, x, y);
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
    setCursor() {
        if (this.isTargeted()) {
            setCursor('pointer');
        }
    }


    // jsdoc
    setVolume(key, logical) {
        if (this.isLocked()) {
            this.locked = false;
            this.setVolumeValue(key, logical);

            console.log('volume', volume[key]);
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


    // jsdoc
    openLeaderboard(buttonA, buttonB) {
        if (buttonA.isLocked()) {
            world.leaderboard.opened = true;
        } else if (!buttonB.isLocked()) {
            world.leaderboard.opened = false;
        }
    }


    // // jsdoc
    // open() {
    //     setStoppableInterval(() => this.execute(), 1000 / 60);
    // }
}