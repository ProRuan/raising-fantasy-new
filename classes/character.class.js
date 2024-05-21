class Character extends MoveableObject {
    chapter = 'cover';
    idleDelay = 3000;
    lastIdle = this.idleDelay + getTime();
    coins = 0;
    leaves = 0;


    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);    // double code???
        this.setCover(source);    // double code???
        this.setEpilog();    // double code???
        this.loadImages();    // double code???
    }


    get hpPoints() {
        return this.world.hpBar.points;
    }


    get energyPoints() {
        return this.world.energyBar.points;
    }


    get staminaPoints() {
        return this.world.staminaBar.points;
    }


    // jsdoc
    isJump() {
        return isKey('space') && !this.isAboveGround();
    }


    // jsdoc
    playJumpAnimation() {
        if (this.isJumpPhase(0)) {
            this.playJump(0, true);
        } else if (this.isJumpPhase(1) && isGreater(0, this.speedY)) {
            this.playJump(2);
        } else if (this.isJumpPhase(1)) {
            this.playJump(3, true);
        } else if (this.isJumpPhase(2) && isGreater(this.speedY, 0)) {
            this.playJump(5);
        } else if (this.isJumpPhase(2)) {
            this.playJump(6, false);
        }
    }


    // jsdoc
    isJumpPhase(i) {
        return isMatch(this.jumpCounter, i);
    }


    // jsdoc
    playJump(i, set) {
        super.playAnimation([this.flipBook.jump[i]]);
        this.playJumpNext(i);
        this.setJumpCounter(set);
    }


    // jsdoc
    playJumpNext(i) {
        if (isMatch(i, 0) || isMatch(i, 3)) {
            setTimeout(() => this.playJump(++i), 100 / 3);
        }
    }


    // jsdoc
    setJumpCounter(set) {
        if (!isUndefined(set) && isTrue(set)) {
            this.increaseJumpCounter(true);
        } else if (!isUndefined(set) && !isTrue(set)) {
            this.increaseJumpCounter(false);
        }
    }


    // jsdoc
    increaseJumpCounter(logical) {
        (logical) ? this.jumpCounter++ : this.jumpCounter = -1;
    }


    // jsdoc
    resetJumpCounter() {
        if (!isMatch(this.chapter, 'jump')) {
            this.increaseJumpCounter(false);
        }
    }


    // jsdoc
    isRunAttack() {
        return this.isRun() && this.isAttack();
    }


    // jsdoc
    isRun() {
        return isKey('arrowLeft', 'doubleClick') || isKey('arrowRight', 'doubleClick');
    }


    // jsdoc
    isWalkAttack() {
        return this.isWalk() && this.isAttack();
    }


    // jsdoc
    isWalk() {
        return isKey('arrowLeft') || isKey('arrowRight');
    }


    // jsdoc
    isAttack() {
        return isKey('keyA') && isGreater(0, world.hero.staminaPoints.length);
    }


    // jsdoc
    isIdle() {
        return isOnTime(this.world.time, this.lastIdle, this.idleDelay);
    }


    // jsdoc
    isCover() {
        return true;
    }
}