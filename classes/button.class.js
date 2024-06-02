class Button extends DrawableObject {
    indent = 4;

    reachable = true;
    targeted = false;
    selected = false;
    locked = false;

    // previous (button)
    // next (button)


    constructor(source, x, y) {
        super(source, x, y);
    }


    // jsdoc
    isHighlighted() {
        return this.isTargeted() || this.isLocked();
    }


    // jsdoc
    isTargeted() {
        return this.reachable == true && this.targeted == true;
    }


    // jsoc
    isLocked() {
        return this.locked == true;
    }


    // jsdoc
    setCursor() {
        if (this.isTargeted()) {
            setCursor('pointer');
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


    // updateCursor() {
    //     setInterval(() => {
    //         (this.isTargeted()) ? setCursor('pointer') : false;
    //     }, 1000 / 60);
    // }




    // class Path
    // sub classes AudioPath + ImagePath ...


    // audioPath = new AudioPath();
    // dino.sound = audioPath.dinoGrowl
    // ...
}