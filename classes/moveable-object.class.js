class MoveableObject extends DrawableObject {
    otherDirection = false;

    speedY = 0;
    acceleration = 0.5;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
    grounded = true;
    climbing = false;

    sounds = [];


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    move(logical, key) {
        this.setOtherDirection(logical);
        this.applySpeed(logical, key);
    }


    // jsdoc
    setObjectValue(key, value) {
        this[key] = value;
    }


    // jsdoc + setBoolean() above!!!
    setOtherDirection(logical) {
        this.otherDirection = logical;
    }


    // jsdoc
    applySpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.applySpeedType('x', logical, 'runSpeed');
        } else if (isKey(key)) {
            this.applySpeedType('x', logical, 'speed');
        }
    }


    // jsdoc
    applySpeedType(key, logical, type) {
        this[key] += (logical) ? -this[type] : this[type];
    }


    // jsdoc
    climb(logical) {
        this.applySpeedType('y', logical, 'speed');
    }


    // jsdoc
    isUndefined(value) {
        return value === undefined;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playSound(path) {    // set sound volume factor!!!
        let sound = new Audio(path);
        this.sounds.push(sound);
        sound.play();
    }


    applyGravity() {
        setInterval(() => {
            if (!this.isClimbing()) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.y > this.groundLevel - (this.yBottom - this.y)) {
                        // console.log(this.y);
                        this.y = this.groundLevel - (this.yBottom - this.y);
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        return this.yBottom < this.groundLevel;
    }


    jump() {
        this.setObjectValue('speedY', 12.5);    // y value!!!
        this.setObjectValue('isJumpStart', true);
        this.setObjectValue('isJumping', true);
        this.setObjectValue('isFallStart', true);
        this.setObjectValue('isFalling', true);
    }


    isClimbing() {
        return this.isClimbingUp() || this.isClimbingDown();
    }


    isClimbingUp() {    // dobule code!!!
        return isKey('arrowUp') && this.isAtLadderUp();
    }


    isClimbingDown() {    // dobule code!!!
        return isKey('arrowDown') && this.isAtLadderDown();    // + condititon for start point and end point!!!
    }


    isAtLadderUp() {
        let ladder = this.getLadderUp();
        return (ladder) ? true : false;
    }


    getLadderUp() {
        return this.world.ladders.find(l => this.isLadderUp(l));
    }


    isLadderUp(l) {
        return isIncluded(this.xLeft, l.xCenter, this.xRight) && isLarger(l.yTop, this.yBottom);
    }


    isAtLadderDown() {
        let ladder = this.getLadderDown();
        return (ladder) ? true : false;
    }


    getLadderDown() {
        return this.world.ladders.find(l => this.isLadderDown(l));
    }


    isLadderDown(l) {
        return isIncluded(this.xLeft, l.xCenter, this.xRight) && isLarger(this.yBottom, l.yTop);
    }


    isAtLadder() {
        let ladder = this.getLadder();
        return (ladder) ? true : false;
    }


    getLadder() {
        return this.world.ladders.find(l => this.isLadder(l));
    }


    isLadder(l) {
        return isIncluded(this.xLeft, l.xCenter, this.xRight) && isLarger(l.yBottom, this.yBottom);
    }




    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }
}