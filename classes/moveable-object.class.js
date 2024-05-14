class MoveableObject extends DrawableObject {
    otherDirection = false;

    speedY = 0;
    acceleration = 0.5;
    jumpCounter = -1;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
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


    climb(logical) {
        this.applySpeedType('y', logical, 'speed');    // not waterproof!!!
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
            if (!this.isClimb()) {
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
        this.setObjectValue('jumpCounter', 0);
    }


    // jsdoc
    isClimb() {
        return this.isClimbLadder('arrowUp') || this.isClimbLadder('arrowDown');
    }


    // jsdoc
    isClimbLadder(key) {
        return isKey(key) && this.isAtLadder(key);
    }


    // jsdoc
    isAtLadder(key) {
        let ladder = this.getLadder(key);
        return (ladder) ? true : false;
    }


    // jsdoc
    getLadder(key) {
        return this.world.ladders.find(l => this.isLadder(key, l));
    }


    // jsdoc
    isLadder(key, l) {
        let [a, b] = this.getLadderParameters(key, l);
        return isIncluded(this.xLeft, l.xCenter, this.xRight) && isLarger(a, b - 0.5);
    }


    // jsdoc
    getLadderParameters(key, l) {
        return (key == 'arrowUp') ? [l.yTop, this.yBottom] : [this.yBottom, l.yBottom]
    }




    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }
}