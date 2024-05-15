class Character extends MoveableObject {


    constructor(source, x, y) {
        super(source, x, y);
    }


    // jsdoc
    isJump() {
        return isKey('space') && !this.isAboveGround();
    }


    // jsdoc
    playJumpAnimation() {
        if (this.isJumpPhase(0)) {
            this.playJump(0, true);
        } else if (this.isJumpPhase(1) && isLarger(0, this.speedY)) {
            this.playJump(2);
        } else if (this.isJumpPhase(1)) {
            this.playJump(3, true);
        } else if (this.isJumpPhase(2) && isLarger(this.speedY, 0)) {
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
            setTimeout(() => this.playJump(++i), 200 / 6);
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
        return isKey('keyA');
    }


    // jsdoc
    isCover() {
        return true;
    }
}