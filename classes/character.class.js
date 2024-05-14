class Character extends MoveableObject {


    constructor(source, x, y) {
        super(source, x, y);
    }


    // jsdoc
    isJump() {
        return isKey('space') && !this.isAboveGround();
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